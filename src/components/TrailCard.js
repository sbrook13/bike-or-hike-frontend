import React from 'react'
import {calculateTime} from './hooks/customHooks'

export default function TrailCard(props) {
 
  const {trail, selectTrail, type} = props
  


  const showSpecsCard = () => {
    selectTrail(trail)
  }

  return (
    <div className="trail-card" onClick={showSpecsCard}>
      <p>{trail.name}</p>
      <p className="bold">{calculateTime(trail, type)}hrs</p>
    </div>
  )
}
