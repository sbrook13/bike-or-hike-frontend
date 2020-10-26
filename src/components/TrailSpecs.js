import React, {useState} from 'react'
import { completedURL, favoritesURL, bucketlistURL, calculateTime } from './hooks/customHooks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBicycle, 
  faShoePrints, 
  faTimes,
  faHeart, 
  faCheckSquare, 
  faChevronLeft,
  faListAlt } 
  from '@fortawesome/free-solid-svg-icons';

export default function TrailSpecs(props) {

  const [heartColor, setHeartColor] = useState("rgb(65, 65, 65")
  const [listColor, setListColor] = useState("rgb(65, 65, 65")
  const [checkColor, setCheckColor] = useState("rgb(65, 65, 65")

  const {
    trail, 
    saveToList, 
    favoriteTrails,
    completedTrails,
    bucketListTrails,
    addToCompleted, 
    addToBucketList, 
    addToFavorites, 
    setFavoriteTrails,
    setCompletedTrails,
    setBucketListTrails,
    showAllTrails, 
    removeFromList,
    type, 
    user,
    category
  } = props
 
  const iconColor = (savedList, selectedIcon) => {
    if (category === "all" ){
      if (savedList[0]) {
        if (savedList.find(savedTrail => savedTrail.trail_id === trail.id )){
          selectedIcon("rgb(231, 154, 10)")
        }
      }
    }
  }

  const handleSaveClick = (_, selectTrail_id, trail_type, url, user, addToListFunction, savedList) => {
    if (savedList[0]){
      if(!savedList.find(savedTrail => savedTrail.trail_id === selectTrail_id)){
        saveToList(_, selectTrail_id, trail_type, url, user)
        addToListFunction(selectTrail_id, trail_type)
      }
    } else {
      saveToList(_, selectTrail_id, trail_type, url, user)
      addToListFunction(selectTrail_id, trail_type)
    }
  }

  const removeThisTrail = (_, trail_id, category) => {
    let list = []
    let url =""
    let setFunction = null
    switch(category){
      case 'favorites':
        list = favoriteTrails
        url = favoritesURL
        setFunction = setFavoriteTrails
        break;
      case 'completed':
        list = completedTrails 
        url = completedURL
        setFunction = setCompletedTrails
        break;
      case 'bucket-list':
        list = bucketListTrails
        url = bucketlistURL
        setFunction = setBucketListTrails
        break;
    }
    const trailListed = list.find(savedTrail => savedTrail.trail_id === trail_id) 
    if (trailListed) {
      removeFromList(trail_id, trailListed.id, list, setFunction, url)
      showAllTrails()
    }
  }


  return (
    <div className="specs-card">
      <header className="specs-header">
        { type === 'bike' ? 
          <FontAwesomeIcon icon={faBicycle} 
          size="2x" 
          color="rgb(65, 65, 65)"
          className="specs-icon"
          /> :
          <FontAwesomeIcon icon={faShoePrints} 
          size="2x" 
          color="rgb(65, 65, 65)"
          className="specs-icon"
          />
        }
        <h2>{trail.name}</h2>
        <h3>Estimated Trail Time: {calculateTime(trail, type)}hrs</h3>
      </header>
      <section className="specs-icon-header">      
        <p onClick={showAllTrails}>
          <FontAwesomeIcon icon={faChevronLeft} 
            size="1x" 
            className="sidebar-icon icon specs-icon" 
          />
        </p>
        { user ?
          <>
            {iconColor(favoriteTrails, setHeartColor)}
            {iconColor(completedTrails, setCheckColor)}
            {iconColor(bucketListTrails, setListColor)}
            <p >        
              <FontAwesomeIcon icon={faCheckSquare} 
                size="1x" 
                className="sidebar-icon specs-icon" 
                color={checkColor}
                onClick={(_) => {
                  handleSaveClick(_, trail.id, type, completedURL, user, addToCompleted, completedTrails ); 
                }}
              />
            </p>
            <p onClick={(_) => {
              handleSaveClick(_, trail.id, type, bucketlistURL, user, addToBucketList, bucketListTrails );
            }}>        
              <FontAwesomeIcon icon={faListAlt} 
                size="1x" 
                className="sidebar-icon specs-icon" 
                color={listColor}
              />
            </p>
            <p onClick={(_) => {
              handleSaveClick(_, trail.id, type, favoritesURL, user, addToFavorites, favoriteTrails );
            }}>        
              <FontAwesomeIcon icon={faHeart} 
                size="1x" 
                className="sidebar-icon specs-icon"
                color={heartColor} 
              />
            </p>
          </> :
          null 
        }
        { user && category !== "all" ?
          <p >        
            <FontAwesomeIcon icon={faTimes} 
              size="1x" 
              className="sidebar-icon specs-icon" 
              onClick={(_) => {
                removeThisTrail(_, trail.id, category ); 
              }}
            />
          </p> :
          null
        }
      </section>
      <section className="specs">
        <p>Difficulty: {trail.difficulty}</p>
        <p>Length: {trail['length']} miles</p>
        <p>Stars: {trail.stars} / 5</p>
      </section>
      <section className="specs">
        <p>Ascent: {trail.ascent} ft</p>
        <p>Descent: {trail.descent} ft</p>
        <p>Highest Elevation: {trail.high} ft</p>
      </section>
      <section className="specs-summary">
        <p className="detail">Condition: {trail.conditionStatus}</p>
        <p className="detail">{trail.summary}</p>
        <a href={trail.url} target="_blank" rel="noopener noreferrer">
          <button className="detail btn" onClick={console.log("details button clikced")}>More Details</button>
        </a>
      </section>
    </div>
  )
}
