import React from 'react';
import ReactDOM from 'react-dom';
import AppoloClient from 'apollo-client';
import {AppoloProvider} from 'react-apollo';

const client = new AppoloClient({});

const Root = () => {
  return (
    <AppoloProvider client={client}>
      <div>Lyrical</div>
    </AppoloProvider>
  )
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
