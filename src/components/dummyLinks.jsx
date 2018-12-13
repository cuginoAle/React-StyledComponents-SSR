import React, { PureComponent } from 'react'
import styled from 'styled-components'

const _DummyLinks = styled.div`
  position: fixed;
  overflow: hidden;
  width   : 0px;
  height  : 0px;
`
_DummyLinks.displayName = 'DummyLinks'

export default class DummyLinks extends PureComponent {
  render () {
    const classes = ['DummyLinks']
    this.props.className && classes.push(this.props.className)
    return (
      <_DummyLinks className={classes.join(' ')}>
        {this.props.links.map((l, i) => <a key={i} tabIndex='-1' href={l} />)}
      </_DummyLinks>
    )
  }
}
