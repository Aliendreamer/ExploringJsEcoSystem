import Fastify from "fastify";
import fastifySocketIO from "fastify-socket.io";
import fastifyStatic from "@fastify/static";
import path from "path";
import namespaces from "./data/namespaces.js";


const fastify = Fastify({
	logger: true
});
fastify.register(fastifySocketIO, {
  // put your options here
});
fastify.register(fastifyStatic, {
	root: path.join(import.meta.dirname, 'public'),
	prefixAvoidTrailingSlash: true,
	index: "slack.html",
	prefix:"/"
})


await fastify.ready();
fastify.io.on("connection", function (socket) {
	console.log("connected");
	socket.on("clientConnect", () => {
		console.log(socket.id,"client connected");
	});
	socket.emit("nsList", namespaces);
});


fastify.listen({ port: 3000 });