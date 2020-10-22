import React, {useState} from 'react'

export default function LoginForm(props) {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const {parseJSON, setToken, handleError, showUserData, handleChange} = props

  const authHeaders = { 
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.token}`
  }

  const baseURL = 'http://localhost:3000';
  const loginURL = `${baseURL}/login`;

  function loginUser(){ 
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
      <form method="POST" id="login-form" >
          <input type="text" name="username" placeholder="username"  required="required" onChange={(_) => handleChange(_, setUsername)} />
          <input type="password" name="password" placeholder="password"  required="required" onChange={(_) => handleChange(_, setPassword)}/>
          <input type="button" id="login-button" value="Login" onClick={loginUser} />
      </form>
    </div> 
  )
}