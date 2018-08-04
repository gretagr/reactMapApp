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

    console.log(this.state.openNav)
  }
  render() {

    return (
      <React.Fragment>
      <MenuIcon
        openNav={this.state.openNav}
        handleToggle={this.toggleIcon}
      />
      <nav className={this.state.openNav ? 'sidebar active' : 'sidebar'}>
        <Filter />
        <ol>
          {this.props.markers.map(name => {
            return <li key={name.id}>{name.name}</li>
          })}
        </ol>
      </nav>
    </React.Fragment>
    )
  }
}
