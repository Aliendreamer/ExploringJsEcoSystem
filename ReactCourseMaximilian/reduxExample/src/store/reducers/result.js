import  * as actionTypes from '../actions';

const initialState={
    results:[]
}

const reducer=(state=initialState,action)=>{

   if(action.type===actionTypes.STORE_RESULT){
      return {
          ...state,
          results:state.results.concat({id:new Date() ,v:action.result})
      }
    }
    if(action.type===actionTypes.STORE_DELETE){
        const newArray=state.results.filter(r=>r.id!==action.elId)
      return {
          ...state,
          results:newArray
      }
  }
    return state;
}

export default reducer;