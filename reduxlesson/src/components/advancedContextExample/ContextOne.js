import createDataContext from "./createDataContext";


const counterReducer =(state,action)=>{

   switch(action.type){
      case 'increment':
         return {
            ...state,
            count:action.payload
         }
      case 'decrement':
         return {
            ...state,
            count:action.payload
         }
      case 'reset':
         return {
            ...state,
            count:0
         }
      default:
         return state; 
   }
}

const increment = dispatch =>count=>{
   dispatch({type:'increment',payload:count})
}

const decrement = dispatch=>count=>{
   dispatch({type:"decrement",payload:count})
};

const reset = dispatch =>()=>{
   dispatch({type:'reset'})
}


export const {Context,Provider} = createDataContext(counterReducer,
   {increment,decrement,reset},
   {count:0}
)