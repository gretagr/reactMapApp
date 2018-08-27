import React, { Component } from 'react'

export default class Filter extends Component {

  render() {

    return (
      <React.Fragment>
        <label htmlFor='filter'>Filter</label>
        <input
          type='text'
          id='filter'
          className='filter'
          placeholder='Filter Museums...'
          value={this.props.query}
          onChange={ (event) => { this.props.onSearch(event.target.value)} }
        />
      </React.Fragment>
    )
  }
}
