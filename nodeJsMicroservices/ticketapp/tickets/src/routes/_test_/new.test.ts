import request  from "supertest";
import {app} from "../../app";
import { Ticket } from "../../models/ticket";


it('has route handler on /api/tickets for post request',async ()=>{
   const response = await request(app).post('/api/tickets').send({})
   expect(response.status).not.toEqual(404);
})

it('can be accessed only if user signed in',async ()=>{
   const response = await request(app).post('/api/tickets').send({})
   expect(response.status).toEqual(401)
})


it('can be accessed if user signed in',async ()=>{
   const response = await request(app).post('/api/tickets')
   .set("Cookie",global.signin())
   .send({})
   expect(response.status).not.toEqual(401)
})




it('return error with invalid title',async()=>{
   const response = await request(app).post('/api/tickets')
   .set("Cookie",global.signin())
   .send({title:"",price:10})

   expect(response.status).toEqual(400)
})

it('it return error for invalid price',async()=>{
   const response = await request(app).post('/api/tickets')
   .set("Cookie",global.signin())
   .send({title:"aaaa",price:-1})

   expect(response.status).toEqual(400)
})


it(' should return success if ticket is valid',async()=>{
   let tickets =await Ticket.find({});
   expect(tickets.length).toEqual(0)
   const response = await request(app).post('/api/tickets')
   .set("Cookie",global.signin())
   .send({title:"aaaa",price:1})

   expect(response.status).toEqual(201)
   tickets = await Ticket.find({});
   expect(tickets.length).toEqual(1)

})