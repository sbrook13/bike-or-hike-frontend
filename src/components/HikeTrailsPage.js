import React, {useState, useEffect} from 'react'

export default function HikeTrailsPage(props) {

  const displayTrails = () => {
    return props.allTrails.map(trail => {
      return (
        <div className="main-page trail-card">
          <p
            style={{
              "font-size": "8",
              }
            }
          >{trail.name}</p>
          {console.log({trail})}
          {calculateTime({trail})}
        </div>
      )
    })
  }

  const calculateTime = (trail) => {
    console.log(trail)
    const timeInHours = ( trail["length"] / 5 ) + (trail.ascent / 2000)
    return timeInHours
  }

  return (
    <div>
      {displayTrails()}
    </div>
  )
}
