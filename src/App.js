import React, {useState, useEffect} from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import BikeTrailsPage from './components/BikeTrailsPage';
import HikeTrailsPage from './components/HikeTrailsPage';
import SavedTrailsPage from './components/SavedTrailsPage';
import SideBar from './components/SideBar';
import LoginPage from './loginForms/LoginPage';
import {postTrailToBackend, bikeBaseURL, hikeBaseURL, apiKey} from './components/hooks/customHooks'

function App() {

  const [allBikeTrails, setBikeTrails] = useState([])
  const [filteredBikeTrails, setFilteredBikeTrails] = useState([])
  const [isLoggedIn, setLogin] = useState(false)
  const [user, setUser] = useState(null)
  const [address, setAddress] = useState(null)
  const [selectedTrail, setTrailSelection] = useState(null)
  const [favoriteTrails, setFavoriteTrails] = useState([])
  const [completedTrails, setCompletedTrails] = useState([])
  const [bucketListTrails, setBucketListTrails] = useState([])


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
  
  let lat = user ? "37.2753" : "39.7392"
  let lon = user ? "-107.8801" : "-104.9903"
  let maxDistance = "30"

  let queryParams = `lat=${lat}&lon=${lon}&maxDistance=${maxDistance}&maxResults=200`
  const apiKey = `key=${process.env.REACT_APP_HIKING_PROJECT_API_KEY}`

  useEffect(() => {
    const fetchBikeData = async () => {
      try {
        const response = await fetch(`${bikeBaseURL}?${queryParams}&${apiKey}`);
        
        const data = await response.json();
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
        const response = await fetch(`${hikeBaseURL}?${queryParams}&${apiKey}`);
        const data = await response.json();
        setHikingTrails(data.trails)
        setFilteredHikeTrails(data.trails);
      } catch(err) {
        // error handling code
      }
    }  
    fetchHikeData()
  }, [])

  const loginUser = (loginUser) => {
    setUser(loginUser)
    setLogin(true)
  }

  const loadCompleted = (completed) => {
    setCompletedTrails(completed)
  }
  const loadFavorites = (favorites) => {
    setFavoriteTrails(favorites)
  }
  const loadBucketList = (completed) => {
    setBucketListTrails(completed)
  }

  const showAllTrails = () => {
    setTrailSelection(null)
  }

  const selectTrail = (trail) => {
    setTrailSelection(trail)
  }

  const saveToList = (_, trail_id, trail_type, url, user ) => {
    postTrailToBackend(url, trail_id, trail_type, user)
  }

  const addToFavorites = (trail_id, trail_type) => {
    const trail = { trail_id, trail_type}
    setFavoriteTrails(...favoriteTrails, trail)
  }

  const addToCompleted = (trail_id, trail_type) => {
    const trail = { trail_id, trail_type}
    setCompletedTrails(...completedTrails, trail)
  }

  const addToBucketList = (trail_id, trail_type) => {
    const trail = { trail_id, trail_type}
    setBucketListTrails(...bucketListTrails, trail)
  }

  return (
    <div className="App">
      <SideBar user={user} showAllTrails={showAllTrails} />
      <main className="main-section">
        <Switch>
          <Route path="/login" render={ (routeProps) => <LoginPage 
            loginUser={loginUser} 
            {...routeProps} 
            loadCompleted={loadCompleted} 
            loadFavorites={loadFavorites} 
            loadBucketList={loadBucketList} 
            /> } 
          />
          <Route path="/rides" render={ () => <BikeTrailsPage 
            user={user}
            saveToList={saveToList} 
            addToFavorites={addToFavorites}
            addToCompleted={addToCompleted}
            addToBucketList={addToBucketList}
            allTrails={allBikeTrails} 
            filteredTrailList={filteredBikeTrails} 
            filterTrails={filterTrails} 
            selectTrail={selectTrail} 
            selectedTrail={selectedTrail} 
            showAllTrails={showAllTrails} 
            type={"bike"}
            /> } 
          />
          <Route path="/hikes" render={ () => <HikeTrailsPage 
            user={user}
            saveToList={saveToList}  
            addToFavorites={addToFavorites}
            addToCompleted={addToCompleted}
            addToBucketList={addToBucketList}
            allTrails={allHikingTrails} 
            filteredTrailList={filteredHikeTrails} 
            filterTrails={filterTrails} 
            selectTrail={selectTrail} 
            selectedTrail={selectedTrail} 
            showAllTrails={showAllTrails}
            type={"hike"} 
            /> } 
          />
          <Route path="/camp" render={ () => <SavedTrailsPage user={user} /> } />
          <Route path="/completed" render={ () => <SavedTrailsPage 
            title={"completed"}
            user={user} 
            saveToList={saveToList}  
            addToFavorites={addToFavorites}
            addToCompleted={addToCompleted}
            addToBucketList={addToBucketList} 
            selectTrail={selectTrail} 
            selectedTrail={selectedTrail}
            showAllTrails={showAllTrails}
            savedTrails={completedTrails} 
            /> }
          />
          <Route path="/bucket-list" render={ () => <SavedTrailsPage 
            title={"bucket-list"}
            user={user} 
            saveToList={saveToList}  
            addToFavorites={addToFavorites}
            addToCompleted={addToCompleted}
            addToBucketList={addToBucketList}
            selectTrail={selectTrail} 
            selectedTrail={selectedTrail}
            showAllTrails={showAllTrails}
            savedTrails={bucketListTrails} 
            /> }
          />
          <Route path="/favorites" render={ () => <SavedTrailsPage 
            title={"favorites"}
            user={user} 
            saveToList={saveToList}  
            addToFavorites={addToFavorites}
            addToCompleted={addToCompleted}
            addToBucketList={addToBucketList}
            selectTrail={selectTrail} 
            selectedTrail={selectedTrail}
            savedTrails={favoriteTrails} 
            /> }
          />
          <Route path="/" render={ () => <LandingPage user={user} /> } />
        </Switch>
      </main>
      <p className="hidden" id="logout-text">Log Out</p>
    </div>
  );
}

export default App;
