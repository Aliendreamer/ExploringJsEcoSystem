import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import AuthorList from "./components/authorList";
import AuthorDetail from "./components/authorDetail";
import BookList from "./components/bookList";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <AuthorList />
        </Route>
        <Route path="/Books">
          <BookList/>
        </Route>
        <Route path="/author/{id}">
          <AuthorDetail/>
        </Route>
      </Switch>
  </Router>
  );
}

export default App;
