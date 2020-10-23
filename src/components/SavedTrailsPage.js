import React, {useEffect, useState} from 'react';
import TrailCard from './TrailCard';
import TrailSpecs from './TrailSpecs';
import {parseJSON} from './hooks/customHooks';

export default function SavedTrailsPage(props) {

  const [fullHikeTrailInfo, getFullHikeTrailInfo] = useState([])
  const [fullBikeTrailInfo, getFullBikeTrailInfo] = useState([])

  const { 
    title, 
    user, 
    saveToList,
    setDynamicBikeList,
    setDynamicHikeList, 
    addToFavorites,
    removeFromFavorites,
    addToCompleted,
    addToBucketList,
    removeFromBucketList,
    selectTrail,
    selectedTrail,
    savedTrails,
    showAllTrails,
    status
  } = props

  const ridesByIdURL = `https://www.mtbproject.com/data/get-trails-by-id`
  const hikesByIdURL = `https://www.hikingproject.com/data/get-trails-by-id`
  const apiKey = `key=${process.env.REACT_APP_HIKING_PROJECT_API_KEY}`


  const getHikeTrails = () =>{
    const hikeTrailsOnly = savedTrails.filter(trail => trail.trail_type === 'hike')
    const idString = saveIds(hikeTrailsOnly)
    function fetchData(){
      fetch(`${hikesByIdURL}?ids=${idString}&${apiKey}`)
        .then(parseJSON)
        .then(result => getFullHikeTrailInfo(result.trails))
    }  
    fetchData()
  }

  const getBikeTrails = () =>{
    const bikeTrailsOnly = savedTrails.filter(trail => trail.trail_type === 'hike')
    const idString = saveIds(bikeTrailsOnly)
    function fetchData(){
      fetch(`${ridesByIdURL}?ids=${idString}&${apiKey}`)
        .then(parseJSON)
        .then(result => getFullBikeTrailInfo(result.trails))
    }  
    fetchData()
  }

  const saveIds = (trailsArray) => {
    let idArray = []
    trailsArray.map(trail => {
      idArray = [...idArray, trail.trail_id]
    })
    const idString = idArray.join(',')
    return idString
  }

  // useEffect(() => {
  //   function fetchData(){
  //     const idString = saveIds()
  //     fetch(`${ridesByIdURL}?ids=${idString}&${apiKey}`)
  //       .then(parseJSON)
  //       .then(result => getFullTrailInfo(...fullTrailInfo, result.trails))
  //   }  
  //   fetchData()
  // }, [])

  // getBikeData(ridesByIdURL)
  // getHikeData(hikesByIdURL)

  const displayTrailSections = () => {
    return (
      <>
        <div>
          <h2>Rides</h2> 
          {displayTrailCards(fullBikeTrailInfo)} 
        </div>
        <div>
          <h2>Hikes</h2> 
          {displayTrailCards(fullHikeTrailInfo)} 
        </div>
      </>
    )
  }

  const displayTrailCards = (trailsArray) => {
    return trailsArray.map(trail => {
      return <TrailCard trail={trail} selectTrail={selectTrail} />
    })
  }

  const displayTrailSpecs = () => {
    const trail = selectedTrail
    return <TrailSpecs 
      trail={trail}
      saveToList={saveToList}
      addToFavorites={addToFavorites}
      removeFromFavorites={removeFromFavorites}
      addToCompleted={addToCompleted}
      addToBucketList={addToBucketList}
      removeFromBucketList={removeFromBucketList}
      showAllTrails={showAllTrails}
      type={trail.trail_type}
      user={user}
      status={status}
    />
  }

  return (
    <div className="flex-row-container">
      <h1 className="title">{title}</h1>
      <div className="two-column">
        { savedTrails[0] ? null : <p>You have no trips saved here.</p> }
        { selectedTrail ? displayTrailSpecs() : displayTrailSections() }
      </div>
    </div>
  )
}