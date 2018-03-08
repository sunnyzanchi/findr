const {
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLObjectType,
  GraphQLString,
} = require('graphql');
const { GraphQLDateTime } = require('graphql-iso-date');
const Listname = require('./listname');

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
  name: 'User',
});

const UserInputType = new GraphQLInputObjectType({
  fields: {
    email: {
      type: GraphQLString,
    },
    id: {
      type: GraphQLID,
    },
    password: {
      type: GraphQLString,
    },
    phone: {
      type: GraphQLString,
    },
    username: {
      type: Username,
    },
  },
  name: 'UserInputType',
});

module.exports = {
  List,
  UserInputType,
};
