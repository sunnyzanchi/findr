const { GraphQLObjectType, GraphQLString } = require('graphql');
const { User } = require('../users');

const Play = new GraphQLObjectType({
  fields: {
    // Will come from https://github.com/zanchi/scavenge/issues/1
    // item: {
    //   type: ListItem
    // },
    picture: {
      description: 'URL of the image that was taken for the play',
      type: GraphQLString,
    },
    user: {
      type: User,
    },
  },
  name: 'Play',
});

// const PlayInputType = new GraphQLInputObjectType({
//   fields: {
//     listItemId: {
//       type: GraphQLID,
//     },
//   },
//   name: 'PlayInputType',
// });

module.exports = { Play };
