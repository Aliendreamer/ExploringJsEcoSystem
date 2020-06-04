import React from 'react';

//uncomment if you are trying the props drilling example or reading point 2 of the article
//and pass it to the app
//import ComponentOne from "./components/propsDrilling/componentOne";

//uncomment if you are trying local state example or reading point 3 of the article
//import CounterComponent from "./components/localState/counterComponent";


import {CounterProvider} from "./components/usingContextApi/CounterContext";
import CounterComponentWithContext from './components/usingContextApi/CounterComponentWithContext';
function App() {
  return (
    <CounterProvider><div >
     <CounterComponentWithContext/>
    </div>
    </CounterProvider>
  );
}

export default App;
