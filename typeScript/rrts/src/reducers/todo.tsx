import {Todo,ActionTypes,Action} from "../actions";

export const todoReducer =(
   state:Todo[]=[]
   ,action:Action)=>{

      switch (action.type) {
         case ActionTypes.fetchTodos:
           return action.payload;
         case ActionTypes.deleteTodo:
            return state.filter(x=>x.id!==action.payload);
         default:
            return state;
      }
}