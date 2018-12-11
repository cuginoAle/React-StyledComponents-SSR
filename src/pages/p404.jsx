import React, { PureComponent } from 'react'
import styled from 'styled-components'

const _P404 = styled.div`
  position: fixed;
  top:0;
  left:0;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3em;
  color: white;

  p {
    padding: 20px 30px;
    border: 1px dashed rgba(255,255,255,0.5);
  }
`
_P404.displayName = 'P404'

export default class P404 extends PureComponent {
  render () {
    const classes = ['P404']
    this.props.className && classes.push(this.props.className)
    return (
      <_P404 className={classes.join(' ')}>
        <p>Page not found!</p>
      </_P404>
    )
  }
}
