import React, { PureComponent } from 'react'
import styled from 'styled-components'

const _MobilePhone = styled.a`
  color: currentColor;
  border-radius: 99px;
  padding: .3em .5em;
  background-color: green;
  color: white;
  display: inline-flex;
  align-items: center;

  svg{
    fill: currentColor;
    display: inline-block;
    margin-right: .5em;
    width: 1.2em;
    height: 1.2em;
  }
`
_MobilePhone.displayName = 'MobilePhone'

export default class MobilePhone extends PureComponent {
  render () {
    const classes = ['MobilePhone']
    this.props.className && classes.push(this.props.className)
    return (
      <_MobilePhone className={classes.join(' ')} href={`tel:${this.props.num.replace(/\s/g, '')}`}>
        <svg viewBox='0 0 1792 1792' xmlns='http://www.w3.org/2000/svg'><path d='M976 1408q0-33-23.5-56.5T896 1328t-56.5 23.5T816 1408t23.5 56.5T896 1488t56.5-23.5T976 1408zm208-160V544q0-13-9.5-22.5T1152 512H640q-13 0-22.5 9.5T608 544v704q0 13 9.5 22.5t22.5 9.5h512q13 0 22.5-9.5t9.5-22.5zM992 400q0-16-16-16H816q-16 0-16 16t16 16h160q16 0 16-16zm288-16v1024q0 52-38 90t-90 38H640q-52 0-90-38t-38-90V384q0-52 38-90t90-38h512q52 0 90 38t38 90z' /></svg>
        <span>{this.props.num}</span>
      </_MobilePhone>
    )
  }
}
