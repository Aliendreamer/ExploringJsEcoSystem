const { makeExecutableSchema } =require("@graphql-tools/schema");

const { KeycloakTypeDefs, KeycloakSchemaDirectives } = require('keycloak-connect-graphql')
const resolvers = require("./resolvers");
const typeDefs = require("./typeDefs");

const schema = makeExecutableSchema({
   typeDefs:[typeDefs,KeycloakTypeDefs],
   resolvers,
   schemaDirectives:KeycloakSchemaDirectives
});
module.exports ={schema};