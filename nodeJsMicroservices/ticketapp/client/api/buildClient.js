import axios from "axios";

export default ({req})=>{
   if(typeof window === 'undefined'){
      // it si servicename.namespace   took me 30 mins to figure out wtf is going on strange next js  and kubernetes things anyway
      return axios.create({
         baseURL: "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
         headers:req.headers
      });

   }else{
      return axios.create({baseURL: "/"});
   }
}