import React,{useContext} from 'react'
import {Context as  CounterContextOne} from './ContextOne';
import {Context as  CounterContextTwo} from './ContextTwo';
const CounterComponentWithContext =()=>{
   const {state:{count},decrement,increment,reset} = useContext(CounterContextOne);
   const {state:{countTwo},decrementTwo,incrementTwo,resetTwo} = useContext(CounterContextTwo);

   return (
      <div style={{marginLeft:"100px", marginTop:"100px"}}>
         <hr/>
         <p> context one </p>
      <input type='text' value={count} label="Current counter" disabled/>
      <button type='button' onClick={()=>increment(count+1)}>
         Increment
      </button>
      <button type='button' onClick={()=>decrement(count-1>=0?count-1:0)} >
         Decrement
      </button>
      <button type='button' onClick={()=>reset()} >
         reset
      </button>
      <hr/>
      <hr/>
         <p> context two </p>
      <input type='text' value={countTwo} label="Current counter" disabled/>
      <button type='button' onClick={()=>incrementTwo(countTwo+1)}>
         Increment
      </button>
      <button type='button' onClick={()=>decrementTwo(countTwo-1>=0?countTwo-1:0)} >
         Decrement
      </button>
      <button type='button' onClick={()=>resetTwo()} >
         reset
      </button>
      <hr/>
      </div>
   )
}
export default CounterComponentWithContext;