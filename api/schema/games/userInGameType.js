const { GraphQLBoolean, GraphQLObjectType } = require('graphql');
const { User } = require('../users');

const UserInGame = new GraphQLObjectType({
  fields: {
    ...User._typeConfig.fields,
    ready: {
      type: GraphQLBoolean,
    },
  },
  name: 'UserInGame',
});

module.exports = { UserInGame };
