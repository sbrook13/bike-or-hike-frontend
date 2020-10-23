import React from 'react'

export default function TrailCard(props) {
 
  const {trail, selectTrail} = props
  
  const calculateTime = () => {
    console.log(trail)
    const timeInHours = ( trail['length'] / 5 ) + (trail.ascent / 2000)
    return timeInHours.toFixed(1)
  }
  const showSpecsCard = () => {
    console.log(`clicked ${trail.name}`)
    selectTrail(trail)
  }

  return (
    <div className="trail-card" onClick={showSpecsCard}>
      <p>{trail.name}</p>
      {calculateTime()}
    </div>
  )
}
