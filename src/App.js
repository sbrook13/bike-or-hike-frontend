import React, {useState, useEffect} from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faBicycle, faShoePrints, faCampground, faChevronUp, faTimes, faHeart, faCheckSquare, faListAlt } from '@fortawesome/free-solid-svg-icons'

import LandingPage from './components/LandingPage';
import BikeTrailsPage from './components/BikeTrailsPage';
import HikeTrailsPage from './components/HikeTrailsPage';
import BucketListPage from './components/BucketListPage';
import Completed from './components/Completed';
import CampPage from './components/CampPage';
import FavoritesPage from './components/FavoritesPage';
import SideBar from './components/SideBar';
import LoginPage from './components/LoginPage';
import Contact from './components/Contact';
import {useSelection, useFavorites} from './components/hooks/customHooks'

function App() {

  const [allBikeTrails, setBikeTrails] = useState([])
  const [allHikingTrails, setHikingTrails] = useState([])
  const [navSelection, setChoice] = useSelection(null)
  const [favorites, addToFavorites] = useFavorites([])

  let lat = "39.7392"
  let lon = "-104.9903"

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
        setHikingTrails(data.trails);
      } catch(err) {
        // error handling code
      }
    }  

    fetchHikeData()
  }, [])

  return (
    <div className="App">
      <SideBar setChoice={setChoice}/>
      <main className="main-section">
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/rides" component={BikeTrailsPage} />
          <Route path="/hikes" component={HikeTrailsPage} />
          <Route path="/camp" component={CampPage} />
          <Route path="/completed" component={Completed} />
          <Route path="/bucket-list" component={BucketListPage} />
          <Route path="/favorites" render={ () => <FavoritesPage />} />
          <Route path="/" render={ () => <LandingPage setChoice={setChoice}/> } />
          {/* <LandingPage bikeOrHike={bikeOrHike} allBikeTrails={allBikeTrails} allHikeTrails={allHikingTrails} setChoice={setChoice}/> */}
        </Switch>
      </main>
      <p className="hidden" id="logout-text">Log Out</p>
    </div>
  );
}

export default App;
