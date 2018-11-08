import React, { Component } from 'react'
import Layout from '../layouts/one_col.jsx'
import s from 'styled-components'
import { fetchCircuits } from '../api'
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

    console.log(props.clientData)

    if (props.staticContext && props.staticContext.fetched) {
      const data = props.staticContext.fetched.find(item => {
        return item.Home
      })

      this.state = {
        circuits: data.Home || []
      }
    }

    if (props.clientData) {
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
      </Wrapper>
    )
  }
}

Home.dataFetch = fetchCircuits

export default Home
