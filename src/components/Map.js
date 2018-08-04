import React, { Component } from 'react'
import { compose, withProps, withStateHandlers } from 'recompose'
import { GoogleMap, withGoogleMap, withScriptjs, Marker, InfoWindow } from 'react-google-maps'
import { FaAnchor } from 'react-icons/fa'

export default class Map extends Component {

  render() {

    const mapStyles = require('../data/mapStyle.json')
    const markers = this.props.markers.map(place => {
      const marker = {
        position: {
          lat: place.lat,
          lng: place.lng
        },
      }
      return (
      <Marker key={place.id} {...marker}>
        <InfoWindow>
          <FaAnchor/>
        </InfoWindow>
      </Marker>
    )

})

    const MyMap = compose(withStateHandlers(() => ({
      isOpen: false,
    }), {
      onToggleOpen: ({ isOpen }) => () => ({
      isOpen: !isOpen,
    })
    }),
    withScriptjs,
    withGoogleMap
    )(props =>
    <GoogleMap
      defaultCenter = { { lat: 54.6872, lng: 25.2797 } }
      defaultZoom = { 13 }
      options = {{
        styles: mapStyles,
        mapTypeControl: false
      }}>
      <Marker  onClick={props.onToggleOpen}>
        {props.isOpen && <InfoWindow onCloseClick={props.onToggleOpen}>
          <FaAnchor />
        </InfoWindow>}
      </Marker>
      {props.isMarkerShown && markers } />}
    </GoogleMap>

  )
    return (
      <section className={this.props.openNav ? 'map-container active' : 'map-container'}>
        <MyMap
          googleMapURL= "https://maps.googleapis.com/maps/api/js?key=AIzaSyBXIBdJCM-1cHLO86U1hfKVvXZ2HmQhhyo&v=3.exp&libraries=geometry,drawing,places"
          containerElement= {<div style={{ height: `100%`, width: '100%' }} />}
          mapElement= {<div style={{ height: `100%` }} />}
          loadingElement= {<div style={{ height: `100%` }} />}
          isMarkerShown
        />

      </section>
    )
  }
}
