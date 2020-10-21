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
  const {setChoice} = props

  const [allBikeTrails, setBikeTrails] = useState([])
  const [allHikingTrails, setHikingTrails] = useState([])
  const color = "rgb(65, 65, 65)"

  const handleSidebarClick = (_, choice) => {
    setChoice(choice)
  }

  const handleXHover = () => {
    const logoutText = document.querySelector('#logout-text')
    logoutText.classList.toggle('hidden')
  }

  return (
    <div className="sidebar">
      <nav className="icon-navigation">
        <Link to="/login">
          <p className="login-text sidebar-icon">LOGIN</p>
        </Link>
        <Link to="/rides">
          <FontAwesomeIcon icon={faBicycle} 
            size="1x" 
            className="sidebar-icon" 
            onClick={(_) => handleSidebarClick(_,'bike')} 
            color="rgb(65, 65, 65)"
          />
        </Link>
        <Link to="/hikes">
          <FontAwesomeIcon icon={faShoePrints} 
            className="sidebar-icon" 
            size="1x" 
            onClick={(_) => handleSidebarClick(_,'hike')} 
            color="rgb(65, 65, 65)"
          />
        </Link>
        <Link to="/camp">
          <FontAwesomeIcon icon={faCampground} 
            className="sidebar-icon" 
            size="1x" 
            onClick={(_) => handleSidebarClick(_,'camp')} 
            color={color}
          />
        </Link>
        <Link to="/completed">
          <FontAwesomeIcon icon={faCheckSquare} 
            className="sidebar-icon" 
            size="1x" 
            onClick={(_) => handleSidebarClick(_,'completedList')} 
            color={color}
          />
        </Link>
        <Link to="/bucket-list">
          <FontAwesomeIcon icon={faListAlt} 
            className="sidebar-icon" 
            size="1x" 
            onClick={(_) => handleSidebarClick(_,'toDoList')} 
            color={color}
          />
        </Link>
        <Link to="/favorites">
          <FontAwesomeIcon icon={faHeart} 
            className="sidebar-icon" 
            size="1x" 
            onClick={(_) => handleSidebarClick(_,'favorites')} 
            color={color}
          />
        </Link>
      </nav>
        <FontAwesomeIcon icon={faTimes} 
          className="sidebar-icon logout-x" 
          size="2x" 
          onClick={(_) => handleSidebarClick(_,'sidebar X clicked')} 
          onMouseEnter={handleXHover} 
          onMouseLeave={handleXHover} 
          color={color}
        />
    </div>
  );
}

export default SideBar;
