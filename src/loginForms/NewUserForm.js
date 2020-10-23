import React, {useState} from 'react'
import {parseJSON, usersURL, setToken } from '../components/hooks/customHooks'

export default function NewUserForm(props) {

  const { handleError, handleChange, loginUser, history, getUserData } = props

  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [address, setAddress] = useState("")

  function createUser() { 
    const user = { name, address, username, password }
    console.log('user', user)
    postUserToBackend(user)  
  }

  const postUserToBackend = (user) => {
    fetch(usersURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }, 
      body: JSON.stringify({ user })
    })
      .then(parseJSON)
      .then(newUser => {
        if(newUser.errors){
            throw new Error(newUser.errors[0])
        }
        setToken(newUser.token)
        loginUser(newUser)
        history.push('/')
    })
    .then(getUserData())
    .catch(handleError)
  }

  return (
    <div id="new-user-section">
      <h2>Create New User</h2>
      <p> Include your address to find trails near you!</p>
      <form method="POST" id="create-user-form">
        <input type="text" name="name" placeholder="Your Name" required="required" onChange={(_) => handleChange(_, setName)} />
        <input type="text" name="address" placeholder="Your Address" onChange={(_) => handleChange(_, setAddress)} />
        <input type="text" name="username" placeholder="Create Username"  required="required" onChange={(_) => handleChange(_, setUsername)} />
        <input type="password" name="password" placeholder="Enter password 6-15 characters"  required="required" onChange={(_) => handleChange(_, setPassword)} />
        <input type="button" className="btn" value="Create User" onClick={createUser}/>
      </form>
    </div>
  )
}