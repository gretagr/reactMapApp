import React, { Component } from 'react'

export default class Filter extends Component {

  render() {

    return (
      <input type='text' className='filter' placeholder='Filter places...' value={this.props.query} onChange={ (event) => { this.props.onSearch(event.target.value)} } />
    )
  }
}
