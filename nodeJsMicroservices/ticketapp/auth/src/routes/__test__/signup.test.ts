import request from "supertest";
import {app} from "../../app";

it('returns 201 on successful signup',async ()=>{
   return request(app)
         .post("/api/users/signup")
         .send({
            email:"testOne@test.com",
            password:"password"
         })
         .expect(201)
})

it('returns 400 with invalid email',async ()=>{
   return request(app)
         .post("/api/users/signup")
         .send({
            email:"adada",
            password:"password"
         })
         .expect(400)
})

it('returns 400 with invalid password',async ()=>{
   return request(app)
         .post("/api/users/signup")
         .send({
            email:"test@test.com",
            password:"h"
         })
         .expect(400)
})

it('returns 400 with missing mail and password',async ()=>{
   return request(app)
         .post("/api/users/signup")
         .send({

         })
         .expect(400)
})
it('disallows duplicate mails',async ()=>{

   await request(app)
   .post("/api/users/signup")
   .send({
      email:"testOne@test.com",
      password:"password"
   })
   .expect(201)
   await request(app)
   .post("/api/users/signup")
   .send({
      email:"testOne@test.com",
      password:"password"
   })
   .expect(400)
})


it('sets a cookie after successful signup',async ()=>{
   const response = await request(app)
         .post("/api/users/signup")
         .send({
            email:"testOne@test.com",
            password:"password"
         })
      expect(response.get("Set-Cookie")).toBeDefined();
})