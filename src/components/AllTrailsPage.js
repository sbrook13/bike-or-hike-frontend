import React from 'react'
import TrailCard from './TrailCard'
import TrailSpecs from './TrailSpecs'

export default function AllTrailsPage(props) {

  const { 
    saveToList,
    addToFavorites,
    removeFromFavorites,
    addToCompleted,
    addToBucketList,
    removeFromBucketList,
    allTrails, 
    filteredTrailList, 
    filterTrails, 
    selectTrail, 
    selectedTrail, 
    showAllTrails, 
    type,
    user,
    status
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
      return <TrailCard trail={trail} type={type} status={status} selectTrail={selectTrail} />
    })
  }

  const displayTrailSpecs = () => {
    const trail = selectedTrail
    return <TrailSpecs 
      trail={trail} 
      type={type} 
      user={user}
      status={status}
      selectTrail={selectTrail}
      saveToList={saveToList}
      addToFavorites={addToFavorites}
      removeFromFavorites={removeFromFavorites}
      addToCompleted={addToCompleted}
      addToBucketList={addToBucketList}
      removeFromBucketList={removeFromBucketList}
    />
  }

  return (
    <div className="flex-row-container">
        {selectedTrail ? displayTrailSpecs() : trailPageWithSearch()}
    </div>
  )
}
