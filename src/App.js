import React, {useState, useEffect} from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons'
import BikeTrailsPage from './components/BikeTrailsPage'
import HikeTrailsPage from './components/HikeTrailsPage'

library.add(fab,)

function App() {

  const [bikeOrHike, setBikeorHike] = useState(null)
  const [allBikeTrails, setBikeTrails] = useState([])
  const [allHikingTrails, setHikingTrails] = useState([])

  useEffect(() => {
    const fetchBikeData = async () => {
      try {
       const result = await fetch(`https://www.mtbproject.com/data/get-trails?lat=39.7392&lon=-104.9903&minStars=3.5&minLength=2&maxResults=200&maxDistance=30&key=${process.env.REACT_APP_MTB_PROJECT_API_KEY}`);
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
       const result = await fetch(`https://www.hikingproject.com/data/get-trails?lat=39.7392&lon=-104.9903&maxDistance=30&maxResults=200&key=${process.env.REACT_APP_HIKING_PROJECT_API_KEY}`);
       const data = await result.json();
       console.log(data)
       setHikingTrails(data.trails);
      } catch(err) {
        // error handling code
      }
    }  

    fetchHikeData()
  }, [])

  return (
    <div className="App">
      <FontAwesomeIcon icon="check-square" />
      <div>
        <h1>Mountain Bike Trails</h1>
        <BikeTrailsPage allTrails={allBikeTrails}/>
      </div> :
      <div>
        <h1>Mountain Bike Trails</h1>
        <HikeTrailsPage allTrails={allHikingTrails}/>
      </div>
    </div>
  );
}

export default App;
