import React, {useState} from 'react'
import TrailCard from './TrailCard'

export default function BikeTrailsPage(props) {

  const {
    allTrails, 
    filteredBikeTrails, 
    filterTrails, 
    setTrailSelection, 
    selectedTrail, 
    seeAllTrails, 
    addToCompleted, 
    addToList, 
    addToFavorites
  } = props
  
  const displayTrailCards = () => {
    return props.allTrails.map(trail => {
      console.log(trail)
      return <TrailCard trail={trail}/>
    })
  }

  return (
    <div className="flex-row-container">
      <form>
        <label>Seach Trails By Name:</label>
        <input type="text" onChange={props.filterTrails}/>
      </form>
      <div className="trails-section">
        {displayTrailCards()}
      </div>
    </div>
  )
}
