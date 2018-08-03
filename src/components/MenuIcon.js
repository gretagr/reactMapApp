import React, { Component } from 'react'

export default class NavBar extends Component {
  toggleIcon = () => {

  }

  render() {

    return (
      <label className="icon" htmlFor="sidebartoggle" >
      <input type="checkbox" id="sidebartoggle" name="" value="" onClick={this.toggleIcon}/>
        <div className="hamburger"></div>
      </label>
    )
  }
}
