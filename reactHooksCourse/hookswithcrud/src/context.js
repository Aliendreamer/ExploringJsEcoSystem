import React from 'react';

 const TodosContext = React.createContext({
   todos:[
      {
         id:1,
         text:" test1",
         complete:false
      },
      {
         id:2,
         text:" test2",
         complete:true
      },
      {
         id:3,
         text:"test3",
         complete:false
      }
   ],
   currentTodo:{}
})
export default TodosContext;