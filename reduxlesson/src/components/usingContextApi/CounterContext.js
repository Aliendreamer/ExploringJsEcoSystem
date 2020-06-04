import React,{useState} from 'react';

const CounterContext = React.createContext();

const CounterProvider = ({children}) => {
   const [state,setState] = useState({counter:0});
  return (
    <CounterContext.Provider value={[state,setState]}>
      {children}
    </CounterContext.Provider>
  );
}

export { CounterContext, CounterProvider };