const examplePromiseChains =async()=>{
   const isResolved=true;
   return  new Promise(
    (resolve, reject) => { 
        if (isResolved) {
            const message ="first promise";
           //resolve(message);
        } else {
            const reason = new Error('failed promise');
             reject(reason);
        }

    }
 );
}

examplePromiseChains()