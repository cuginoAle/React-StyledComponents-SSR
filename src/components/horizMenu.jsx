import React, { PureComponent } from 'react'
import styled from 'styled-components'

const _HorizMenu = styled.div`
  position: relative;
  &:after {
    content: '';
    position: absolute;
    top: 0px;
    right: -20px;
    width: 20px;
    background-color: #000;
    height: 100%;
    box-shadow: -10px 0px 30px #000;
  }

  }
  .scrollable {
    display: flex;
    align-items: center;
    overflow: auto;
  }
  a {
    margin-right:1em;
    color: inherit;
    padding: .5em;
    white-space: nowrap;
    flex-shrink:0;
  }
`

_HorizMenu.displayName = 'HorizMenu'

export default class HorizMenu extends PureComponent {
  render () {
    const classes = ['horizMenu']
    this.props.className && classes.push(this.props.className)

    return (
      <_HorizMenu className={classes.join(' ')}>
        <div className='scrollable'>
          {this.props.links.map(l => <a key={l.id} href={`#${l.id}`}>{l.label}</a>)}
        </div>
      </_HorizMenu>
    )
  }
}
