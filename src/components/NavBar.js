import React, { Component } from 'react'
import Filter from './Filter'

export default class NavBar extends Component {
  render() {

    return (
      <nav className='sidebar'>
        <Filter />
        <ol>
          <li>Dummy Text</li>
          <li>Dummy Text</li>
          <li>Dummy Text</li>
          <li>Dummy Text</li>
          <li>Dummy Text</li>
          <li>Dummy Text</li>
          <li>Dummy Text</li>
          <li>Dummy Text</li>
          <li>Dummy Text</li>
        </ol>
      </nav>
    )
  }
}
