import React from 'react'
import { completedURL, favoritesURL, bucketlistURL } from './hooks/customHooks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBicycle, 
  faShoePrints, 
  faTimes,
  faHeart, 
  faCheckSquare, 
  faChevronLeft,
  faListAlt } 
  from '@fortawesome/free-solid-svg-icons';

export default function TrailSpecs(props) {

  const {trail, saveToList, addToCompleted, addToBucketList, addToFavorites, showAllTrails, type, user } = props
 
  const calculateTime = () => {
    const timeInHours = ( trail['length'] / 5 ) + (trail.ascent / 2000)
    return timeInHours.toFixed(1)
  }

  const handleSaveClick = (_, trail_id, trail_type, url, user, addToListFunction) => {
    saveToList(_, trail_id, trail_type, url, user)
    addToListFunction(trail_id, trail_type)
    console.log(user)
  }


  return (
    <div className="trail-specs">
      <header>
        { type === 'bike' ? 
          <FontAwesomeIcon icon={faBicycle} 
          size="2x" 
          className="sidebar-icon" 
          color="rgb(65, 65, 65)"
          /> :
          <FontAwesomeIcon icon={faShoePrints} 
          size="2x" 
          className="sidebar-icon" 
          color="rgb(65, 65, 65)"
          />
        }
        <h2>{trail.name}</h2>
      </header>
      <section className="specs-icon-header">
        { user ?
          <>
            <p onClick={(_) => handleSaveClick(_, trail.id, type, completedURL, user, addToCompleted )}>        
              <FontAwesomeIcon icon={faCheckSquare} 
                size="1x" 
                className="sidebar-icon" 
                color="rgb(65, 65, 65)"
              />
            </p>
            <p onClick={(_) => saveToList(_, trail.id, type, bucketlistURL, user, addToBucketList )}>        
              <FontAwesomeIcon icon={faListAlt} 
                size="1x" 
                className="sidebar-icon" 
                color="rgb(65, 65, 65)"
              />
            </p>
            <p onClick={(_) => saveToList(_, trail.id, type, favoritesURL, user, addToFavorites )}>        
              <FontAwesomeIcon icon={faHeart} 
                size="1x" 
                className="sidebar-icon" 
                color="rgb(65, 65, 65)"
              />
            </p>
          </> :
          null 
        }
        <p onClick={showAllTrails}>        
          <FontAwesomeIcon icon={faChevronLeft} 
            size="1x" 
            className="sidebar-icon" 
            color="rgb(65, 65, 65)"
          />
        </p>
      </section>
      <section className="specs">
        <p>Difficulty: {trail.difficulty}</p>
        <p>Length: {trail['length']}</p>
        <p>stars: {trail.stars}</p>
      </section>
      <section className="specs">
        <p>Ascent: {trail.ascent}</p>
        <p>Descent: {trail.descent}</p>
        <p>Highest Elevation: {trail.high}</p>
      </section>
      <section className="summary">
        <p>Condition: {trail.conditionStatus}</p>
        <p>{trail.summary}</p>
        <a href={trail.url} target="_blank" rel="noopener noreferrer">
          <button>More Details</button>
        </a>
      </section>
    </div>
  )
}
