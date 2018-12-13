import React, { PureComponent, Fragment } from 'react'
import styled from 'styled-components'

const _MultiPrice = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  .priceList {
    font-size: 1em;
  }
  .descrList {
    font-size: 0.6em;
    opacity: 0.6;
  }
`
_MultiPrice.displayName = 'MultiPrice'

export default class MultiPrice extends PureComponent {
  renderPrice () {
    const pList = this.props.priceList.map(p => p.value).join('/')
    const dList = this.props.priceList.map(p => p.descrizione).join(' / ')

    return (
      <Fragment>
        <p className='priceList'>€ {pList}</p>
        <p className='descrList'>{dList}</p>
      </Fragment>
    )
  }
  render () {
    const classes = ['MultiPrice']
    this.props.className && classes.push(this.props.className)
    return (
      <_MultiPrice className={classes.join(' ')}>
        {this.renderPrice()}
      </_MultiPrice>
    )
  }
}
