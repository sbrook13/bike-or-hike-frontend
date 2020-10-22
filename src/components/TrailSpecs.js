import React, {useState, useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBicycle, 
  faShoePrints, 
  faCampground, 
  faChevronUp, 
  faTimes,
  faHeart, 
  faCheckSquare, 
  faListAlt } 
  from '@fortawesome/free-solid-svg-icons';

export default function TrailSpecs(props) {

  const {trail, addToCompleted, addToDoList, addToFavorites, showAllTrails, type} = props
 
  const calculateTime = () => {
    console.log(trail)
    const timeInHours = ( trail['length'] / 5 ) + (trail.ascent / 2000)
    return timeInHours.toFixed(1)
  }

  return (
    <div className="trail-specs">
      <h2>{trail.name}</h2>
      <header className="specs-icon-header">
        <p onClick={(_) => addToCompleted(_, trail.id, type)}>        
          <FontAwesomeIcon icon={faCheckSquare} 
            size="1x" 
            className="sidebar-icon" 
            color="rgb(65, 65, 65)"
          />
        </p>
        <p onClick={(_) => addToDoList(_, trail.id, type)}>        
          <FontAwesomeIcon icon={faListAlt} 
            size="1x" 
            className="sidebar-icon" 
            color="rgb(65, 65, 65)"
          />
        </p>
        <p onClick={(_) => addToFavorites(_, trail.id, type)}>        
          <FontAwesomeIcon icon={faHeart} 
            size="1x" 
            className="sidebar-icon" 
            color="rgb(65, 65, 65)"
          />
        </p>
        <p onClick={showAllTrails}>        
          <FontAwesomeIcon icon={faTimes} 
            size="1x" 
            className="sidebar-icon" 
            color="rgb(65, 65, 65)"
          />
        </p>
      </header>
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
        <a href={trail.url} target="_blank">
          <button href={trail.url} target="_blank">More Details</button>
        </a>
      </section>
    </div>
  )
}
