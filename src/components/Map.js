import React, { Component } from 'react'
import { compose, withProps, withStateHandlers } from 'recompose'
import { GoogleMap, withGoogleMap, withScriptjs, Marker, InfoWindow } from 'react-google-maps'
import { FaAnchor } from 'react-icons/fa'

export default class Map extends Component {
  state = {
    isOpen: false,
    openItem: {},
    openItemId: -1,
    isMarkerShown: true,
    zoom: 13,
    center: { lat: 54.6872, lng: 25.2797 }
  }

  onToggleOpen = (openItemId, lat, lng) => {
    this.setState ({
      openItemId: openItemId,
      isOpen: true,
      zoom: 15,
      center: { lat, lng }
    })
  }
    onToggleClose = (openItemId) => {
      this.setState ({
        openItemId: openItemId,
        isOpen: false,
        zoom: 13,
        center: { lat: 54.6872, lng: 25.2797 }
      })
  }


  render() {

    const mapStyles = require('../data/mapStyle.json')

    const MyMap = compose(
      withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBXIBdJCM-1cHLO86U1hfKVvXZ2HmQhhyo&v=3.exp&libraries=geometry,drawing,places",
        containerElement: <div style={{ height: `100%`, width: '100%' }} />,
        mapElement: <div style={{ height: `100%` }} />,
        loadingElement: <div style={{ height: `100%` }} />,
      }),
      withScriptjs,
      withGoogleMap
    )((props) =>
      <GoogleMap
        center = {this.state.center}
        defaultZoom = {this.state.zoom}
        options = {{
          styles: mapStyles,
          mapTypeControl: false
        }}>

      {this.state.isMarkerShown && this.props.markers.map( venue => {
        return (
        <Marker defaultAnimation={2}
          key={venue.id}
          position={{lat: venue.lat, lng: venue.lng}}
          onClick={() =>  {this.onToggleOpen(venue.id, venue.lat, venue.lng)}}>
          {this.state.isOpen && this.state.openItemId === venue.id &&
          <InfoWindow className="info" onCloseClick={() => this.onToggleClose(venue.id, venue.lat, venue.lng)}>
            <div>
              <h1>{venue.name}</h1>
              <img className="venue-image" src={venue.image}/>
              <p>{venue.address}</p>
          </div>
          </InfoWindow>}
        </Marker>
      )
      }
    )
  }
      </GoogleMap>
    )


    return (
      <section className={this.props.openNav ? 'map-container active' : 'map-container'}>
        <MyMap isMarkerShown/>
      </section>
    )
  }
}
