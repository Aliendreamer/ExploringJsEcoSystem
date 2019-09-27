const http = require('http');

function rqListeneter(req,res){
    console.log(req.url,req.headers,req.method)
    res.write('<html><body>hello</body></html>')
    res.end()
};


const server = http.createServer(rqListeneter);

server.listen(3001)