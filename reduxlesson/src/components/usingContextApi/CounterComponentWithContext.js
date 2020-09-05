import React,{useContext} from 'react'
import {CounterContext} from './CounterContext';
const CounterComponentWithContext =()=>{
   const [state,setState] = useContext(CounterContext);
 
   return (
      <div style={{marginLeft:"100px", marginTop:"100px"}}>
      <input type='text' value={state.counter} label="Current counter" disabled/>
      <button type='button' onClick={()=>setState({...state,counter:state.counter+1})}>
         Increment
      </button>
      <button type='button' onClick={()=>setState({...state,counter:state.counter-1>=0?state.counter-1:0})} >
         Decrement
      </button>
      </div>
   )
}
export default CounterComponentWithContext;