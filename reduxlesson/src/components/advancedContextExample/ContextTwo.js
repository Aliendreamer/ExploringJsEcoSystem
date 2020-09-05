import createDataContext from "./createDataContext";


const counterReducer =(state,action)=>{

   switch(action.type){
      case 'incrementTwo':
         return {
            ...state,
            countTwo:action.payload
         }
      case 'decrementTwo':
         return {
            ...state,
            countTwo:action.payload
         }
      case 'resetTwo':
         return {
            ...state,
            countTwo:0
         }
      default:
         return state; 
   }
}

const incrementTwo = dispatch =>count=>{
   dispatch({type:'incrementTwo',payload:count})
}

const decrementTwo = dispatch=>count=>{
   dispatch({type:"decrementTwo",payload:count})
};

const resetTwo = dispatch =>()=>{
   dispatch({type:'resetTwo'})
}


export const {Context,Provider} = createDataContext(counterReducer,{incrementTwo,decrementTwo,resetTwo},{countTwo:0})