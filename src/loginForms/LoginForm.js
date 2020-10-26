import React, { useState } from 'react';
import { parseJSON, loginURL, setToken } from '../components/hooks/customHooks'

export default function LoginForm(props) {
  
  const { handleError, handleChange, showUserData } = props
  
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  function loginUser(e){ 
    e.preventDefault()
    const user = { username, password }
    getToken(user)  
  }

  function getToken(user){
    fetch(loginURL, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(parseJSON)
      .then(result => {
        if(result.error){
            throw new Error(result.error)
        }
        setToken(result.token)
        showUserData()
      })
      .catch(handleError)
  }

  return (
    <div id="login-section">
      <h2>Login</h2>
      <form method="POST" id="login-form" onSubmit={(_) => loginUser(_)}>
          <input type="text" name="username" placeholder="username"  required="required" onChange={(_) => handleChange(_, setUsername)} />
          <input type="password" name="password" placeholder="password"  required="required" onChange={(_) => handleChange(_, setPassword)}/>
          <input className="btn" type="submit" id="login-button" value="Login" />
      </form>
    </div> 
  )
}