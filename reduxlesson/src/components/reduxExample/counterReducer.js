
const COUNTER_ACTIONS ={
   INCREMENT:"increment_counter",
   DECREMENT:"decrement_counter"
}

 const incrementAction = payload =>({type:COUNTER_ACTIONS.INCREMENT,payload});
 const decrementAction = payload =>({type:COUNTER_ACTIONS.DECREMENT,payload});

export const counterActions ={
   incrementAction,
   decrementAction
}

const initialState ={ counter:0}

const CounterReducer =(CounterState=initialState,action)=>{

   switch (action.type) {
      case COUNTER_ACTIONS.INCREMENT:
            return {
               ...CounterState,
               counter:action.payload
            }
      case COUNTER_ACTIONS.DECREMENT:
         return {
            ...CounterState,
            counter:action.payload
         }
   
      default:
         return CounterState
   }
}

export default CounterReducer;