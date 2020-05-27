const { ApolloServer, gql } = require('apollo-server');
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const server = new ApolloServer({ typeDefs, resolvers });
const PORT = 5000;
server.listen(PORT, async() => {
	console.log(`Listening on port '${PORT}'.`);
});