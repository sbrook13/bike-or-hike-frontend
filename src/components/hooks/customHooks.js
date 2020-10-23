import {useState, useEffect} from 'react';

export function parseJSON(response) {
  return response.json()
}

export const authHeaders = { 
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.token}`
}

export const postTrailToBackend = (url, trail_id, trail_type, user) => {
  const user_id = user.id
  fetch(url, {
    method: 'POST',
    headers: authHeaders, 
    body: JSON.stringify({user_id, trail_id, trail_type})
  })
    .then(parseJSON)
    .then(result => console.log(result))
}

export const postUserToBackend = (url, body) => {
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }, 
    body: JSON.stringify( body )
  })
    .then(parseJSON)
}