import React from 'react';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBicycle, 
  faShoePrints, 
  faCampground, 
  faTimes,
  faHeart, 
  faCheckSquare, 
  faListAlt,
  faQuestion
 } from '@fortawesome/free-solid-svg-icons';

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
            className="sidebar-icon icon" 
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
          <p className="login-text sidebar-icon icon">LOGIN</p>
        </Link> }
      </nav>
      <div id="bottom-sidebar" className="icon-navigation">
        <FontAwesomeIcon icon={faQuestion} 
          className="icon specs-icon" 
          size="1x" 
          onClick={handleLogoutClick}
        />
        <FontAwesomeIcon icon={faTimes} 
          className="icon specs-icon logout-x" 
          size="2x" 
          onMouseEnter={handleXHover} 
          onMouseLeave={handleXHover} 
          onClick={handleLogoutClick}
        />
      </div>
    </div>
  );
}

export default SideBar;
