import React from 'react'
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBicycle, faShoePrints, faCampground, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import BikeTrailsPage from './BikeTrailsPage'
import HikeTrailsPage from './HikeTrailsPage'

export default function LandingPage(props) {

  // const {setChoice} = props

  const handleIconClick = (event, selection) => {
    props.setChoice(selection)
  }

  const hoverIcon = (event, selection) => {
    const activityChoice = document.querySelector('#activity-choice')
    activityChoice.innerHTML = `${selection}.`
  }

  return (
    <div className="main-page">
      <h1 id="activity-text">I want to <span id="activity-choice">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.</span></h1>
      <div className="icon-trio">
        <FontAwesomeIcon icon={faBicycle} size="7x" className="icon" onMouseEnter={(_) => hoverIcon(_,"Bike")} onMouseLeave={(_) => hoverIcon(_,"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;")} onClick={(_) => handleIconClick(_, 'bike')}/>
        <FontAwesomeIcon icon={faShoePrints} className="icon" size="5x" onMouseEnter={(_) => hoverIcon(_,"Hike")} onMouseLeave={(_) => hoverIcon(_,"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;")} onClick={(_) => handleIconClick(_, 'hike')}/>
        <FontAwesomeIcon icon={faCampground} className="icon" size="5x" onMouseEnter={(_) => hoverIcon(_,"Camp")} onMouseLeave={(_) => hoverIcon(_,"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;")} onClick={(_) => handleIconClick(_, 'camp')}/>
      </div>
    </div>
  )
}