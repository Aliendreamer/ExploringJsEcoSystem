import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import 'bootstrap/dist/css/bootstrap.min.css';
import { InMemoryCache, IntrospectionFragmentMatcher } from "apollo-cache-inmemory";
import {setContext} from "apollo-link-context";
import {createHttpLink} from "apollo-link-http";

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
const httpLink = createHttpLink({
  uri:"/graphql"
})
const authLink = (_,{headers}) =>{
  const token = localStorage.getItem("token");
  return {
    headers:{
      ...headers,
      authorization:token ?`Bearer ${token}`:""
    }
  }
}
const client = new ApolloClient({
  link:authLink.concat(httpLink),
  uri: "http://localhost:5000/graphql",
  cache:new InMemoryCache({ fragmentMatcher })
});
ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
    <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
