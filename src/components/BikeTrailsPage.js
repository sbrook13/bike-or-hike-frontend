import React from 'react'
import TrailCard from './TrailCard'
import TrailSpecs from './TrailSpecs'

export default function BikeTrailsPage(props) {

  const { 
    saveToList,
    addToFavorites,
    addToCompleted,
    addToBucketList,
    allTrails, 
    filteredTrailList, 
    filterTrails, 
    selectTrail, 
    selectedTrail, 
    showAllTrails, 
    type,
    user
  } = props
  

  const trailPageWithSearch = () => {
    return (
      <>
        <form>
        <label>Seach Trails By Name:</label>
        <input type="text" onChange={props.filterTrails}/>
        </form>
        <div className="trails-section">
          {displayTrailCards()}
        </div>
      </>
    )
  }

  const displayTrailCards = () => {
    return allTrails.map(trail => {
      return <TrailCard trail={trail} type={type} selectTrail={selectTrail} />
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
      type={type}
      user={user}
    />
  }

  return (
    <div className="flex-row-container">
        {selectedTrail ? displayTrailSpecs() : trailPageWithSearch()}
    </div>
  )
}
