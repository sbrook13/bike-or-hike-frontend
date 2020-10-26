import React from 'react';
import TrailCard from './TrailCard';
import TrailSpecs from './TrailSpecs';
import {parseJSON, ridesByIdURL, hikesByIdURL} from './hooks/customHooks';

export default class SavedTrailsPage extends React.Component {

  state = {
    fullHikeTrailInfo: [],
    fullBikeTrailInfo: []
  }

  saveIds = (trailsArray) => {
    let idArray = []
    trailsArray.map(trail => {
      idArray = [...idArray, trail.trail_id]
    })
    const idString = idArray.join(',')
    return idString
  }

  componentDidMount(){
    const apiKey = `key=${process.env.REACT_APP_HIKING_PROJECT_API_KEY}`
    const hikeTrailsOnly = this.props.savedTrails.filter(trail => trail.trail_type === 'hike')
    const hikeIdString = this.saveIds(hikeTrailsOnly)
    const bikeTrailsOnly = this.props.savedTrails.filter(trail => trail.trail_type === 'bike')
    const bikeIdString = this.saveIds(bikeTrailsOnly)
    fetch(`${hikesByIdURL}?ids=${hikeIdString}&${apiKey}`)
      .then(parseJSON)
      .then(result => this.setState({ fullHikeTrailInfo: result.trails })) 
      .then(
        fetch(`${ridesByIdURL}?ids=${bikeIdString}&${apiKey}`)
          .then(parseJSON)
          .then(result => this.setState({ fullBikeTrailInfo: result.trails }))
      )
  }

  setTrailType = (array, typeName) => {
    console.log(array)
    array.map(trail => {
      console.log(trail.type)
      trail.type = typeName
      console.log(trail.type)
    })
  }

  displayTrailSections = () => {
    return (
      <>
        <div>
          {this.displayTrailCards(this.state.fullBikeTrailInfo, "bike")} 
        </div>
        <div>
          {this.displayTrailCards(this.state.fullHikeTrailInfo, "hike")} 
        </div>
      </>
    )
  }

  displayTrailCards = (trailsArray, type) => {
    return trailsArray.map(trail => {
      return <TrailCard 
        trail={trail} 
        type={type} 
        category={this.props.category}   
        selectTrail={this.props.selectTrail} 
      />
    })
  }

  displayTrailSpecs = () => {
    const trail = this.props.selectedTrail
    return <TrailSpecs 
      trail={trail} 
      user={this.props.user}
      saveToList={this.props.saveToList}
      addToFavorites={this.props.addToFavorites}
      removeFromList={this.props.removeFromList}
      addToCompleted={this.props.addToCompleted}
      addToBucketList={this.props.addToBucketList}
      favoriteTrails={this.props.favoriteTrails}
      completedTrails={this.props.completedTrails}
      bucketListTrails={this.props.bucketListTrails}
      setFavoriteTrails={this.props.setFavoriteTrails}
      setCompletedTrails={this.props.setCompletedTrails}
      setBucketListTrails={this.props.setBucketListTrails}
      selectTrail={this.props.selectTrail}
      selectedTrail={this.props.selectedTrail} 
      showAllTrails={this.props.showAllTrails}
      type={this.props.type} 
      category={this.props.category}
    />
  }

  render() {
    return (
      <div className="flex-row-container">
        <h1 className="title">{this.props.title}</h1>
        <div className="two-column">
          { this.props.savedTrails[0] ? null : <p>You have no trips saved here.</p> }
          { this.props.selectedTrail ? this.displayTrailSpecs() : this.displayTrailSections() }
        </div>
      </div>
    )
  }
}