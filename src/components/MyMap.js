
import React from 'react'
import { compose, withProps, lifecycle } from 'recompose'
import { GoogleMap, withGoogleMap, withScriptjs, Marker, InfoWindow } from 'react-google-maps'

/* in order to avoid re-rendering map everytime markers change I followed this suggestion by
/* NickBrooks - https://github.com/tomchentw/react-google-maps/issues/220#issuecomment-319269122
/* sepparating map configure (MyMap.js) from map component itself (map.js) fixed the issue */

/* in this code block I'm following official react-google-maps documentation to configurate map,
/* markers and infowindows. https://tomchentw.github.io/react-google-maps/ */

const MyMap = compose (
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDDKw8KM0hI26kbRZw8v_xXlNazk_x4FAY&v=3.exp&libraries=geometry,drawing,places",
    containerElement: <div style={{ height: '100%', width: '100%' }} />,
    mapElement: <div style={{ height: '100%' }} />,
    loadingElement: <div style={{ height: '100%' }} />
  }),
    lifecycle({
      componentDidMount() {

      },
      // handle map errors
      componentDidCatch() {
        alert('Oops... Looks like something went wrong with map loading. Please try again later')
      }
    }),
    withScriptjs,
    withGoogleMap
) ((props) =>

  <GoogleMap
    onClick={props.onMapClick}
    center = {props.center}
    zoom = {props.zoom}
    options = {{
      styles: props.mapStyles,
      mapTypeControl: false,
      fullscreenControl: false
    }}
  >

  {props.markers && props.markers.map( venue => {
  // if there are values in markers array  --> render markers
  return (

  <Marker animation={props.isOpen && props.openItemId === venue.id ? 1 : null}
    key={venue.id}
    icon={{ url: 'marker.png' }}
    position={{ lat: venue.lat, lng: venue.lng }}
    onClick={() =>  {props.onToggle(venue.id, venue.lat, venue.lng) }}
  >

    {props.isOpen && props.openItemId === venue.id &&
      // if specific marker is clicked --> open infowindow
      <InfoWindow className='info' onCloseClick={() => props.onToggle(venue.id, venue.lat, venue.lng) }>
        {/* infowindow details */}
        <div className='info-win-container'>

          <header className='infowindow-head'>
            <h1>{venue.name}</h1>
            <img className='info-image' src={venue.image} alt={venue.name}/>
          </header>

          <p className='text'>{venue.shortDesc}</p>
          <p className='detail'><span>Address:</span> {venue.address[0]}</p>
          <a className='detail' href={venue.link} target="_blank"><span>Visit: </span>{venue.link}</a>
          <p className='detail'><span>Price: </span>{venue.price}</p>

          <img className='credit' src='powered-by-foursquare-grey.png' alt={'powered by foursquare'}/>

        </div>

      </InfoWindow>}

  </Marker>
    )}
  )}
</GoogleMap>
)
export default MyMap
