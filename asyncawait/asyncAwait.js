const promiseWithAsync = async ()=>{
      const isResolved = true;
   
      // Promise
      const examplePromiseChains =async()=>{
         return  new Promise(
          (resolve, reject) => { 
              if (isResolved) {
                  const message ="first promise";
                 resolve(message);
              } else {
                  const reason = new Error('failed promise');
                   reject(reason);
              }
      
          }
       );
      }
      
      // 2nd promise
      const secondPromise = async (x)=> {
          const message = `${x} concated second promise`;
          return Promise.resolve(message);
      };
      
      // call promise
      const promiseExample = async ()=> {
         const response = await examplePromiseChains();
         console.log(response);
         const secondResponse = await secondPromise(response);
         console.log(secondResponse);    
      };
      
      promiseExample();
}
promiseWithAsync();
