const promiseExampleFunc =()=>{

   const isResolved = true;

   // Promise
   const examplePromiseChains = new Promise(
       (resolve, reject) => { 
           if (isResolved) {
               const message ="first promise";
               console.log(message)
              resolve(message);
           } else {
               const reason = new Error('failed promise');
               reject(reason);
           }
   
       }
   );
   
   // 2nd promise
   const secondPromise = function () {
       const message = "second promise";
       return Promise.resolve(message);
   };
   
   // call promise
   const promiseExample = function () {
      examplePromiseChains
           .then(secondPromise)
           .then(fulfilled => console.log(fulfilled)) 
           .catch(error => console.log(error.message));
   };
   
   promiseExample();


}

const promiseExampleFuncPending =()=>{

   const isResolved = true;

   // Promise
   const examplePromiseChains = new Promise(
       (resolve, reject) => { 
           if (isResolved) {
               const message ="first promise";
               console.log(message)
             // resolve(message);
           } else {
               const reason = new Error('failed promise');
               reject(reason);
           }
   
       }
   );
   
   // 2nd promise
   const secondPromise = function () {
       const message = "second promise";
       return Promise.resolve(message);
   };
   
   // call promise
   const promiseExample = function () {
      examplePromiseChains
           .then(secondPromise)
           .then(fulfilled => console.log(fulfilled)) 
           .catch(error => console.log(error.message));
   };
   
   promiseExample();


}

const promiseExampleFuncRejected =()=>{

   const isResolved = false;

   // Promise
   const examplePromiseChains = new Promise(
       (resolve, reject) => { 
           if (isResolved) {
               const message ="first promise";
               console.log(message)
             // resolve(message);
           } else {
               const reason = new Error('failed promise');
               reject(reason);
           }
   
       }
   );
   
   // 2nd promise
   const secondPromise = function () {
       const message = "second promise";
       return Promise.resolve(message);
   };
   
   // call promise
   const promiseExample = function () {
      examplePromiseChains
           .then(secondPromise)
           .then(fulfilled => console.log(fulfilled)) 
           .catch(error => console.log(error.message));
   };
   
   promiseExample();
}

const funcPromiseOrder =()=>{
   const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

   wait(5000).then(() => console.log(4));
   Promise.resolve().then(() => console.log(2)).then(() => console.log(3));
   console.log(1); // 1, 2, 3, 4

} 

funcPromiseOrder()
//promiseExampleFunc();
//promiseExampleFuncPending();
//promiseExampleFuncRejected();