import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {createStore,combineReducers,applyMiddleware,compose} from 'redux';
import countReducer from './store/reducers/counter';
import resultReducer from './store/reducers/result';
import testReducer from './store/reducers/testReducer';
import {Provider}  from 'react-redux';
import thunk from 'redux-thunk';

const rootReducer=combineReducers({
    ctr:countReducer,
    res: resultReducer,
    test:testReducer
})

// const logger=store=>{
//     return next=>{
//         return action=>{
//             next(action);
//         }
//     }
// }
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store=createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)));


ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
