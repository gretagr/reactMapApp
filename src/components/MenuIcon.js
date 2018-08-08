import React, { Component } from 'react'

export default class MenuIcon extends Component {

  render() {

    return (
      <label className={this.props.openNav ? 'icon active' : 'icon'} htmlFor="sidebartoggle" >
      <button id="sidebartoggle" aria-label="Open sidebar navigation" value="Open sidebar navigation" onClick={this.props.handleToggle}></button>
        <div className="hamburger"></div>
      </label>
    )
  }
}
