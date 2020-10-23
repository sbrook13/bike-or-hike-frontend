import React, {useState} from 'react'
import TrailCard from './TrailCard'
import TrailSpecs from './TrailSpecs'

export default function AllTrailsPage(props) {
  const { 
    saveToList,
    dynamicList,
    setDynamicList,
    addToFavorites,
    removeFromFavorites,
    addToCompleted,
    addToBucketList,
    removeFromBucketList,
    allTrails, 
    selectTrail, 
    selectedTrail, 
    type,
    user,
    status
  } = props

  const [inputValue, setInputValue] = useState("")

  // const filterTrails = (event) => {
  //   const input = event.target.value
  //   const filteredTrails = dynamicList.filter(trail => (
  //       trail.name
  //         .toLowerCase()
  //         .includes(input.toLowerCase())  
  //       )
  //     )
  //     setDynamicList(filteredTrails)
  // }

  const trailPageWithSearch = () => {
    return (
      <>
        <form>
        <label>Search Trails By Name:</label>
        <input type="text" 
        // onChange={filterTrails}
        />
        </form>
        <div className="trails-section">
          {displayTrailCards()}
        </div>
      </>
    )
  }

  const displayTrailCards = () => {
    console.log(allTrails)
    return allTrails.map(trail => {
      return <TrailCard trail={trail} type={type} status={status} selectTrail={selectTrail} />
    })
    
    // if (dynamicList[0]){
      
    // } else {
    //   setDynamicList(allTrails)
    //   return <p>No trails match, try again!</p>
    // }
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
