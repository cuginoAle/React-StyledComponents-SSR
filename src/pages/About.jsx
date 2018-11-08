import React, { Component } from 'react'
import { fetchCircuits } from '../api'

class About extends Component {
  constructor (props) {
    super(props)

    this.state = {
      circuits: undefined
    }

    if (props && props.staticContext && props.staticContext.fetched) {
      const data = props.staticContext.fetched.find(item => {
        return item.About
      })

      this.state = {
        circuits: (data && data.About) || []
      }
    }

    if (props && props.clientData) {
      const data = props.clientData.find(item => {
        return item.About
      })

      this.state = {
        circuits: (data && data.About) || undefined
      }
    }

    if (!this.state.circuits) {
      this.state = {
        circuits: []
      }
      const self = this
      fetchCircuits().then(data => {
        console.log(data)
        
        self.setState({
          circuits: data
        })
      })
    }
  }
  render () {
    return (
      <h2>This is the about page {this.state.circuits.length} </h2>
    )
  }
}

About.dataFetch = fetchCircuits

export default About
