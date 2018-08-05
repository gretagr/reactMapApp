import React, { Component } from 'react';
import './App.css';
import Map from './components/Map'
import NavBar from './components/NavBar'


class App extends Component {
  state = {
    markers: [],

  }

  componentDidMount(){
    this.getLocations();
  }

  getLocations () {
    fetch('https://api.foursquare.com/v2/venues/search?ll=54.6872,25.2797&locale=en&categoryId=4bf58dd8d48988d163941735&client_id=TP4GRX0W4NPXOJDYDG10N2RZD5G4QMKCRQ1L45LSBXDNJOP1&client_secret=PKLYPTWTK4YZXEG0JNN0A3KGDSKU3E0PQCWTN1U2GIHCZLZS&v=20180804&limit=10')
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
      this.setState({ markers: markers })
    }).catch(err => console.log(err))

}




// onToggleOpen = (openItemId, lat, lng) => {
//   this.setState ({
//     openItemId: openItemId,
//     isOpen: true,
//     zoom: 15,
//     center: { lat, lng }
//   })
// }
//   onToggleClose = (openItemId) => {
//     this.setState ({
//       openItemId: openItemId,
//       isOpen: false,
//       zoom: 13,
//       center: { lat: 54.6872, lng: 25.2797 }
//     })
// }

  render() {
    console.log(this.state.markers);
    return (
      <React.Fragment>
        <NavBar
          markers={this.state.markers}
         />
        <Map
          markers={this.state.markers}
          // onToggleOpen={this.onToggleOpen}
          // onToggleClose={this.onToggleClose}
          // isOpen={this.state.isOpen}
          // openitem={this.state.openItem}
          // isMarkerShown={this.state.isMarkerShown}
          // openItemId={this.state.openItemId}
          // zoom={this.state.zoom}
          // center={this.state.center}
        />
      </React.Fragment>
    )
  }
}

export default App;
