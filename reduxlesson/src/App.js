import React from 'react';
import { Provider as ReduxProvider } from 'react-redux'
import { createStore,combineReducers } from "redux";
import CounterReducer from "./components/reduxExample/counterReducer";
import CounterWithRedux from './components/reduxExample/counterWithRedux';
import {Provider as ProviderOne} from './components/advancedContextExample/ContextOne';
import {Provider as ProviderTwo} from './components/advancedContextExample/ContextTwo';
import CounterComponent from "./components/advancedContextExample/CounterComponentAdvanced";
//uncomment if you are trying the props drilling example or reading point 2 of the article
//and pass it to the app
import ComponentOne from "./components/propsDrilling/componentOne";

//uncomment if you are trying local state example or reading point 3 of the article
import CounterComponentLocal from "./components/localState/counterComponent";

//uncomment if you are trying point 1 2 or 3 from the article or
//any of the non redux examples.
import {CounterProvider} from "./components/usingContextApi/CounterContext";
import CounterComponentWithContext from './components/usingContextApi/CounterComponentWithContext';
// function App() {
//   return (
//     <CounterProvider>
//       <div >
//         {/* <ComponentOne/> */}
//         {/* <CounterComponentLocal/> */}
//      <CounterComponentWithContext/>
//     </div>
//     </CounterProvider>
//   );
// }
// const baseStateReducer = combineReducers({
//     countState:CounterReducer
// })

// const reduxStore = createStore(baseStateReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
// function App() {
//   return (
//     <ReduxProvider store={reduxStore}>
//       <div >
//         <CounterWithRedux/>
//     </div>
//     </ReduxProvider>
//   );
// }


//Advanced redux example
function App() {
  return (
    <ProviderTwo>
    <ProviderOne>
      <div >
     <CounterComponent/>
    </div>
    </ProviderOne>
    </ProviderTwo>
  );
}



export default App;
