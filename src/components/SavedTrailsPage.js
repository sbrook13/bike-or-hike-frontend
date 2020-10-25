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
    const bikeTrailsOnly = this.props.savedTrails.filter(trail => trail.trail_type === 'hike')
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

  displayTrailSections = () => {
    return (
      <>
        <div>
          <h2>Rides</h2> 
          {this.displayTrailCards(this.state.fullBikeTrailInfo)} 
        </div>
        <div>
          <h2>Hikes</h2> 
          {this.displayTrailCards(this.state.fullHikeTrailInfo)} 
        </div>
      </>
    )
  }

  displayTrailCards = (trailsArray) => {
    return trailsArray.map(trail => {
      return <TrailCard trail={trail} selectTrail={this.props.selectTrail} />
    })
  }

  displayTrailSpecs = () => {
    const trail = this.props.selectedTrail
    return <TrailSpecs 
      trail={trail}
      saveToList={this.props.saveToList}
      addToFavorites={this.props.addToFavorites}
      removeFromFavorites={this.props.removeFromFavorites}
      addToCompleted={this.props.addToCompleted}
      addToBucketList={this.props.addToBucketList}
      removeFromBucketList={this.props.removeFromBucketList}
      showAllTrails={this.props.showAllTrails}
      type={trail.trail_type}
      user={this.props.user}
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