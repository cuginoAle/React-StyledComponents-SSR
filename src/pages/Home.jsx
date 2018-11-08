import React, { Component } from 'react'
import Layout from '../layouts/one_col.jsx'
import s from 'styled-components'
import { fetchCircuits } from '../api'

import About from './About.jsx'
const Wrapper = s(Layout)`
  .title {
    font-size: 20px;
  }
  img {
    display: block;
    width: 100%;
  }
`

class Home extends Component {
  constructor (props) {
    super(props)

    this.state = {
      circuits: undefined
    }
    if (props && props.staticContext && props.staticContext.fetched) {
      const data = props.staticContext.fetched.find(item => {
        return item.Home
      })

      this.state = {
        circuits: (data && data.Home) || []
      }
    }

    if (props && props.clientData) {
      const data = props.clientData.find(item => {
        return item.Home
      })

      this.state = {
        circuits: (data && data.Home) || undefined
      }
    }

    if (!this.state.circuits) {
      this.state = {
        circuits: []
      }

      fetchCircuits().then(data => {
        this.setState({
          circuits: data
        })
      })
    }
  }

  render () {
    return (
      <Wrapper>
        <p className='title'>Pizza Pi</p>
        <h3>Hello world</h3>
        <img src='assets/images/1.jpg' />
        {this.state.circuits.map(data => {
          return <p key={data.circuitId}>{data.circuitName}</p>
        })}

        <About {...this.props} />
      </Wrapper>
    )
  }
}

Home.dataFetch = fetchCircuits

export default Home
