import React from 'react'

export default function CampingPage(props) {
  const { title } = props

  return (
    <div className="main-page">
      <h1>{title}</h1>
    </div>
  )
}
