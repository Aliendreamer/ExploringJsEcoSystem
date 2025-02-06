import Fastify from "fastify";
import fastifySocketIO from "fastify-socket.io";
import fastifyStatic from "@fastify/static";
import path from "path";


const fastify = Fastify({
	logger: true
  });
fastify.register(fastifySocketIO, {
  // put your options here
});
fastify.register(fastifyStatic, {
  root: path.join(import.meta.dirname, 'public'),
  prefix: '/public/'
})

fastify.get('/', function (req, reply) {
  reply.sendFile('chat.html');
})
fastify.ready((err) => {
  if (err) throw err

  fastify.io.on("connection", function (socket) {
    console.log("connected");
    socket.emit("messageFromServer",{data:"Hello from server"});
    socket.on("messageFromClient", function (data) {
      console.log(data);
    });
    socket.on("newMessageFromClient", function (data) {
      fastify.io.emit("messageToClients", data);
    });
  });
})


fastify.listen({ port: 3000 });