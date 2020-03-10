const express = require('express');
const axios = require("axios");
const  app = express();
const stream = require('stream');

app.get('/', function (req, res) {
      axios({method:'get',url:'https://i.pinimg.com/originals/ca/76/0b/ca760b70976b52578da88e06973af542.jpg',  responseType: 'stream'}).then(resp=>{
      const ps = new stream.PassThrough();// <---- this makes a trick with stream error handling
      stream.pipeline(
       resp.data,
       ps, // <---- this makes a trick with stream error handling
      (err) => {
       if (err) {
         console.log(err) // No such file or any other kind of error
         return res.sendStatus(400); 
       }
     })
     ps.pipe(res) // <---- this makes a trick with stream error handling
   });
});




app.listen(4000, function () {
  console.log('Example app listening on port 3000!');
});