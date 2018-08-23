import React, { Component } from 'react'
import { compose, withProps } from 'recompose'
import { GoogleMap, withGoogleMap, withScriptjs, Marker, InfoWindow, InfoBox } from 'react-google-maps'



const MyMap = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDDKw8KM0hI26kbRZw8v_xXlNazk_x4FAY&v=3.exp&libraries=geometry,drawing,places",
    containerElement: <div style={{ height: `100%`, width: '100%' }} />,
    mapElement: <div style={{ height: `100%` }} />,
    loadingElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    onClick={props.onMapClick}
    center = {props.center}
    zoom = {props.zoom}
    options = {{
      styles: props.mapStyles,
      mapTypeControl: false
    }}>

  {props.isMarkerShown && props.markers.map( venue => {

    return (
    <Marker animation={props.isOpen && props.openItemId === venue.id ? 1 : null}
      key={venue.id}
      icon={{
        url: "marker.png"
      }}
      position={{lat: venue.lat, lng: venue.lng}}
      onClick={() =>  {props.onToggle(venue.id, venue.lat, venue.lng)}}>
      {props.isOpen && props.openItemId === venue.id &&
      <InfoWindow className="info" onCloseClick={() => props.onToggle(venue.id, venue.lat, venue.lng)}>
        <div className="info-win-container">
          <header className='infowindow-head'>
            <h1>{venue.name}</h1>
            <img className="info-image" src={venue.image} alt={venue.name}/>
          </header>
          <p className="text">{venue.shortDesc}</p>
          <p className="detail"><span>Address:</span> {venue.address[0]}</p>
          <a className="detail" href={venue.link} target="_blank"><span>Visit: </span>{venue.link}</a>
          <p className="detail"><span>Price: </span>{venue.price}</p>
      </div>
      </InfoWindow>}
    </Marker>
      )

    }
  )
}
  </GoogleMap>
)

export default class Map extends Component {

  render() {
    return (
      <section aria-label='Vilnius map' role='application' className={this.props.openNav ? 'map-container active' : 'map-container'}>
        <MyMap
          onMapLoad={this.handleMapLoad}
          markers={this.props.markers}
          onToggle={this.props.onToggle}
          isOpen={this.props.isOpen}
          openitem={this.props.openItem}
          isMarkerShown={this.props.isMarkerShown}
          openItemId={this.props.openItemId}
          zoom={this.props.zoom}
          center={this.props.center}
          mapStyles={this.props.mapStyles}
          onMapClick={this.props.onMapClick}
        />
      </section>
    )
  }
}
