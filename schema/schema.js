const { buildSchema } = require('graphql')

module.exports = buildSchema(`

type User {
    _id: ID!
    firstName: String!
    lastName: String!
    number: String!
    email: String!
    address: String!
    password:String!
    createdAt: String!
    updatedAt: String!
  }
  input UserType {
    firstName: String!
    lastName: String!
    number: String!
    email: String!
    address: String!
    password:String!
  }
 type RootQuery{
    users: [User!]
    user(_id: String!): User!
}
  type Mutation{
    createUser(user:UserType): User,
    updateUser(_id: String, firstName: String, lastName: String, number: String, email: String, address: String): String,
    deleteUser(_id:String): User
}
  schema {
    query: RootQuery
    mutation: Mutation
  }
`)