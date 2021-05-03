import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ApolloClient from "apollo-client";
import { ApolloProvider } from "react-apollo";
import 'bootstrap/dist/css/bootstrap.min.css';
import { InMemoryCache, IntrospectionFragmentMatcher } from "apollo-cache-inmemory";
import {setContext} from "apollo-link-context";
import {createHttpLink} from "apollo-link-http";
import Keycloak from "keycloak-js";

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: {
    __schema: {
      types: [
        {
          "kind": "UNION",
          "name": "Writings",
          "possibleTypes": [
            {
              "name": "Poem"
            },
            {
              "name": "Book"
            }
          ]
        },
      ],
    },
  }
});

const keycloak = Keycloak({
  "realm": "testRealm",
  "url": "http://localhost:4001/auth/",
  "ssl-required": "none",
  "resource": "test-react",
  "public-client": true,
  "confidential-port": 0,
  "clientId":"test-react"
});
const httpLink = createHttpLink({
  //useGETForQueries:true,
  uri: "http://localhost:5500/graphql",
  credentials:"include",
  fetchOptions:{
    mode:"no-cors"
  }
})
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    }
  }
});



export function logout() {
	keycloak.logout();
}


const client = new ApolloClient({
  link:authLink.concat(httpLink),
  uri: "http://localhost:5500/graphql",
  cache:new InMemoryCache({ fragmentMatcher })
});

const token = localStorage.getItem("kc_token");
const refreshToken = localStorage.getItem("kc_refreshToken");

const updateLocalStorage = () => {
  keycloak
    .loadUserProfile()
    .success(function(profile) {
      localStorage.setItem("kc_firstname", profile.firstName);
      localStorage.setItem("kc_lastname", profile.lastName);
      localStorage.setItem("kc_username", profile.username);
      localStorage.setItem("token",keycloak.token);
      ReactDOM.render(
        <React.StrictMode>
          <ApolloProvider client={client}>
          <App />
          </ApolloProvider>
        </React.StrictMode>,
        document.getElementById('root')
      );
    })
    .error(function() {
      keycloak.login();
    });
  localStorage.setItem("kc_token", keycloak.token);
  localStorage.setItem("kc_refreshToken", keycloak.refreshToken);
};

keycloak
  .init({ onLoad: "login-required", token, refreshToken })
  .success(authenticated => {
    if (authenticated) {
      updateLocalStorage();
    }
  }).error(function(){
    return <p> error credentials</p>
  });




// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
