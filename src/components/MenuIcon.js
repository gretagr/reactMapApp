import React, { Component } from 'react'

export default class MenuIcon extends Component {

  render() {

    return (
      <label className={this.props.openNav ? 'icon active' : 'icon'} htmlFor="sidebartoggle" >
      <input type="checkbox" id="sidebartoggle" name="" value="" onChange={this.props.handleToggle}/>
        <div className="hamburger"></div>
      </label>
    )
  }
}
