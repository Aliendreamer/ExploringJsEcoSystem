import  buildClient from "../api/buildClient"
const LandingPage = ({currentUser})=>{
   return currentUser ? <h1>signed in</h1>:<h1>not signed in</h1>
}

LandingPage.getInitialProps = async(context)=>{
   const {data} = await buildClient(context).get("/api/users/currentuser");
   return data;
}
export default LandingPage;