import React, {useState, useEffect} from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faBicycle, faShoePrints, faCampground, faChevronUp, faTimes } from '@fortawesome/free-solid-svg-icons'

import LandingPage from './components/LandingPage';
import BikeTrailsPage from './components/BikeTrailsPage';
import HikeTrailsPage from './components/HikeTrailsPage';
import FavoritesPage from './components/FavoritesPage';
import Contact from './components/Contact';

function App() {

  const [bikeOrHike, setBikeorHike] = useState(null)
  const [allBikeTrails, setBikeTrails] = useState([])
  const [allHikingTrails, setHikingTrails] = useState([])

  let lat = "39.7392"
  let lon = "-104.9903"
  const color = "rgb(65, 65, 65)"

  useEffect(() => {
    const fetchBikeData = async () => {
      try {
        const result = await fetch(`https://www.mtbproject.com/data/get-trails?
          lat=${lat}&
          lon=${lon}&
          minStars=3.5&
          minLength=2&
          maxResults=200&
          maxDistance=20&
          key=${process.env.REACT_APP_MTB_PROJECT_API_KEY}
        `);
       const data = await result.json();
       console.log(data.trails)
       setBikeTrails(data.trails);
      } catch(err) {
        // error handling code
      }
    }  

    fetchBikeData()
  }, [])

  useEffect(() => {
    const fetchHikeData = async () => {
      try {
        const result = await fetch(`https://www.hikingproject.com/data/get-trails?
          lat=${lat}&
          lon=${lon}&
          maxDistance=30&
          maxResults=200&
          key=${process.env.REACT_APP_HIKING_PROJECT_API_KEY}
        `);
        const data = await result.json();
        console.log(data)
        setHikingTrails(data.trails);
      } catch(err) {
        // error handling code
      }
    }  

    fetchHikeData()
  }, [])

  const setChoice = (choice) => {
    setBikeorHike(choice)
  }

  const handleSidebarClick = (_, text) => {
    console.log(text)
  }

  const handleXHover = () => {
    const logoutText = document.querySelector('#logout-text')
    logoutText.classList.toggle('hidden')
  }

  return (
    <div className="App">
      <div className="sidebar">
        <nav className="icon-navigation">
          <FontAwesomeIcon icon={faChevronUp} 
            size="1x" 
            className="sidebar-icon" 
            onClick={(_) => handleSidebarClick(_,'sidebar up clicked')} 
            color="rgb(65, 65, 65)"
          />
          <FontAwesomeIcon icon={faBicycle} 
            size="1x" 
            className="sidebar-icon" 
            onClick={(_) => handleSidebarClick(_,'sidebar bike clicked')} 
            color="rgb(65, 65, 65)"
          />
          <FontAwesomeIcon icon={faShoePrints} 
            className="sidebar-icon" 
            size="1x" 
            onClick={(_) => handleSidebarClick(_,'sidebar hike clicked')} 
            color="rgb(65, 65, 65)"
          />
          <FontAwesomeIcon icon={faCampground} 
            className="sidebar-icon" 
            size="1x" 
            onClick={(_) => handleSidebarClick(_,'sidebar camp clicked')} 
            color={color}
          />
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
      <main className="main-section">
        <Switch>
          <Route path="/mountain-bike" component={BikeTrailsPage} />
          <Route path="/hike" component={HikeTrailsPage} />
          <Route path="/favorites" component={FavoritesPage} />
          <Route path="/" component={LandingPage} />
          {/* <LandingPage bikeOrHike={bikeOrHike} allBikeTrails={allBikeTrails} allHikeTrails={allHikingTrails} setChoice={setChoice}/> */}
        </Switch>
      </main>
      <p className="hidden" id="logout-text">Log Out</p>
    </div>
  );
}

export default App;
