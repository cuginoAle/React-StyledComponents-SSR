import React from 'react'
import Layout from '../layouts/one_col.jsx'
import s from 'styled-components'
const Wrapper = s(Layout)`
  .title {
    font-size: 20px;
  }
  img {
    display: block;
    width: 100%;
  }
`
const Home = () => (
  <Wrapper>
    <p className='title'>Pizza Pi</p>
    <h3>Hello world</h3>
    <img src='assets/images/1.jpg' />
  </Wrapper>
)

export default Home
