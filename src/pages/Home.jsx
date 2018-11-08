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

    console.log(props);
    

    this.state = {
      circuits: []
    }

    if (props.data) {
      const data = props.data.find(item => {
        return item.Home
      })
      this.state = {
        circuits: data.Home || []
      }
    }
    console.log(this.state.circuits);
    

    if (!this.state.circuits) {
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
