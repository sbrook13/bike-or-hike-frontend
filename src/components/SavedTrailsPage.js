import React, {useEffect, useState} from 'react';
import {Switch} from 'react-router-dom';
import TrailCard from './TrailCard';
import TrailSpecs from './TrailSpecs';
import {bikeBaseURL, hikeBaseURL, parseJSON} from './hooks/customHooks';

export default function SavedTrailsPage(props) {

  const [fullTrailInfo, getFullTrailInfo] = useState([])

  const { 
    title, 
    user, 
    calculateTime,
    saveToList, 
    addToFavorites,
    addToCompleted,
    addToBucketList,
    selectTrail,
    selectedTrail,
    savedTrails,
    showAllTrails
  } = props

  const ridesByIdURL = `https://www.mtbproject.com/data/get-trails-by-id`
  const apiKey = `key=${process.env.REACT_APP_HIKING_PROJECT_API_KEY}`

  const saveIds = () => {
    let idArray = []
    savedTrails.map(trail => {
      idArray = [...idArray, trail.trail_id]
    })
    const idString = idArray.join(',')
    return idString
  }

  useEffect(() => {
    function fetchData(){
      const idString = saveIds()
      fetch(`${ridesByIdURL}?ids=${idString}&${apiKey}`)
        .then(parseJSON)
        .then(result => getFullTrailInfo(result.trails))
    }  
    fetchData()
  }, [])

  const displayTrailCards = () => {
    return fullTrailInfo.map(trail => {
      console.log(trail)
      return <TrailCard trail={trail} selectTrail={selectTrail} />
    })
  }

  const displayTrailSpecs = () => {
    const trail = selectedTrail
    return <TrailSpecs 
      trail={trail}
      calculateTime={calculateTime}
      saveToList={saveToList}
      addToCompleted={addToCompleted} 
      addToBucketList={addToBucketList} 
      addToFavorites={addToFavorites}
      showAllTrails={showAllTrails}
      type={trail.trail_type}
      user={user}
    />
  }

  return (
    <div className="flex-row-container">
      <h1 className="title">{title}</h1>
      <div className="trails-section">
        { savedTrails[0] ? null : <p>You have no trips saved here.</p> }
        { selectedTrail ? displayTrailSpecs() : displayTrailCards() }
      </div>
    </div>
  )
}