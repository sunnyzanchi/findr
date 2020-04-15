const { GraphQLNonNull } = require('graphql');
const { db, r } = require('../../db');
const { List, ListInputType } = require('./type');

const upsertList = {
  args: {
    list: {
      type: new GraphQLNonNull(ListInputType),
    },
  },
  resolve: async (_, { list }) => {
    if (list.id) {
      const result = await db
        .table('lists')
        .get(list.id)
        .update({
          ...list,
        }, { returnChanges: true })
        .run();

      return result.changes[0].new_val;
    }
    const result = await db
      .table('lists')
      .count()
      .do(count =>
        r.branch(
          count.gt(0),
          'EXISTS',
          db.table('lists').insert({
            ...list,
          },
          { returnChanges: true })
        )
      )
      .run();

    if (result === 'EXISTS') {
      throw Error('List already exists');
    }

    return result.changes[0].new_val;
  },
  type: List,
};

module.exports = upsertList;
