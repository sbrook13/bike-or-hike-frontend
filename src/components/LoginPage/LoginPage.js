import React from 'react'
import LoginForm from './LoginForm'
import NewUserForm from './NewUserForm'

function parseJSON(response) {
  return response.json()
}

function setToken(token){
  localStorage.setItem('token', token)
}

export default function LoginPage(props) {

  const {loginUser, history} = props
  const baseURL = 'http://localhost:3000';
  const loginURL = `${baseURL}/login`;
  const usersURL = `${baseURL}/users`;
  const homeURL = `${baseURL}/home`;

  const authHeaders = { 
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.token}`
  }

  const handleChange = (event, stateChange) => {
    stateChange(event.target.value)
  }

  function showUserData(){
    fetch(homeURL, {
      method: 'POST',
      headers: authHeaders
    })
      .then(parseJSON)
      .then(result => {
        if(result.errors){
            throw new Error('❌ Incorrect Username or Password')
        }
        loginUser(result)
        history.push('/') 
      })
      .catch(handleError)
  }

  function handleError(error){
      const errorMessage = document.querySelector('.error-message')
      errorMessage.innerText = error.message
      errorMessage.classList.remove('hidden');
  }

  return (
    <div className="main-section center">
      <LoginForm parseJSON={parseJSON} setToken={setToken} handleError={handleError} handleChange={handleChange} showUserData={showUserData} />
      <NewUserForm />
      <p className="error-message"></p>
    </div>
  )
}