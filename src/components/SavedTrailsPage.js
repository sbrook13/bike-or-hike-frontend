import React, {useEffect, useState} from 'react';
import TrailCard from './TrailCard';
import TrailSpecs from './TrailSpecs';
import {bikeBaseURL, hikeBaseURL, parseJSON} from './hooks/customHooks';

export default function SavedTrailsPage(props) {

  const [fullTrailInfo, getFullTrailInfo] = useState([])

  const { 
    user, 
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

  const getTrailData = () => {
    useEffect(() => {
      function fetchData(){
        const idString = saveIds()
        fetch(`${ridesByIdURL}?ids=${idString}&${apiKey}`)
          .then(parseJSON)
          .then(result => getFullTrailInfo(result.trails))
      }  
      fetchData()
      showTrails()
    }, [])
  }

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
      saveToList={saveToList}
      addToCompleted={addToCompleted} 
      addToBucketList={addToBucketList} 
      addToFavorites={addToFavorites}
      showAllTrails={showAllTrails}
      type={trail.trail_type}
      user={user}
    />
  }

  const showTrails = () => {
    selectedTrail ? displayTrailSpecs() : displayTrailCards()
  }

  return (
    <div className="main-page">
      <h1>Bucket List</h1>
      { savedTrails[0] ? getTrailData() : <p>You have no trips saved here.</p> }
    </div>
  )
}