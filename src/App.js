import React, { Component } from 'react';
import './App.css';
import Map from './components/Map'
import NavBar from './components/NavBar'
import escapeRegExp from 'escape-string-regexp'
const details = require('./data/additionalData.json')


class App extends Component {
  state = {
    allMarkers: [],
    markers: [],
    // controlling infowindows and markers state
    isOpen: false,
    openItem: {},
    openItemId: '',
    isMarkerShown: true,
    // initial map settings
    zoom: 15,
    center: { lat: 54.683189, lng: 25.273754 },
    mapStyles: require('./data/mapStyle.json'), //custom map styles
    // search
    query: '',
  }

  componentDidMount(){
    this.getLocations()
  }

/* GETTING LOCATIONS form foursquare API ====================================================================================
/* for sake of better quality images and other info detail I desided to use only locations from my created list in foursquere,
/* And according to that list hard code additional info in aditionalData.json
/* ======================================================================================================================== */

  getLocations () {
    const id = 'TP4GRX0W4NPXOJDYDG10N2RZD5G4QMKCRQ1L45LSBXDNJOP1'
    const secret = 'PKLYPTWTK4YZXEG0JNN0A3KGDSKU3E0PQCWTN1U2GIHCZLZS'
    const listId = '5b69c23f270ee700399e44e1'
    const version = 'v=20180804'
    fetch(`https://api.foursquare.com/v2/lists/${listId}?&client_id=${id}&client_secret=${secret}&${version}`)
    .then( response => response.json())
    .then(data => data.response.list.listItems.items.map(item => (
      {
        id: item.venue.id,
        //name: item.venue.name,
        name: this.trimName(item.venue.name),
        lat: item.venue.location.lat,
        lng: item.venue.location.lng,
        address: item.venue.location.formattedAddress
      }
    ))).then(markers => {
      details.filter(detail => {markers.map(marker => {
        if(marker.id === detail.id) {
        marker.image = detail.image
        marker.shortDesc = detail.shortDesc
        marker.link = detail.link
        marker.price = detail.price
        }
      })
    })
    console.log(markers)
    this.setState({ allMarkers: markers, markers: markers })
    }).catch(error => console.log(error))

}

// name trimming solution:  https://stackoverflow.com/questions/5631384/remove-everything-after-a-certain-character
trimName = (name) => {
let trigger = name.indexOf('(')
let result = name.substring(0, trigger !== -1 ? trigger : name.length)
return result
}

// filter function
onSearch = (query) => {
let markers
const match = new RegExp(escapeRegExp(query), 'i')
  if (query) {
    markers = this.state.allMarkers.filter(marker => match.test(marker.name))
  }
  else {
    markers = this.state.allMarkers
  }
  this.setState({ markers, query})
}

// open-close infoWindows, set marker animation

onToggle = (openItemId, lat, lng) => {
  if (!this.state.isOpen) { //checks if no other windows are open
    this.setState ({
      openItemId: openItemId,
      isOpen: true,
      center: {lat, lng},
      zoom: 18
    })
//checks if another window aren't open before opening new one, and if is open - resets value of open item id to current window
  } else if (this.state.isOpen && this.state.openItemId !== openItemId){
      this.setState ({
        openItemId: openItemId,
        center: {lat, lng},
        zoom: 15
      })
// close window
  } else {
    this.setState ({
      openItemId: '',
      isOpen: false,
      center: {lat: 54.683189, lng: 25.273754},
      zoom: 15
    })
  }
}

// sets map behavior on on click
onMapClick = () => {
  this.setState({
    openItemId: '',
    isOpen: false,
    center: {lat: 54.683189, lng: 25.273754},
    zoom: 15
  })
}

  render() {
    console.log('markers', this.state.markers)
    console.log('details', details)
    return (

      <React.Fragment>
        <header className='main-header'>
          <h1>museums of Vilnius old town</h1>
        </header>
        <NavBar
          markers={this.state.markers}
          onToggle={this.onToggle}
          onSearch={this.onSearch}
          query={this.state.query}
         />
        <Map
          markers={this.state.markers}
          onToggle={this.onToggle}
          isOpen={this.state.isOpen}
          openitem={this.state.openItem}
          isMarkerShown={this.state.isMarkerShown}
          openItemId={this.state.openItemId}
          zoom={this.state.zoom}
          center={this.state.center}
          mapStyles={this.state.mapStyles}
          onMapClick={this.onMapClick}
        />
      </React.Fragment>
    )
  }
}

export default App;
