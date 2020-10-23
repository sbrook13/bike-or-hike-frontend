import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
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

// import LandingPage from './components/LandingPage';
// import BikeTrailsPage from './components/BikeTrailsPage';
// import HikeTrailsPage from './components/HikeTrailsPage';
// import FavoritesPage from './components/FavoritesPage';


function SideBar(props) {
  const { user } = props

  const [allBikeTrails, setBikeTrails] = useState([])
  const [allHikingTrails, setHikingTrails] = useState([])
  const color = "rgb(65, 65, 65)"

  const handleXHover = () => {
    const logoutText = document.querySelector('#logout-text')
    logoutText.classList.toggle('hidden')
  }

  const pageLinks = [
    [faBicycle, '/rides'], 
    [faShoePrints, '/hikes'], 
    [faCampground, '/camp'], 
  ]

  const userLinks = [
    [faCheckSquare, '/completed'], 
    [faListAlt, '/bucket-list'], 
    [faHeart, '/favorites']
  ]

  const showSideIcons = (links) => {
    return links.map(link => {
      return <Link to={link[1]}>
        <FontAwesomeIcon icon={link[0]} 
          size="1x" 
          className="sidebar-icon" 
          color="rgb(65, 65, 65)"
        />
      </Link>
    })
  }

  return (
    <div className="sidebar">
      <nav className="icon-navigation">
        {showSideIcons(pageLinks)}
        { user ? showSideIcons(userLinks) : null }
        { user ? null : <Link to="/login">
          <p className="login-text sidebar-icon">LOGIN</p>
        </Link> }
      </nav>
        <FontAwesomeIcon icon={faTimes} 
          className="sidebar-icon logout-x" 
          size="2x" 
          onMouseEnter={handleXHover} 
          onMouseLeave={handleXHover} 
          color={color}
        />
    </div>
  );
}

export default SideBar;
