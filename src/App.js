import React, {useState, useEffect} from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import BikeTrailsPage from './components/BikeTrailsPage';
import HikeTrailsPage from './components/HikeTrailsPage';
import BucketListPage from './components/BucketListPage';
import Completed from './components/Completed';
import CampPage from './components/CampPage';
import FavoritesPage from './components/FavoritesPage';
import SideBar from './components/SideBar';
import LoginPage from './components/LoginPage/LoginPage';
// import Contact from './components/Contact';
import {parseJSON, postTrailToBackend, authHeaders} from './components/hooks/customHooks'

function App() {

  const [allBikeTrails, setBikeTrails] = useState([])
  const [filteredBikeTrails, setFilteredBikeTrails] = useState([])
  const [isLoggedIn, setLogin] = useState(false)
  const [user, setUser] = useState(null)
  const [selectedTrail, setTrailSelection] = useState(null)

  const [allHikingTrails, setHikingTrails] = useState([])
  const [filteredHikeTrails, setFilteredHikeTrails] = useState([])
  
  const filterTrails = (event) => {
    const input = event.target.value
    const searchFilterResponse = allBikeTrails.filter(trail => (
        trail.name
          .toLowerCase()
          .includes(input.toLowerCase())  
        )
      )
    setFilteredBikeTrails(searchFilterResponse)
  }

  const baseURL = 'http://localhost:3000';
  const completedURL = `${baseURL}/completed_trails`;
  const favoritesURL = `${baseURL}/favorites`;
  const bucketlistURL = `${baseURL}/bucket_lists`;


  const bikeBaseURL = `https://www.mtbproject.com/data/get-trails`
  const hikeBaseURL = `https://www.hikingproject.com/data/get-trails`
  
  let lat = user ? "37.2753" : "39.7392"
  let lon = user ? "-107.8801" : "-104.9903"
  let maxDistance = "30"

  let queryParams = `lat=${lat}&lon=${lon}&maxDistance=${maxDistance}&maxResults=200`
  const apiKey = `key=${process.env.REACT_APP_HIKING_PROJECT_API_KEY}`
 
  useEffect(() => {
    const fetchBikeData = async () => {
      try {
        const result = await fetch(`${bikeBaseURL}?${queryParams}&${apiKey}`);
        
        const data = await result.json();
        setBikeTrails(data.trails)
        setFilteredBikeTrails(data.trails);
      } catch(err) {
        // error handling code
      }
    }  
    fetchBikeData()
  }, [])

  useEffect(() => {
    const fetchHikeData = async () => {
      try {
        const result = await fetch(`${hikeBaseURL}?${queryParams}&${apiKey}`);
        const data = await result.json();
        setHikingTrails(data.trails)
        setFilteredHikeTrails(data.trails);
      } catch(err) {
        // error handling code
      }
    }  
    fetchHikeData()
  }, [])

  const loginUser = (user) => {
    setUser(user)
    setLogin(true)
  }

  const showAllTrails = () => {
    setTrailSelection(null)
  }

  const selectTrail = (trail) => {
    setTrailSelection(trail)
  }

  const addToCompleted = (_, trail_id, trail_type) => {
    postTrailToBackend(completedURL, trail_id, trail_type, user)
  }

  const addToDoList = (_, trail_id, trail_type) => {
    postTrailToBackend(bucketlistURL, trail_id, trail_type, user)
  }

  const addToFavorites = (_, trail_id, trail_type) => {
    postTrailToBackend(favoritesURL, trail_id, trail_type, user)
  }

  return (
    <div className="App">
      <SideBar user={user}/>
      <main className="main-section">
        <Switch>
          <Route path="/login" render={ (routeProps) => <LoginPage loginUser={loginUser} {...routeProps} /> } />
          <Route path="/rides" render={ () => <BikeTrailsPage 
            addToCompleted={addToCompleted} 
            addToDoList={addToDoList} 
            addToFavorites={addToFavorites} 
            allTrails={allBikeTrails} 
            filteredBikeTrails={filteredBikeTrails} 
            filterTrails={filterTrails} 
            selectTrail={selectTrail} 
            selectedTrail={selectedTrail} 
            showAllTrails={showAllTrails} 
            type={"bike"}
            /> } 
          />
          <Route path="/hikes" render={ () => <HikeTrailsPage 
            addToCompleted={addToCompleted} 
            addToDoList={addToDoList} 
            addToFavorites={addToFavorites} 
            allTrails={allHikingTrails} 
            filteredBikeTrails={filteredHikeTrails} 
            filterTrails={filterTrails} 
            selectTrail={selectTrail} 
            selectedTrail={selectedTrail} 
            showAllTrails={showAllTrails}
            type={"hike"} 
            /> } 
          />
          <Route path="/camp" render={ () => <CampPage user={user} /> } />
          <Route path="/completed" render={ () => <Completed user={user} />} />
          <Route path="/bucket-list" render={ () => <BucketListPage user={user} /> } />
          <Route path="/favorites" render={ () => <FavoritesPage user={user} /> } />
          <Route path="/" render={ () => <LandingPage user={user} /> } />
          {/* <LandingPage bikeOrHike={bikeOrHike} allBikeTrails={allBikeTrails} allHikeTrails={allHikingTrails} setChoice={setChoice}/> */}
        </Switch>
      </main>
      <p className="hidden" id="logout-text">Log Out</p>
    </div>
  );
}

export default App;
