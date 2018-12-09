import React, { PureComponent } from 'react'
import styled from 'styled-components'
import HashLink from './hashLink.jsx'

const _HorizMenu = styled.div`
  position: relative;
  &:after {
    content: '';
    position: absolute;
    top: 10px;
    right: -20px;
    width: 20px;
    background-color: #000;
    bottom: 10px;
    box-shadow: -10px 0px 30px #000;
    border-left: 1px dotted var(--gold);
    display: none;
  }

  &.overflows {
    &:after {
      display: block;
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
  constructor (props) {
    super(props)
    this.scrollableRef = React.createRef()

    this.state = {
      overflows: false
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', (e) => {
        this.setState({
          overflows: this.scrollableRef.current.offsetWidth !== this.scrollableRef.current.scrollWidth
        })
      })
    }
  }

  scrollTo (e) {
    e.preventDefault()
    document.querySelector(`${e.target.hash}`).scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  componentDidMount () {
    this.setState({
      overflows: this.scrollableRef.current.offsetWidth !== this.scrollableRef.current.scrollWidth
    })
  }

  render () {
    const classes = ['horizMenu']
    this.props.className && classes.push(this.props.className)
    this.state.overflows && classes.push('overflows')

    return (
      <_HorizMenu ref className={classes.join(' ')}>
        <div className='scrollable' ref={this.scrollableRef}>
          {this.props.links.map(l => <HashLink key={l.id} id={`_${l.id}`}>{l.label}</HashLink>)}
        </div>
      </_HorizMenu>
    )
  }
}
