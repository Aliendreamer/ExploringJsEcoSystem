import request from "supertest";
import {app} from "../../app";


it('returns 400 on successful signin',async ()=>{
   return request(app)
         .post("/api/users/signin")
         .send({
            email:"testOne@test.com",
            password:"password"
         })
         .expect(400)
})


it('returns 400 on signin with wrong password',async ()=>{
   await request(app)
         .post("/api/users/signup")
         .send({
            email:"testOne@test.com",
            password:"password"
         })
         .expect(201)
         await request(app)
         .post("/api/users/signin")
         .send({
            email:"testOne@test.com",
            password:"pasword"
         })
         .expect(400)
})

it('returns 400 on signin with wrong password',async ()=>{
   await request(app)
         .post("/api/users/signup")
         .send({
            email:"testOne@test.com",
            password:"password"
         })
         .expect(201)
        const response =  await request(app)
         .post("/api/users/signin")
         .send({
            email:"testOne@test.com",
            password:"password"
         }).expect(200)
         expect(response.get("Set-Cookie")).toBeDefined()
})