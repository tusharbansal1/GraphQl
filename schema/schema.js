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
    _id: String!
    firstName: String!
    lastName: String!
    number: String!
    email: String!
    address: String!
    password:String
  }
  type Post{
    _id:ID!
    body:String!
    createdAt:String!
  }

  input PostType{
    _id:String!
    body:String!
  }

 type RootQuery{
    users: [User!]
    user(_id: String!): User!
    posts: [Post!]
    post(_id:String!):Post!
}
  type Mutation{
    createUser(user:UserType): User,
    updateUser(user:UserType): User,
    deleteUser(_id:String): User,
    createPost(post:PostType):Post,
    deletePost(_id:String):Post,
    updatePost(post:PostType):Post
}
  schema {
    query: RootQuery
    mutation: Mutation
  }
`)