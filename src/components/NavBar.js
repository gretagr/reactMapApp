import React, { Component } from 'react'
import Filter from './Filter'
import MenuIcon from './MenuIcon'
export default class NavBar extends Component {

  state = {
    openNav: false
  }

  toggleIcon = () => {

    if (!this.state.openNav) {
      this.setState({ openNav: true })
    } else {
      this.setState({ openNav: false })
    }
  }
  render() {

    return (
      <React.Fragment>
      <MenuIcon
        openNav={this.state.openNav}
        handleToggle={this.toggleIcon}
      />
      <nav className={this.state.openNav ? 'sidebar active' : 'sidebar'}>
        <Filter onSearch={this.props.onSearch} query={this.props.query}/>
        <ol>
          {this.props.markers.map(name => {
            return (
              <li key={name.id} onClick={() => {this.props.onToggle(name.id, name.lat, name.lng)}}>
                {name.name}
              </li>
            )
          })}
        </ol>
      </nav>
    </React.Fragment>
    )
  }
}
