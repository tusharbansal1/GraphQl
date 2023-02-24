const express = require("express")
const { graphqlHTTP } = require("express-graphql")
const graphQlSchema = require('./schema/schema')
const graphQlResolvers = require('./resolvers/index')
const mongoose = require("mongoose")

const app = express()

app.use(
    "/graphql",
    graphqlHTTP({
        schema: graphQlSchema,
        rootValue: graphQlResolvers,
        graphiql: true,
    })
)

const url = `mongodb://localhost:27017/GraphQL`
const options = { useNewUrlParser: true, useUnifiedTopology: true }

mongoose.set('strictQuery', false)

mongoose.connect(url, options)
    .then(() => app.listen(4000, console.log('Server running at 4000')))
    .catch(error => {
        throw error
    })



