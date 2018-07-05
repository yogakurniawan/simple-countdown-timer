import React, { Component } from 'react'

export default class MyComponent extends Component {
  render() {
    return (
      <div>
        <input onChange={event => {
          this.setState({ input: event.target.value })
        }} type="text" />
      </div>
    )
  }
}