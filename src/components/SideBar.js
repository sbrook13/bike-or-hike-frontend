import React from 'react';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBicycle, 
  faShoePrints, 
  faCampground, 
  faTimes,
  faHeart, 
  faCheckSquare, 
  faListAlt } 
  from '@fortawesome/free-solid-svg-icons';

function SideBar(props) {
  const { user, showAllTrails, logoutUser } = props

  const handleXHover = () => {
    const logoutText = document.querySelector('#logout-text')
    logoutText.classList.toggle('hidden')
  }

  const handleLogoutClick = () => {
    logoutUser(user)
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
      return (
        <Link to={link[1]} onClick={showAllTrails}>
          <FontAwesomeIcon icon={link[0]} 
            size="1x" 
            className="sidebar-icon" 
          />
        </Link>
      )
    })
  }

  return (
    <div className="sidebar">
      <nav className="icon-navigation">
        {showSideIcons(pageLinks)}
        { user ? showSideIcons(userLinks) : null }
        { user ? null : <Link to="/login">
          <p className="login-text icon">LOGIN</p>
        </Link> }
      </nav>
        <FontAwesomeIcon icon={faTimes} 
          className="icon specs-icon logout-x" 
          size="2x" 
          onMouseEnter={handleXHover} 
          onMouseLeave={handleXHover} 
          onClick={handleLogoutClick}
        />
    </div>
  );
}

export default SideBar;
