import React, {useState} from 'react'
import TrailCard from './TrailCard'
import TrailSpecs from './TrailSpecs'

export default function HikeTrailsPage(props) {

  const { 
    allTrails, 
    filteredBikeTrails, 
    filterTrails, 
    selectTrail, 
    selectedTrail, 
    seeAllTrails, 
    addToCompleted, 
    addToDoList, 
    addToFavorites,
    showAllTrails,
    type
  } = props

  const displayAllTrails = () => {
    return allTrails.map(trail => {
      return <TrailCard trail={trail} selectTrail={props.selectTrail}/>
    })
  }

  const displayTrailSpecs = () => {
    const trail = selectedTrail
    return <TrailSpecs 
      trail={trail}
      addToCompleted={addToCompleted} 
      addToDoList={addToDoList} 
      addToFavorites={addToFavorites}
      showAllTrails={showAllTrails}
      type={type}
    />
  }

  const handleChange = (event) => {
    console.log(event.target.input)
  }

  return (
    <div className="flex-row-container">
      <form>
        <label>Seach Trails By Name:</label>
        <input type="text" onChange={event => handleChange(event)}/>
      </form>
      <div className="trails-section">
        {selectedTrail ? displayTrailSpecs() : displayAllTrails()}
      </div>
    </div>
  )
}
