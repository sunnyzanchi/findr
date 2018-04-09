const { GraphQLBoolean } = require('graphql');

const logout = {
  resolve: (_, args, context) => {
    return new Promise((resolve, reject) =>
      context.req.session.destroy(err =>
        err
          ? reject(err)
          : resolve(true)
      ));
  },
  type: GraphQLBoolean,
};

module.exports = logout;
