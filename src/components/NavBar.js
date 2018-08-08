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
      <aside role='navigation' className={this.state.openNav ? 'sidebar active' : 'sidebar'}>
        <div className='header-bc'></div>
        <Filter tabIndex='0' onSearch={this.props.onSearch} query={this.props.query}/>
        <ol className='list-holder'>
          {this.props.markers.map(name => {
            return (
              <li tabIndex='0'  key={name.id} onClick={() => {this.props.onToggle(name.id, name.lat, name.lng)}}>
                {name.name}
              </li>
            )
          })}
        </ol>
      </aside>
    </React.Fragment>
    )
  }
}
