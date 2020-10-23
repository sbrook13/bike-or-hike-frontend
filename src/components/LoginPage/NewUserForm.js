import React from 'react'

export default function NewUserForm() {

  // function createUser(event){ 
  //   event.preventDefault()
  //   const formData = new FormData(newUserForm)
  //   const name = formData.get('name')
  //   const email = formData.get('email')
  //   let username = formData.get('username').toLowerCase()
  //   const password = formData.get('password')
  //   const user = {user:{name, email, username, password}}
    
  //   fetch(usersURL, {
  //     method: 'POST',
  //     headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify( user )
  //   })
  //     .then(parseJSON)
  //     .then(newUser => {
  //         if(newUser.errors){
  //             throw new Error(newUser.errors[0])
  //         }
  //         setToken(newUser.token)
  //         showProfile()
  //     })
  //     .catch(handleError)
  // }

  // showUserData={showUserData}

  return (
    <div id="new-user-section">
      <h1>Create New User</h1>
      <form method="POST" id="create-user-form">
        <input type="text" name="name" placeholder="Your Name" required="required" />
        <input type="text" name="email" placeholder="Your Email"  required="required" />
        <input type="text" name="home_address" placeholder="Home Address"  required="required" />
        <input type="text" name="work_address" placeholder="Work Address" />
        <div>
          <input type="text" name="username" placeholder="Create Username"  required="required" />
          <input type="password" name="password" placeholder="Enter password 6-15 characters"  required="required" />
        </div>
        <input type="submit" value="Create User" />
      </form>
    </div>
  )
}