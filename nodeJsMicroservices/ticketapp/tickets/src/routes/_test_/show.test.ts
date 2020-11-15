import request  from "supertest";
import {app} from "../../app";
import mongoose from "mongoose";

it("returns 404 if no ticket found",async()=>{
      const fakeId= new mongoose.Types.ObjectId().toHexString();
      await request(app).get(`/api/tickets/${fakeId}`).send();
})

it("returns the ticket if  ticket found",async()=>{
      const ticket = {title:"concert",price:20};
      const response = await request(app).post("/api/tickets").set("Cookie",global.signin()).send(ticket).expect(201);
      const returnedTicket = await request(app).get(`/api/tickets/${response.body.id}`).send().expect(200);
      expect(returnedTicket.body.title).toEqual(ticket.title);
})