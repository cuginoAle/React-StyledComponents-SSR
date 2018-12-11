import React, { PureComponent } from 'react'
import styled from 'styled-components'
import Popup from './popup.jsx'

const _LanguagePicker = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 4em;
  position: relative;
  color: currentColor;
  padding: 0;

  svg {
    width: 1em;
    height: 1em;
    fill: currentColor; 
    display: block;   
  }

  .lang {
    background-color : var(--gold);
    border-radius    : 1em;
    color            : #000;
    font-family      : arial;
    font-size        : .5em;
    font-weight      : bold;
    left             : 50%;
    line-height      : 18px;
    padding          : 0em 5px 3px;
    position         : absolute;
    top              : 50%;
    transform        : translate3d(-50%,-50%,0);
  }
`
_LanguagePicker.displayName = 'LanguagePicker'

export default class LanguagePicker extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      showPicker: false
    }
  }

  showPickerPopup () {
    this.setState({
      showPicker: true
    })
  }

  hidePickerPopup (e) {
    e.stopPropagation()

    this.setState({
      showPicker: false
    })
  }

  onSelect (key, e) {
    e.stopPropagation()

    this.props.onSelect(key)
    this.setState({
      showPicker: false
    })
  }

  renderLanguageList () {
    const keys = Object.keys(this.props.langs)
    return (
      keys.map(k => {
        return (
          <button onClick={this.onSelect.bind(this, k)} key={k}>{this.props.langs[k]}</button>
        )
      })
    )
  }

  render () {
    const classes = ['LanguagePicker']
    this.props.className && classes.push(this.props.className)
    return (
      <_LanguagePicker className={classes.join(' ')} onClick={this.showPickerPopup.bind(this)}>
        <Popup show={this.state.showPicker} onBgClick={this.hidePickerPopup.bind(this)} >
          {this.renderLanguageList()}
        </Popup>
        <span className='lang'>{this.props.langKey}</span>
        <svg viewBox='-0.824 -0.825 141.732 141.732' xmlns='http://www.w3.org/2000/svg'><path d='M134.631 72.609c-.616 15.764-6.873 30.078-16.813 40.979a70.18 70.18 0 0 0-18.836-12.583c1.959-8.614 3.125-18.228 3.295-28.396h32.354zm0-5.136h-32.354c-.198-12.014-1.793-23.256-4.438-32.988a69.872 69.872 0 0 0 17.312-10.74c11.478 11.185 18.81 26.599 19.48 43.728m-23.532-47.366a64.72 64.72 0 0 1-14.824 9.168c-3.139-9.508-7.348-17.23-12.24-22.355a64.428 64.428 0 0 1 27.064 13.187M91.504 31.17a64.375 64.375 0 0 1-18.894 3.602V5.693c7.713 1.762 14.476 11.371 18.894 25.477M72.61 40.171a69.75 69.75 0 0 0 20.363-3.798c2.314 9.121 3.719 19.734 3.901 31.1H72.61V40.171zm0 32.438h24.268c-.152 9.459-1.15 18.395-2.816 26.385a69.806 69.806 0 0 0-21.449-4.186V72.609h-.003zm0 27.6a64.42 64.42 0 0 1 20.213 4.08c-4.319 16.607-11.686 28.152-20.213 30.1v-34.18zm11.422 32.953c5.642-5.907 10.373-15.27 13.604-26.832a64.735 64.735 0 0 1 16.375 11.092c-8.272 7.68-18.558 13.221-29.979 15.74m-16.559 1.227c-8.527-1.947-15.894-13.492-20.213-30.1a64.431 64.431 0 0 1 20.213-4.08v34.18zm0-39.58a69.696 69.696 0 0 0-21.449 4.188c-1.666-7.99-2.663-16.929-2.817-26.388h24.267l-.001 22.2zm0-27.336H43.206c.185-11.363 1.586-21.975 3.903-31.096a69.885 69.885 0 0 0 20.363 3.794l.001 27.302zm0-32.702a64.394 64.394 0 0 1-18.893-3.602C52.998 17.064 59.76 7.455 67.473 5.693v29.078zM56.053 6.92c-4.895 5.125-9.104 12.85-12.242 22.355a64.649 64.649 0 0 1-14.823-9.168A64.392 64.392 0 0 1 56.053 6.92M24.93 23.748A70.104 70.104 0 0 0 42.248 34.48c-2.646 9.733-4.239 20.977-4.438 32.992H5.453c.67-17.126 8-32.538 19.477-43.724M5.453 72.609H37.81c.169 10.168 1.335 19.781 3.294 28.396a70.206 70.206 0 0 0-18.838 12.583c-9.94-10.9-16.196-25.215-16.813-40.979m20.619 44.813a64.761 64.761 0 0 1 16.375-11.092c3.232 11.562 7.962 20.925 13.604 26.832-11.42-2.519-21.707-8.06-29.979-15.74m113.96-44.813h.052v-5.137h-.052C138.71 30.833 109.25 1.372 72.61.05V0h-5.138v.051C30.834 1.373 1.373 30.834.052 67.473H0v5.136h.052c.622 17.261 7.487 32.929 18.408 44.812-.03.033-.062.065-.093.101h.186c12.258 13.285 29.59 21.813 48.92 22.512v.053H72.61v-.053c19.332-.695 36.664-9.227 48.92-22.512h.187c-.03-.033-.062-.064-.093-.101 10.921-11.884 17.785-27.552 18.408-44.812' /></svg>
      </_LanguagePicker>
    )
  }
}
