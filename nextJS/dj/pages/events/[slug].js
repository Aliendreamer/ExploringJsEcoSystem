import { useRouter } from "next/dist/client/router";

export default function EventPage (){
   const router = useRouter();
   return(
      <div>
         test
         {router.query.slug}
         <button onClick={()=>router.push("/")}>home</button>
      </div>
   )
}
