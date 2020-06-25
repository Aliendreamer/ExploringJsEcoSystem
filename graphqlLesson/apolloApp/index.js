const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const Keycloak = require('keycloak-connect')
const { KeycloakContext, KeycloakTypeDefs, KeycloakSchemaDirectives } = require('keycloak-connect-graphql')



const app = express();
const keycloak = new Keycloak();
app.use(graphqlPath, keycloak.middleware());
const server = new ApolloServer({
	typeDefs:[KeycloakTypeDefs,typeDefs],
	 resolvers,
	 schemaDirectives:KeycloakSchemaDirectives,
	 context:({req})=>{
		 return {
			 kauth:new KeycloakContext({req})
		 }
	 }
});
server.applyMiddleware({app});
const PORT = 5000;
server.listen(PORT, async() => {
	console.log(`Listening on port '${PORT}'.`);
});