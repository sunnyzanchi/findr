const { GraphQLScalarType, Kind } = require('graphql')

const validateUsername = str => (str.length < 25 && str !== '' ? str : null)

const Username = new GraphQLScalarType({
  name: 'Username',
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return validateUsername(ast.value)
    }
    return null
  },
  parseValue: validateUsername,
  serialize: validateUsername,
})

module.exports = Username
