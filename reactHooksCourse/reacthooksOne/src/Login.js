import React, { useState} from 'react';

export default function Login(){

   const [username, setUsername] = useState("")
   const [password, setPassword] = useState("")
   const [user,setUser] = useState(null)
   const handleSubmit = event =>{
      event.preventDefault()
      const userData = {
         username,
         password
      }
      setUser(userData)
      setUsername('')
      setPassword('')
   }
   return(
         <>
         <div style={{
            textAlign: 'center'
         }}>
            <h2>login</h2>
             <form style={{
                display:'grid',
                alignItems:'items',
                justifyItems:'center'
             }}>
                <input
                type='text'
                placeholder='username'
                onChange ={ event => setUsername(event.target.value)}
                value={username}
                >
                </input>
                <input
                type='password'
                placeholder='password'
                onChange ={ event => setPassword(event.target.value)}
                value={password}
                >
                </input>
                <button type='submit' onClick={handleSubmit} >Submit</button>
             </form>
             {user &&  JSON.stringify(user,null,2)}
         </div>
      </>
)
}