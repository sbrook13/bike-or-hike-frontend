import React from 'react'
import TrailCard from './TrailCard'
import TrailSpecs from './TrailSpecs'

export default class AllTrailsPage extends React.Component {

  filterTrails = (event) => {
    const input = event.target.value
    const filteredTrails = this.props.allTrails.filter(trail => (
        trail.name
          .toLowerCase()
          .includes(input.toLowerCase())  
        )
      )
      this.props.setDynamicList(filteredTrails)
  }

  trailPageWithSearch = () => {
    return (
      <>
        <form>
          <label>Search Trails By Name:</label>
          <input type="text" 
          onChange={this.filterTrails}
          />
        </form>
        <div className="trails-section">
          {this.displayTrailCards()}
        </div>
      </>
    )
  }

  displayTrailCards = () => {
    if (this.props.dynamicList[0]){
      return this.props.dynamicList.map(trail => {
        return <TrailCard 
          trail={trail} 
          type={this.props.type} 
          category={this.props.category}   
          selectTrail={this.props.selectTrail}
        />
      })
    } else {
      this.props.setDynamicList(this.props.allTrails)
      return <p>No trails match, try again!</p>
    }
  }

  displayTrailSpecs = () => {
    const trail = this.props.selectedTrail
    return <TrailSpecs 
      trail={trail} 
      user={this.props.user}
      saveToList={this.props.saveToList}
      dynamicList={this.props.dynamicBikeList}
      setDynamicList={this.props.setDynamicBikeList}
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
        {this.props.selectedTrail ? this.displayTrailSpecs() : this.trailPageWithSearch()}
      </div>
    )
  }
}
