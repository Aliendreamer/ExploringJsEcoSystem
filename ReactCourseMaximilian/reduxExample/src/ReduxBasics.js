const redux=require('redux')
const createStore=redux.createStore;

const initialstate={
    counter:0
}
//reducer

const reducer=(state=initialstate,action)=>{

    if(action.type==='INC_COUNTER'){
        return {
            ...state,
            counter:state.counter++
        }
    }
    
    if(action.type==='ADD_COUNTER'){
        return {
            ...state,
            counter:state.counter+action.value
        }
    }
    return state;
}
//store
const store=createStore(reducer)

store.subscribe(()=>{
    console.log('subscription',store.getState())
});

//dispatch action
store.dispatch({type:'INC_COUNTER'})
store.dispatch({type:'ADD_COUNTER',value:10})
store.dispatch({type:'DEC_COUNTER'})
store.dispatch({type:'I_COUNTER'})
console.log(store.getState())
//subscription 

