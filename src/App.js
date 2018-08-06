import React, { Component } from 'react';
import './App.css';
import Map from './components/Map'
import NavBar from './components/NavBar'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'


class App extends Component {
  state = {
    allMarkers: [],
    markers: [],
    isOpen: false,
    openItem: {},
    openItemId: '',
    isMarkerShown: true,
    zoom: 15,
    center: { lat: 54.6807327, lng: 25.2700201 },
    mapStyles: require('./data/mapStyle.json'),
    query: '',
    prevQuery: ''
  }

  componentDidMount(){
    this.getLocations();
  }

  getLocations () {
    fetch('https://api.foursquare.com/v2/venues/search?ll=54.6784,25.2865&radius=1000&categoryId=4bf58dd8d48988d181941735&client_id=TP4GRX0W4NPXOJDYDG10N2RZD5G4QMKCRQ1L45LSBXDNJOP1&client_secret=PKLYPTWTK4YZXEG0JNN0A3KGDSKU3E0PQCWTN1U2GIHCZLZS&v=20180804')
    .then( response => response.json())
    .then(data => data.response.venues.map(place => (
      {
        id: place.id,
        name: place.name,
        lat: place.location.lat,
        lng: place.location.lng,
        address: place.location.formattedAddress,
        image: 'https://s2.15min.lt/images/photos/2015/10/22/original/15ig20151022ozoparkas9615_result-5628b1fce91a2.jpg'
      }
    ))).then(markers => {
      this.setState({ allMarkers: markers, markers: markers })
    }).catch(err => console.log(err))

}

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

onToggle = (openItemId, lat, lng) => {
  if (!this.state.isOpen && this.state.openItemId === '') {
    this.setState ({
      openItemId: openItemId,
      isOpen: true,
      center: {lat, lng}

    })
  } else if (this.state.isOpen && this.state.openItemId !== openItemId){
      this.setState ({
        openItemId: openItemId,
        center: {lat, lng}
      })
  } else {
    this.setState ({
      openItemId: '',
      isOpen: false,
      center: {lat: 54.6807327, lng: 25.2700201}
    })
  }
}

onMapClick = () => {
  this.setState({
    openItemId: '',
    isOpen: false,
  })
}
  render() {
console.log(this.state.markers)
    return (
      <React.Fragment>
        <header>
          <h1>museums of Vilnius old city</h1>
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
