import React, { Component } from 'react'
import Filter from './Filter'
import MenuIcon from './MenuIcon'
export default class NavBar extends Component {

  state = {
    openNav: false
  }

  // sets state in order to change icon, add 'active' class to nav and header
  toggleIcon = () => {

    if (!this.state.openNav) {
      this.setState({ openNav: true })
    } else {
      this.setState({ openNav: false })
    }
  }

// close nav when list item clicked --> this functionality is necessary for better usabillity on smaller screens
  closeNav = () => {
    if (this.state.openNav) {
      this.setState({ openNav: false })
    }
  }

  render() {

    const { onSearch, query, markers, onToggle, } = this.props
    const { openNav } = this.state

    return (
      <React.Fragment>
      {/* page title */}
      <header className={openNav ? 'main-header active' : 'main-header'}>
        <h1>museums of Vilnius old town</h1>
      </header>
      {/* hamburger menu icon component */}
      <MenuIcon
        openNav={openNav}
        handleToggle={this.toggleIcon}
      />
      {/* Sidebar navigation */}
      <aside role='navigation' className={openNav ? 'sidebar active' : 'sidebar'}>
        <div className='header-bc'></div>
        <Filter tabIndex='0' onSearch={onSearch} query={query}/>
        <div className='list-holder'>
          {markers.map(name => {
            return (
              //  Display markers list on sidebar
              <button tabIndex='0'  key={name.id} onClick={ () => { onToggle(name.id, name.lat, name.lng); this.closeNav() }}>
                {name.name}
              </button>
            )
          })}
        </div>
      </aside>
    </React.Fragment>
    )
  }
}
