const express = require('express');
const { KeycloakContext } = require('keycloak-connect-graphql')
const expressGraphQL = require("express-graphql");
var cors = require('cors')
const fs = require('fs')
const path = require('path')
const Keycloak = require('keycloak-connect')
const session = require('express-session')
const bodyParser = require('body-parser')
const {schema} = require("./graphqlTypes/schema");

const app = express();
//app.options('*', cors())
const graphqlPath = '*/graphql'

app.use(cors());
app.use(bodyParser.json())
const keycloakConfig = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../apolloApp/config/keycloak.json')));

const memoryStore = new session.MemoryStore()
const keycloak = new Keycloak({
	store: memoryStore
 }, keycloakConfig)
 app.use(session({
	secret: process.env.SESSION_SECRET_STRING || 'this should be a long secret',
	resave: false,
	saveUninitialized: true,
	store: memoryStore
 }))

app.use(graphqlPath, keycloak.middleware());

app.use(
	`${graphqlPath}`,
	expressGraphQL((req)=>({
		graphiql: true,
		schema: schema,
		pretty:true,
		context:{
			kauth :new KeycloakContext({req})
		},
		customFormatErrorFn: error => {
			const formattedError = {
				message: error.message,
				state: error.originalError && error.originalError.state,
				locations: error.locations,
				path: error.path,
				stack: error.stack ? error.stack.split("\n") : []
			};
			console.error(`GraphQL returning error: ${JSON.stringify(formattedError, null, "\t")}.`);
			return formattedError;
		}
	}))
);

const PORT = 5500;
app.listen(PORT,() => {
	console.log(`Listening on port '${PORT}'.`);
});