import uuidv4 from 'uuid';


export default function reducer(state,action){

   switch (action.type) {
      case 'TOGGLE_TODO':
        const toggledTodos= state.todos.map(t=>t.id === action.payload.id?
            {...action.payload, complete:!action.payload.complete}: t);
            return{
               ...state,
              todos: toggledTodos
            }   
      case "UPDATE_TODO":
         if(!action.payload){
            return state;
         }
         if(state.todos.findIndex(t=>t.text === action.payload )>-1){
            return state;
         }
         const updatedTodo={...state.currentTodo,text:action.payload};
         const updatedIndex = state.todos.findIndex(t=>t.id === state.currentTodo.id);
         const updatedTodos = [...state.todos.slice(0,updatedIndex),updatedTodo,...state.todos.slice(updatedIndex+1)]
         return{
            ...state,
            todos:updatedTodos,
            currentTodo:{}
         }
         case "REMOVE_TODO":
         const filteredTodos =state.todos.filter(t=>t.id!==action.payload.id);
         const isRemovedTodo = state.currentTodo.id === action.payload.id ? {}: state.currentTodo;
         return{
            ...state,
            todos:filteredTodos,
            currentTodo:isRemovedTodo
         }
      case "ADD_TODO":
         if(!action.payload){
            return state;
         }
         if(state.todos.findIndex(t => t.text === action.payload )>-1){
            return state;
         }
         const newTodo={
            id:uuidv4(),
            complete:false,
            text:action.payload
         }
        const  addedtodos =[...state.todos,newTodo]
         return{
            ...state,
            todos:addedtodos
         }
      case 'SET_CURRENT_TODO':
      return{
         ...state,
         currentTodo:action.payload
      }
      default:
         return state;
   }
}