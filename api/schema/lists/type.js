const {
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLObjectType,
  GraphQLString,
} = require('graphql');
const { GraphQLDateTime } = require('graphql-iso-date');

const List = new GraphQLObjectType({
  fields: {
    created: {
      type: GraphQLDateTime,
    },
    createdBy: {
      type: GraphQLID,
    },
    description: {
      type: GraphQLString,
    },
    id: {
      type: GraphQLID,
    },
    items: {
      type: GraphQLString,
    },
    modified: {
      type: GraphQLDateTime,
    },
    name: {
      description: {
        type: GraphQLString,
      },
      id: {
        type: GraphQLID,
      },
      name: {
        type: GraphQLString,
      },
    },
  },
  name: 'List',
});

const ListInputType = new GraphQLInputObjectType({
  fields: {
    createdBy: {
      type: GraphQLID,
    },
    description: {
      type: GraphQLString,
    },
    id: {
      type: GraphQLID,
    },
    name: {
      type: GraphQLString,
    },
  },
  name: 'ListInputType',
});

module.exports = {
  List,
  ListInputType,
};
