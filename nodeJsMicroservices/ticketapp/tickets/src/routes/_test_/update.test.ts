import request  from "supertest";
import {app} from "../../app";
import mongoose from "mongoose";


it("returns 404 if no ticket found",async()=>{
   const fakeId= new mongoose.Types.ObjectId().toHexString();
   await request(app).put(`/api/tickets/${fakeId}`).set("Cookie",global.signin()).send({title:"test",price:20}).expect(404);
})


it("returns 401 if no authenticated",async()=>{
   const fakeId= new mongoose.Types.ObjectId().toHexString();
   await request(app).put(`/api/tickets/${fakeId}`).send({title:"test",price:20}).expect(401);
})

it("returns 401 if not the ticket is users ",async()=>{
    const response = await request(app).post(`/api/tickets/`).set("Cookie",global.signin()).send({title:"testing",price:101});
    await request(app).put(`/api/tickets/${response.body.id}`).set("Cookie",global.signin()).send({title:"testing",price:10}).expect(401);
})

it("returns 400 if invalid title or price",async()=>{
   const cookie = global.signin();
   const response =  await request(app).post("/api/tickets/")
                     .set("Cookie",cookie)
                     .send({title:"ddada",price:22});
   await request(app).put(`/api/tickets/${response.body.id}`)
                     .set("Cookie",cookie)
                     .send({title:"dadada",price:-1})
                     .expect(400);
})

it("it updated the ticket with valid inputs",async()=>{
   const cookie = global.signin();
   const response =  await request(app).post("/api/tickets/")
                     .set("Cookie",cookie)
                     .send({title:"ddada",price:22});
  await request(app).put(`/api/tickets/${response.body.id}`)
                     .set("Cookie",cookie)
                     .send({title:"newTitle",price:10})
                     .expect(200)
  const ticketResponse =  await request(app).get(`/api/tickets/${response.body.id}`).send();
  expect(ticketResponse.body.title).toEqual("newTitle");
})


