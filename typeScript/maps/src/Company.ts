import faker from "faker";

export class Company {

   companyName:string;
   catchPhrase:string;
   location:{
      lat:number;
      lng:number;
   }
   markerContent():string{
      return `${this.companyName}`
   }
   constructor(){
      this.companyName=faker.company.companyName();
      this.catchPhrase=faker.company.catchPhrase();
      this.location={
         lat:+faker.address.latitude(),
         lng:+faker.address.longitude()
      }
   }
}