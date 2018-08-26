import React, { Component } from 'react'

export default class MenuIcon extends Component {

  render() {

    const { openNav, handleToggle } = this.props

    return (
      <label className={openNav ? 'icon active' : 'icon'} htmlFor="sidebar-toggle" >
      <button id='sidebar-toggle' aria-label='Open navigation' value='Open navigation' onClick={handleToggle}></button>
        <div className='hamburger'></div>
      </label>
    )
  }
}
