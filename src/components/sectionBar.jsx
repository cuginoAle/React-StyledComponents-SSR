import React, { PureComponent } from 'react'
import styled from 'styled-components'

const _SectionBar = styled.div`
  border-top: 1px solid var(--gold);
  border-bottom: 1px solid var(--gold);
  background-color: var(--darkBG);
  position:sticky;
  top:0;
  color: var(--gold);
  z-index: 2;
  box-shadow: 0 2px 3px rgba(0,0,0,0.6);
`
_SectionBar.displayName = 'SectionBar'

export default class SectionBar extends PureComponent {
  render () {
    const classes = ['sectionBar']
    this.props.className && classes.push(this.props.className)
    return (
      <_SectionBar className={classes.join(' ')}>
        {this.props.children}
      </_SectionBar>
    )
  }
}
