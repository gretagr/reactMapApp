import React, { Component } from 'react';
import './App.css';
import Map from './components/Map'
import NavBar from './components/NavBar'
import MenuIcon from './components/MenuIcon'

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <header className='header'>
          <h1>SOME TITLE</h1>
        </header>
        <MenuIcon />
        <NavBar />
        <Map />
      </React.Fragment>
    )
  }
}

export default App;
