import React from 'react'
import {calculateTime} from './hooks/customHooks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBicycle, faShoePrints, faPen, faTimes, faHeart, faCheckSquare } from '@fortawesome/free-solid-svg-icons'

export default function TrailCard(props) {
 
  const {
    trail, 
    saveToList,
    addToFavorites,
    removeFromFavorites,
    addToCompleted,
    addToBucketList,
    removeFromBucketList,
    selectTrail, 
    type, 
    category
  } = props

  const showSpecsCard = () => {
    selectTrail(trail)
  }

  const statusElement = () => {
    switch(category) {
      case 'completed':
        return ( 
          <>
            <FontAwesomeIcon icon={faPen} 
              size="1x" 
              className="sidebar-icon specs-icon" 
              onClick={console.log('journal')}
            />
            <FontAwesomeIcon icon={faHeart} 
              size="1x" 
              className="sidebar-icon specs-icon" 
              onClick={addToFavorites(trail.id, type)}
            />
          </>
        )
      case 'bucket-list':
        return (
          <>
            <FontAwesomeIcon icon={faCheckSquare} 
              size="1x" 
              className="sidebar-icon specs-icon" 
              onClick={addToCompleted(trail.id, type)}
            />
            <FontAwesomeIcon icon={faHeart} 
              size="1x" 
              className="sidebar-icon specs-icon" 
              onClick={addToFavorites(trail.id, type)}
            />
          </>
        )
      case 'favorites':
        return (
          <FontAwesomeIcon icon={faTimes} 
            size="1x" 
            className="sidebar-icon specs-icon" 
            onClick={removeFromFavorites(trail)}
          />
        )
    }
  }

    const trailTypeIcon = () => {
      if (category !== "all"){
        if (type === "bike") { 
          return (
            <FontAwesomeIcon icon={faBicycle} 
            size="2x" 
            color="rgb(65, 65, 65)"
            className="specs-icon"
            />
          )
        } else {
          return (
            <FontAwesomeIcon icon={faShoePrints} 
              size="2x" 
              color="rgb(65, 65, 65)"
              className="specs-icon"
            />
          )
        }
      }
    }

  return (
    <div className="trail-card" onClick={showSpecsCard}>
      {trailTypeIcon(trail, type)}
      <p>{trail.name}</p>
      <p className="bold">{calculateTime(trail, type)} hrs</p>
      {statusElement(trail, type)}
    </div>
  )
}
