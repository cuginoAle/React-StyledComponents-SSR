import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

const _Popup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.7);
  display: none;
  align-items: center;
  justify-content: center;
  z-index: 9;

  &.show{
    display: flex;
  }

  .popupContent {
    border:1px solid red;
    padding: 20px;
  }

`
_Popup.displayName = 'Popup'

let modalNode = null

if (typeof document !== 'undefined') {
  modalNode = document.documentElement.appendChild(document.createElement('div'))
}

export default class Popup extends PureComponent {
  render () {
    const classes = ['Popup']
    this.props.className && classes.push(this.props.className)
    this.props.show && classes.push('show')

    modalNode && document.body.classList.toggle('_popup_visible', this.props.show)

    return modalNode && this.props.show && ReactDOM.createPortal(
      <_Popup className={classes.join(' ')} onClick={this.props.onBgClick}>
        <div className='popupContent'>
          {this.props.children}
        </div>
      </_Popup>,
      modalNode
    )
  }
}
