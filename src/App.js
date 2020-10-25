import React, {useState, useEffect} from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import AllTrailsPage from './components/AllTrailsPage';
import CampingPage from './components/CampingPage';
import SavedTrailsPage from './components/SavedTrailsPage';
import SideBar from './components/SideBar';
import LoginPage from './loginForms/LoginPage';
import {postTrailToBackend, bikeBaseURL, hikeBaseURL} from './components/hooks/customHooks'

function App() {

  const [allBikeTrails, setBikeTrails] = useState([])
  const [allHikingTrails, setHikingTrails] = useState([])
  const [user, setUser] = useState(null)
  const [address, setAddress] = useState(null)
  const [selectedTrail, setTrailSelection] = useState(null)
  const [favoriteTrails, setFavoriteTrails] = useState([])
  const [completedTrails, setCompletedTrails] = useState([])
  const [bucketListTrails, setBucketListTrails] = useState([])
  const [dynamicHikeList, setDynamicHikeList] = useState("")
  const [dynamicBikeList, setDynamicBikeList] = useState("")

  
  let lat = user ? "37.2753" : "39.7392"
  let lon = user ? "-107.8801" : "-104.9903"
  let maxDistance = "30"

  let queryParams = `lat=${lat}&lon=${lon}&maxDistance=${maxDistance}&sort=distance&maxResults=100`
  const apiKey = `key=${process.env.REACT_APP_HIKING_PROJECT_API_KEY}`

  useEffect(() => {
    const fetchBikeData = async () => {
      try {
        const response = await fetch(`${bikeBaseURL}?${queryParams}&${apiKey}`);
        const data = await response.json();
        setBikeTrails(data.trails)
        setDynamicBikeList(...dynamicBikeList, data.trails)
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
        setDynamicHikeList(...dynamicHikeList, data.trails)
      } catch(err) {
        // error handling code
      }
    }  
    fetchHikeData()
  }, [])

  const loginUser = (loginUser) => {
    setUser(loginUser)
  }

  const logoutUser = (user) => {
    setUser(null)
    localStorage.clear()
    window.location.href = '/'
  }

  const storeAddress = (address) => {
    setAddress(address)
  }

  const loadCompleted = (completed) => {
    setCompletedTrails(completed)
  }
  const loadFavorites = (favorites) => {
    setFavoriteTrails(favorites)
  }
  const loadBucketList = (bucket_list) => {
    setBucketListTrails(bucket_list)
  }

  const showAllTrails = (e) => {
    e.stopPropagation()
    setTrailSelection(null)
  }

  const selectTrail = (trail) => {
    setTrailSelection(trail)
  }

  const saveToList = (_, trail_id, trail_type, url, user ) => {
    postTrailToBackend(url, trail_id, trail_type, user)
  }

  const addToFavorites = (trail_id, trail_type) => {
    const trail = { trail_id, trail_type }
    setFavoriteTrails(...favoriteTrails, trail)
  }

  const removeFromFavorites = (trail_id) => {
    const updatedFavorites = favoriteTrails.filter(favTrail => favTrail.trail_id !== trail_id)
  } 

  const addToCompleted = (trail_id, trail_type) => {
    const trail = { trail_id, trail_type }
    removeFromBucketList(trail_id)
    setCompletedTrails(...completedTrails, trail)
  }

  const addToBucketList = (trail_id, trail_type) => {
    const trail = { trail_id, trail_type }
    if (!bucketListTrails.find(trail => trail.trail_id === trail_id)) {
      setBucketListTrails(...bucketListTrails, trail)
    }
  }

  const removeFromBucketList = (trail_id) => {
    if (bucketListTrails.find(trail => trail.trail_id === trail_id) ){
      const updatedBucketList = bucketListTrails.filter(listTrail => listTrail.trail_id !== trail_id)
      setBucketListTrails(updatedBucketList)
    }
  } 

  return (
    <div className="App">
      <SideBar 
        user={user} 
        showAllTrails={showAllTrails} 
        logoutUser={logoutUser}
      />
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
          <Route path="/rides" render={ () => <AllTrailsPage 
            user={user}
            saveToList={saveToList}
            dynamicList={dynamicBikeList}
            setDynamicList={setDynamicBikeList}
            addToFavorites={addToFavorites}
            removeFromFavorites={removeFromFavorites}
            addToCompleted={addToCompleted}
            addToBucketList={addToBucketList}
            removeFromBucketList={removeFromBucketList}
            selectTrail={selectTrail} 
            selectedTrail={selectedTrail} 
            showAllTrails={showAllTrails}
            allTrails={allBikeTrails} 
            type={"bike"}
            category={"all"}
            /> } 
          />
          <Route path="/hikes" render={ () => <AllTrailsPage 
            user={user}
            saveToList={saveToList}  
            dynamicList={dynamicHikeList}
            setDynamicList={setDynamicHikeList}
            setDynamicBikeList={setDynamicBikeList}
            setDynamicHikeList={setDynamicHikeList}
            addToFavorites={addToFavorites}
            removeFromFavorites={removeFromFavorites}
            addToCompleted={addToCompleted}
            addToBucketList={addToBucketList}
            removeFromBucketList={removeFromBucketList}
            selectTrail={selectTrail} 
            selectedTrail={selectedTrail} 
            showAllTrails={showAllTrails}
            allTrails={allHikingTrails} 
            type={"hike"} 
            category={"all"}
            /> } 
          />
          <Route path="/camp" render={ () => <CampingPage 
            user={user}
            saveToList={saveToList}  
            addToFavorites={addToFavorites}
            removeFromFavorites={removeFromFavorites}
            addToCompleted={addToCompleted}
            addToBucketList={addToBucketList}
            removeFromBucketList={removeFromBucketList}
            selectTrail={selectTrail} 
            selectedTrail={selectedTrail} 
            showAllTrails={showAllTrails}
            title={"Camping Page Coming Soon!"}
            savedTrails={completedTrails} 
            /> } 
          />
          <Route path="/completed" render={ () => <SavedTrailsPage 
            user={user}
            saveToList={saveToList}  
            addToFavorites={addToFavorites}
            removeFromFavorites={removeFromFavorites}
            addToCompleted={addToCompleted}
            addToBucketList={addToBucketList}
            removeFromBucketList={removeFromBucketList}
            selectTrail={selectTrail} 
            selectedTrail={selectedTrail} 
            showAllTrails={showAllTrails}
            title={"Your Past Adventures"}
            savedTrails={completedTrails} 
            category={'completed'}
            /> }
          />
          <Route path="/bucket-list" render={ () => <SavedTrailsPage 
            user={user}
            saveToList={saveToList}  
            addToFavorites={addToFavorites}
            removeFromFavorites={removeFromFavorites}
            addToCompleted={addToCompleted}
            addToBucketList={addToBucketList}
            removeFromBucketList={removeFromBucketList}
            selectTrail={selectTrail} 
            selectedTrail={selectedTrail} 
            showAllTrails={showAllTrails}
            title={"Why Not Today?"}
            savedTrails={bucketListTrails} 
            category={'bucket-list'}
            /> }
          />
          <Route path="/favorites" render={ () => <SavedTrailsPage 
             user={user}
             saveToList={saveToList} 
             addToFavorites={addToFavorites}
             removeFromFavorites={removeFromFavorites}
             addToCompleted={addToCompleted}
             addToBucketList={addToBucketList}
             removeFromBucketList={removeFromBucketList}
             selectTrail={selectTrail} 
             selectedTrail={selectedTrail} 
             showAllTrails={showAllTrails}
            title={"The Best of the Best"}
            savedTrails={favoriteTrails} 
            category={'favorite'}
            /> }
          />
          <Route path="/" render={ () => <LandingPage user={user} storeAddress={storeAddress} address={address} /> } />
        </Switch>
      </main>
      <p className="hidden" id="logout-text">Log Out</p>
    </div>
  );
}

export default App;
