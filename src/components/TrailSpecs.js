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
    <div className="specs-card">
      <header className="specs-header">
        { type === 'bike' ? 
          <FontAwesomeIcon icon={faBicycle} 
          size="2x" 
          color="rgb(65, 65, 65)"
          className="specs-icon"
          /> :
          <FontAwesomeIcon icon={faShoePrints} 
          size="2x" 
          color="rgb(65, 65, 65)"
          className="specs-icon"
          />
        }
        <h2>{trail.name}</h2>
      </header>
      <section className="specs-icon-header">
        <p onClick={showAllTrails}>        
          <FontAwesomeIcon icon={faChevronLeft} 
            size="1x" 
            className="sidebar-icon specs-icon" 
          />
        </p>
        { user ?
          <>
            <p onClick={(_) => handleSaveClick(_, trail.id, type, completedURL, user, addToCompleted )}>        
              <FontAwesomeIcon icon={faCheckSquare} 
                size="1x" 
                className="sidebar-icon specs-icon" 
              />
            </p>
            <p onClick={(_) => saveToList(_, trail.id, type, bucketlistURL, user, addToBucketList )}>        
              <FontAwesomeIcon icon={faListAlt} 
                size="1x" 
                className="sidebar-icon specs-icon" 
              />
            </p>
            <p onClick={(_) => saveToList(_, trail.id, type, favoritesURL, user, addToFavorites )}>        
              <FontAwesomeIcon icon={faHeart} 
                size="1x" 
                className="sidebar-icon specs-icon" 
              />
            </p>
          </> :
          null 
        }
      </section>
      <section className="specs">
        <p>Difficulty: {trail.difficulty}</p>
        <p>Length: {trail['length']} miles</p>
        <p>Stars: {trail.stars} / 5</p>
      </section>
      <section className="specs">
        <p>Ascent: {trail.ascent} ft</p>
        <p>Descent: {trail.descent} ft</p>
        <p>Highest Elevation: {trail.high} ft</p>
      </section>
      <section className="specs-summary">
        <p className="detail">Condition: {trail.conditionStatus}</p>
        <p className="detail">{trail.summary}</p>
        <a href={trail.url} target="_blank" rel="noopener noreferrer">
          <button className="detail btn">More Details</button>
        </a>
      </section>
    </div>
  )
}
