import React, {useState, useEffect} from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import AllTrailsPage from './components/AllTrailsPage';
import CampingPage from './components/CampingPage';
import SavedTrailsPage from './components/SavedTrailsPage';
import SideBar from './components/SideBar';
import LoginPage from './loginForms/LoginPage';
import Contact from './components/Contact';
import {
  postTrailToBackend, 
  bikeBaseURL, 
  hikeBaseURL, 
  bucketlistURL, 
  authHeaders
} from './components/hooks/customHooks'

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
  const [lat, setLat] = useState("39.7392")
  const [lon, setLon] = useState("-104.9903")

  let queryParams = `lat=${lat}&lon=${lon}&maxDistance=30&sort=distance&maxResults=100`
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

  const geocodeURL = `https://maps.googleapis.com/maps/api/geocode`
  let convertedAddress = "denver%20colorado"
  if (address) {
    convertedAddress = address.split(" ").join("%20")
  }
  const geocodeApiKey = `key=${process.env.REACT_APP_GEOCODE_API_KEY}`

  useEffect(() => {
    const fetchGeocodeData = async () => {
      try {
        const response = await fetch(`${geocodeURL}/json?address=${convertedAddress}&${geocodeApiKey}`);
        const data = await response.json();
        console.log(data)
      } catch(err) {
        // error handling code
      }
    }  
    fetchGeocodeData()
  }, [])

  const loginUser = (loginUser) => {
    setUser(loginUser)
  }

  const logoutUser = (user) => {
    setUser(null)
    localStorage.clear()
    window.location.href = '/'
  }
  
  const showAllTrails = () => {
    setTrailSelection(null)
  }

  const saveToList = (_, trail_id, trail_type, url, user ) => {
    postTrailToBackend(url, trail_id, trail_type, user)
  }

  const addToFavorites = (trail_id, trail_type) => {
    const trail = { trail_id, trail_type }
    setFavoriteTrails(...favoriteTrails, trail)
  }

  const removeFromList = (trail_id, list_id, list, setFunction, url) => {
    const updatedList = list.filter(savedTrail => savedTrail.trail_id !== trail_id)
    setFunction(updatedList)
    fetch(`${url}/${list_id}`, {
      method: 'DELETE',
      headers: authHeaders
    })   
  } 

  const addToCompleted = (trail_id, trail_type, ) => {
    const trail = { trail_id, trail_type }
    const bucketList_trail = bucketListTrails.find(trail => trail.trail_id === trail_id)
    if (bucketList_trail){
      removeFromList(bucketList_trail.id, bucketListTrails, setBucketListTrails, bucketlistURL)
    }
    setCompletedTrails(...completedTrails, trail)
  }

  const addToBucketList = (trail_id, trail_type) => {
    const trail = { trail_id, trail_type }
    if (!bucketListTrails.find(buckletlistTrail => buckletlistTrail.trail_id === trail_id)) {
      setBucketListTrails(...bucketListTrails, trail)
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
            setCompletedTrails={setCompletedTrails} 
            setBucketListTrails={setBucketListTrails} 
            setFavoriteTrails={setFavoriteTrails}
            setAddress={setAddress}
            /> } 
          />
          <Route path="/rides" render={ () => <AllTrailsPage 
            user={user}
            saveToList={saveToList}
            dynamicList={dynamicBikeList}
            setDynamicList={setDynamicBikeList}
            addToFavorites={addToFavorites}
            removeFromList={removeFromList}
            addToCompleted={addToCompleted}
            addToBucketList={addToBucketList}
            favoriteTrails={favoriteTrails}
            completedTrails={completedTrails}
            bucketListTrails={bucketListTrails}
            setFavoriteTrails={setFavoriteTrails}
            setCompletedTrails={setCompletedTrails}
            setBucketListTrails={setBucketListTrails}
            selectTrail={setTrailSelection} 
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
            addToFavorites={addToFavorites}
            removeFromList={removeFromList}
            addToCompleted={addToCompleted}
            addToBucketList={addToBucketList}
            favoriteTrails={favoriteTrails}
            completedTrails={completedTrails}
            bucketListTrails={bucketListTrails}
            setFavoriteTrails={setFavoriteTrails}
            setCompletedTrails={setCompletedTrails}
            setBucketListTrails={setBucketListTrails}
            selectTrail={setTrailSelection} 
            selectedTrail={selectedTrail} 
            showAllTrails={showAllTrails}
            allTrails={allHikingTrails} 
            type={"hike"} 
            category={"all"}
            /> } 
          />
          <Route path="/camp" render={ () => <CampingPage 
            user={user}
            title={"Camping Page Coming Soon!"}
            /> } 
          />
          <Route path="/completed" render={ () => <SavedTrailsPage 
            user={user}
            saveToList={saveToList}  
            addToFavorites={addToFavorites}
            removeFromList={removeFromList}
            addToCompleted={addToCompleted}
            addToBucketList={addToBucketList}
            setFavoriteTrails={setFavoriteTrails}
            setCompletedTrails={setCompletedTrails}
            setBucketListTrails={setBucketListTrails}
            selectTrail={setTrailSelection} 
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
            removeFromList={removeFromList}
            addToCompleted={addToCompleted}
            addToBucketList={addToBucketList}
            setFavoriteTrails={setFavoriteTrails}
            setCompletedTrails={setCompletedTrails}
            setBucketListTrails={setBucketListTrails}
            selectTrail={setTrailSelection} 
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
             removeFromList={removeFromList}
             addToCompleted={addToCompleted}
             addToBucketList={addToBucketList}
             setFavoriteTrails={setFavoriteTrails}
             setCompletedTrails={setCompletedTrails}
             setBucketListTrails={setBucketListTrails}
             selectTrail={setTrailSelection} 
             selectedTrail={selectedTrail} 
             showAllTrails={showAllTrails}
            title={"The Best of the Best"}
            savedTrails={favoriteTrails} 
            category={'favorite'}
            /> }
          />
          <Route path="/contact" render={ () => <Contact /> } />
          <Route path="/" render={ () => <LandingPage user={user} setAddress={setAddress} address={address} /> } />
        </Switch>
      </main>
      <p className="hidden" id="logout-text">Log Out</p>
    </div>
  );
}

export default App;
