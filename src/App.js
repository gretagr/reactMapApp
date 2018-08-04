import React, { Component } from 'react';
import './App.css';
import Map from './components/Map'
import NavBar from './components/NavBar'
import MenuIcon from './components/MenuIcon'


class App extends Component {
  state = {
    markers: [],
  }

  componentDidMount(){
    this.getLocations();
  }

  getLocations () {
    fetch('https://api.foursquare.com/v2/venues/search?ll=54.6821052,25.2759799&locale=en&categoryId=4bf58dd8d48988d163941735&client_id=TP4GRX0W4NPXOJDYDG10N2RZD5G4QMKCRQ1L45LSBXDNJOP1&client_secret=PKLYPTWTK4YZXEG0JNN0A3KGDSKU3E0PQCWTN1U2GIHCZLZS&v=20180804')
    .then( response => response.json())
    .then(data => data.response.venues.map(place => (
      {
        id: place.id,
        name: place.name,
        lat: place.location.lat,
        lng: place.location.lng
      }
    ))).then(markers => {
      this.setState({ markers: markers })
    })


    .catch(err => console.log(err))

}

  render() {
    console.log(this.state.markers);
    return (
      <React.Fragment>
        <NavBar
          markers={this.state.markers}
         />
        <Map
          markers={this.state.markers}
        />
      </React.Fragment>
    )
  }
}

export default App;
