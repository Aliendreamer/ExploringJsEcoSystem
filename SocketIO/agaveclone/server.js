import Fastify from "fastify";
import fastifySocketIO from "fastify-socket.io";
import fastifyStatic from "@fastify/static";
import cors from '@fastify/cors';
import { instrument } from "@socket.io/admin-ui";
import path from "path";


const fastifyInstance = Fastify({
	logger: true
});
await fastifyInstance.register(cors, {
	origin:["http://localhost:3000","http://localhost:4000"],
	credentials:true
  })

  await fastifyInstance.register(fastifySocketIO, {
	cors:{
		origin:["http://localhost:3000","http://localhost:4000"],
		credentials:true
	}
  });

instrument(fastifyInstance.io, { auth: false,mode:"development" });
fastifyInstance.register(fastifyStatic, {
	root: path.join(import.meta.dirname, 'public'),
	prefixAvoidTrailingSlash: true,
	index: "index.html",
	prefix:"/",
	decorateReply: false,
});

export const fastifyInstanceDashboard = Fastify({
	logger: true
});
await fastifyInstanceDashboard.register(fastifyStatic, {
	root: path.join(import.meta.dirname, 'adminui'),
	prefixAvoidTrailingSlash: true,
	index: "index.html",
	prefix:"/",
	decorateReply: false,
});
await fastifyInstanceDashboard.ready();
await fastifyInstance.ready();

export default fastifyInstance;