import React from 'react';
import './App.css';
import Layout from './components/Layout/Layout';
import BurgerBuilder from '../src/containers/BurgerBuilder/BurgerBuilder';
import {Route,Switch} from 'react-router-dom';
import Checkout from '../src/containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
function App() {
  return (
    <div>
     
      <Layout>
      <Switch>
      <Route path="/checkout"  component={Checkout}/>
      <Route path='/orders' component={Orders}/>
      <Route path='/auth' component={Auth}/>>
     <Route path="/" exact component={BurgerBuilder}/>
     </Switch>
      </Layout>
      
    </div>
  );
}

export default App;
