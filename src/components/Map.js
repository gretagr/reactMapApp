import React, { Component } from 'react'
import { GoogleMap, withGoogleMap } from 'react-google-maps'

export default class Map extends Component {
  render() {
    const GoogleMapExample = withGoogleMap(props => (
    <GoogleMap
      defaultCenter = { { lat: 54.6821052, lng: 25.2759799 } }
      defaultZoom = { 13 }
      >
    </GoogleMap>
    ));
    return (
      <section className='map-container'>
        <GoogleMapExample
          containerElement={ <div style={{ height: `100%`, width: '100%' }} /> }
          mapElement={ <div style={{ height: `100%` }} /> }
        />
      </section>
    )
  }
}
