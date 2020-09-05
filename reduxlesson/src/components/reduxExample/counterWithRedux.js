import React from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {counterActions} from './counterReducer';
const CounterWithRedux =()=>{ 
   const dispatch = useDispatch();
   const counter = useSelector(state=>state.countState.counter);
   return (
      <>
        <div style={{marginLeft:"100px", marginTop:"100px"}}>
      <input type='text' value={counter} label="Current counter" disabled/>
      <button type='button' onClick={()=>dispatch(counterActions.incrementAction(counter+1))}>
         Increment
      </button>
      <button type='button' onClick={()=>dispatch(counterActions.decrementAction(counter-1>=0?counter-1:0))} >
         Decrement
      </button>
      </div>
      </>
   )

}

export default CounterWithRedux;