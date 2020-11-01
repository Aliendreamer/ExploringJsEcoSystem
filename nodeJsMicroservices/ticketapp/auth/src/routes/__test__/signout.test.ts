import request from "supertest";
import {app} from "../../app";


it('clears teh cookie after signout',async ()=>{
   await request(app)
         .post("/api/users/signup")
         .send({
            email:"test@test.com",
            password:"password"
         })
        .expect(201)
   await request(app)
         .post("/api/users/signout")
         .send({}).expect(200)
})