const whyPromiseNotCallback=()=>{
   let resultA, resultB, resultC;

   function addAsync(num1, num2) {
         const result = Promise.resolve(num1+num2)
           return result.then(x=> x); 
   }
   
   addAsync(1, 2)
       .then(success => {
           resultA = success;
           return resultA;
       })
       .then(success => addAsync(success, 3))
       .then(success => {
           resultB = success;
           return resultB;
       })
       .then(success => addAsync(success, 4))
       .then(success => {
           resultC = success;
           return resultC;
       })
       .then(success => {
           console.log('total: ' + success)
           console.log(resultA, resultB, resultC)
       });
}

whyPromiseNotCallback()