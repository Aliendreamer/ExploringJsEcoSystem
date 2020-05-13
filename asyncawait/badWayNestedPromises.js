const nestingPromises =()=>{
   const nestedPromises = (x)=>{
      return new Promise((resolve,reject)=>{
         const newX=x+1;
         console.log("working")
         setTimeout(resolve,2000,newX);
      })
        
   }
   nestedPromises(1)
      .then(x=>nestedPromises(x))
      .then(x=>nestedPromises(x))
      .then(x=>nestedPromises(x))
      .then(x=>console.log(x))
}
 //nestingPromises();

const doSomething=(x)=>{
   const newX= x+1;
   return Promise.resolve(newX);
}

 doSomething(0)
  .then(x => {
     doSomething(x)
     .then(x=>{
        doSomething(x).then(x=>console.log(x));
     });
  })
