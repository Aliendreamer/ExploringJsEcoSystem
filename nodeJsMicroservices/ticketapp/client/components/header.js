import React from "react";
import Link from "next/link";
export default ({currentUser})=>{
   const links = [
     !currentUser && {label:"Sign up",href:"/auth/signup"},
     !currentUser && {label:"Sign in",href:"/auth/signin"},
     currentUser && {label:"Sign out",href:"/auth/signout"}
   ].filter(linkConfig =>linkConfig)
      .map(({label,href})=> {
         return <li key={href} className="nav-item">
            <Link href={href} key={href}> </Link>
            {label}
         </li>
   })

   return(<nav className="navbar navbar-light bg-light">
      <Link href="/">
         <a className="navbar-brand">Gitix</a>
      </Link>
      <div className="d-flex justify-content-end">
         <ul className="nav d-flx align-items-center">

         </ul>
      </div>
   </nav>)
}