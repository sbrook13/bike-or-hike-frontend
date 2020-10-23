import React from 'react'
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBicycle, faShoePrints, faCampground } from '@fortawesome/free-solid-svg-icons'

export default function LandingPage({user, filterTrails}) {

  const hoverIcon = (event, selection) => {
    const activityChoice = document.querySelector('#activity-choice')
    activityChoice.innerHTML = `${selection}.`
  }

  const blankSpace = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"

  return (
    <div className="main-section center">
      { user ?
        <h2>Welcome, {user.name}!</h2> : 
        <form>
          <label>Find Trails Close to You - Enter Your Address</label>
          <input type="text" onChange={filterTrails}/>
        </form>
      }
      <h1 id="activity-text">I want to <span id="activity-choice">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.</span></h1>
      <div className="icon-trio">
        <Link to="/rides">
          <FontAwesomeIcon 
            icon={faBicycle} 
            size="7x" 
            className="icon" 
            onMouseEnter={(_) => hoverIcon(_,"Bike")} 
            onMouseLeave={(_) => hoverIcon(_, blankSpace)} 
            color="rgb(65, 65, 65)"
          />
        </Link>
        <Link to="/hikes">
          <FontAwesomeIcon 
            icon={faShoePrints} 
            className="icon" 
            size="5x" 
            onMouseEnter={(_) => hoverIcon(_,"Hike")} 
            onMouseLeave={(_) => hoverIcon(_, blankSpace)} 
            color="rgb(65, 65, 65)"
          />
        </Link>
        <Link to="/camp">
          <FontAwesomeIcon 
            icon={faCampground} 
            className="icon" 
            size="5x" 
            onMouseEnter={(_) => hoverIcon(_,"Camp")} 
            onMouseLeave={(_) => hoverIcon(_, blankSpace)} 
            color="rgb(65, 65, 65)"
          />
        </Link>
      </div>
    </div>
  )
}
