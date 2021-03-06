import React, { useContext, useReducer} from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import TodosContext from './context';
import todoReducer from './reducer';
import Todolist from './components/TodoList';
import TodoForm from './components/TodoForm';
const App = () =>{
  const initialState = useContext(TodosContext)
   const [state,dispatch] =useReducer(todoReducer,initialState)
   return(
      <TodosContext.Provider value={{state,dispatch}}>
         <TodoForm/>>
         <Todolist/>
      </TodosContext.Provider>
   )
}

ReactDOM.render(
   <App />,
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
