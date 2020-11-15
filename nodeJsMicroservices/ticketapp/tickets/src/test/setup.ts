import {MongoMemoryServer} from "mongodb-memory-server";
import mongoose from "mongoose";
import jwt from 'jsonwebtoken';

let mongo:any;

declare global{
   namespace NodeJS{
      interface Global{
         signin():string[];
      }
   }
}

beforeAll(async()=>{
   process.env.JWT_KEY ="randomStringTest";
   process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
   mongo = new MongoMemoryServer();
   const mongoUri  = await mongo.getUri();
   await mongoose.connect(mongoUri,{
      useNewUrlParser:true,
      useUnifiedTopology:true
   })
})
beforeEach(async ()=>{
   const collections = await mongoose.connection.db.collections();
   for (const collection of collections) {
      await collection.deleteMany({});
   }
})

afterAll(async ()=>{
   await mongo.stop();
   await mongoose.connection.close();
})

global.signin = ()=>{
   const payload ={
      id: new mongoose.Types.ObjectId().toHexString(),
      email:"test@testtest.com"
   }
   const token = jwt.sign(payload,process.env.JWT_KEY!)
   const session = {jwt:token};
   const sessionJson = JSON.stringify(session);
   const base64 = Buffer.from(sessionJson).toString('base64');
   return [`express:sess=${base64}`];
}