import React from 'react'
import LoginForm from './LoginForm'
import NewUserForm from './NewUserForm'
import {parseJSON, authHeaders, homeURL} from '../components/hooks/customHooks'

export default function LoginPage(props) {

  const { loginUser, history, loadCompleted, loadFavorites, loadBucketList } = props

  const handleChange = (event, stateChange) => {
    stateChange(event.target.value)
  }

  function handleError(error){
      const errorMessage = document.querySelector('.error-message')
      errorMessage.innerText = error.message
      errorMessage.classList.remove('hidden');
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
        loadCompleted(result.completed_trails)
        loadFavorites(result.favorites)
        loadBucketList(result.bucket_lists)
        history.push('/') 
      })
      .catch(handleError)
  }

  return (
    <div className="main-section center">
      <LoginForm handleError={handleError} handleChange={handleChange} showUserData={showUserData} />
      <NewUserForm 
        handleError={handleError} 
        handleChange={handleChange} 
        loginUser={loginUser} 
        history={history} 
        loadCompleted={loadCompleted} 
        loadFavorites={loadFavorites} 
        loadBucketList={loadBucketList} 
      />
      <p className="error-message"></p>
    </div>
  )
}