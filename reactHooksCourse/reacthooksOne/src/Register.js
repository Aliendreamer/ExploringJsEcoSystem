import React, { useState } from 'react'
const initialState = {
	username:'',
	password:'',
	email:''
}
export default function Register (){
	const [userData,setData] =	useState(initialState)
	const [user,setUser] = useState('')
	const handleSubmit= event =>{
		event.preventDefault()
		setUser(userData)
		setData(initialState)
	}
	const handleChange = event=> {
		setData( {
			...userData,
			[event.target.name]:event.target.value
		})
	}
   return(
      <>
      <div style={{
         textAlign: 'center'
      }}>
      <h2>Register</h2>
      <form style={{display:'grid',alignItems:'items',justifyItems:'center'}} onSubmit={handleSubmit}>
             <input value={userData.username} type='text' placeholder='username' name= 'username' onChange={handleChange} ></input>
             <input value ={userData.password} type='password' placeholder='password' name='password' onChange={handleChange}></input>
             <input value ={userData.email} type='email' placeholder='email' name='password' onChange={handleChange}></input>
				 <button type='submit'>submit</button>
          </form>
			 {user && JSON.stringify(user,null,2)}
      </div>
   </> 
   )
}