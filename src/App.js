import React, { Component } from 'react';
import './App.css';
import MyMap from './components/MyMap'
import NavBar from './components/NavBar'
import escapeRegExp from 'escape-string-regexp'

// getting addiotional date for infoWindows
const details = require('./data/additionalData.json')

export default class App extends Component {
  state = {
    allMarkers: [],
    markers: [],
    // variables controlling infoWindows and markers state
    isOpen: false,
    openItem: {},
    openItemId: '',
    // variables controlling initial map settings
    zoom: 14,
    center: { lat: 54.6851319, lng: 25.2843913 },
    // getting map styles
    mapStyles: require('./data/mapStyle.json'),
    // search query variable
    query: '',
  }
  // getting locations and setting state with fetched data
  componentDidMount(){
    this.getLocations()
  }

/* GETTING LOCATIONS form foursquare API ====================================================================================
/* for sake of better quality of images and other info detail I desided to fetch locations only from my created list in foursquere,
/* And according to that list hardcode other data in aditionalData.json
/* ======================================================================================================================== */

  getLocations () {
    const id = 'TP4GRX0W4NPXOJDYDG10N2RZD5G4QMKCRQ1L45LSBXDNJOP1'
    const secret = 'PKLYPTWTK4YZXEG0JNN0A3KGDSKU3E0PQCWTN1U2GIHCZLZS'
    const listId = '5b69c23f270ee700399e44e1'
    const version = 'v=20180804'
    // fetch from foursquare
    fetch(`https://api.foursquare.com/v2/lists/${listId}?&client_id=${id}&client_secret=${secret}&${version}`)
    .then( response => response.json())
    .then(data => data.response.list.listItems.items.map(item => (
      {
        id: item.venue.id,
        name: this.trimName(item.venue.name),
        lat: item.venue.location.lat,
        lng: item.venue.location.lng,
        address: item.venue.location.formattedAddress
      }
    ))).then(markers => {
      // filter additional data and add to markers based on id
      details.filter(detail => {markers.map(marker => {

        if(marker.id === detail.id) {
          marker.image = detail.image
          marker.shortDesc = detail.shortDesc
          marker.link = detail.link
          marker.price = detail.price
          }
          return null
      })
      return null
    })

    this.setState({ allMarkers: markers, markers: markers })
    // handling error when unable to fetch locations
  }).catch(error => this.handleError('noData'))

}

// idea how to trim name from this thread: https://stackoverflow.com/questions/5631384/remove-everything-after-a-certain-character
trimName = (name) => {
let trigger = name.indexOf('(')
let result = name.substring(0, trigger !== -1 ? trigger : name.length)
return result
}

// filter locations by name - function
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
      zoom: 16
    })
// checks if another infoWindow isn't open before opening new one, and if it is open - resets value of open item id to current window
  } else if (this.state.isOpen && this.state.openItemId !== openItemId){
      this.setState ({
        openItemId: openItemId,
        center: {lat, lng},
        zoom: 16
      })
// close infoWindow
  } else {
    this.setState ({
      openItemId: '',
      isOpen: false,
      center: { lat: 54.6851319, lng: 25.2843913 },
      zoom: 14
    })
  }
}

// sets map behavior on on click - change center to default, if open - close infoWindow.
onMapClick = () => {
  this.setState({
    openItemId: '',
    isOpen: false,
    center: { lat: 54.6851319, lng: 25.2843913 },
  })
}

// function for error handling

handleError = (error) => {
  const container = document.getElementById('root')
  const box = document.createElement('div')
  box.classList = 'alert'

  if (error === 'noData') {
    box.innerHTML = `<h2>Oops,</h2><p>looks like there was error getting locations data. Please try again later</p><button id='alert'>CLOSE</button>`
  }
  else if (error === 'noInternet') {
    box.innerHTML = `<h2>Oops,</h2><p>looks like there was error with connection. Please try again later</p><button id='alert'>CLOSE</button>`
  }

  container.appendChild(box)
  document.getElementById('alert').addEventListener('click', function () {
    container.removeChild(box)
  })
}


  render() {
    const {
      markers,
      isOpen,
      openItem,
      isMarkerShown,
      openItemId,
      zoom,
      center,
      mapStyles,
      query,
      openNav
    } = this.state
    return (
      <React.Fragment>
        <NavBar
          markers={markers}
          onToggle={this.onToggle}
          onSearch={this.onSearch}
          query={query}
         />
        { (navigator.onLine) && (
          <section
            aria-label='Vilnius map'
            role='application'
            className='map-container'>
            {/* Map configuration component */}
            <MyMap
                handleError={this.handleError}
                onMapLoad={this.handleMapLoad}
                markers={markers}
                onToggle={this.onToggle}
                isOpen={isOpen}
                openitem={openItem}
                isMarkerShown={isMarkerShown}
                openItemId={openItemId}
                zoom={zoom}
                center={center}
                mapStyles={mapStyles}
                onMapClick={this.onMapClick}
              />
          </section>
      )}
      {
        (!navigator.onLine) && (
        this.handleError('noInternet')
      )}
    </React.Fragment>
    )
  }
}
