import React, { PureComponent } from 'react'

export default class HashLink extends PureComponent {
  scrollTo (e) {
    e.preventDefault()
    document.querySelector(`${e.target.closest('a').hash}`).scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  render () {
    const classes = ['HashLink']
    this.props.className && classes.push(this.props.className)
    return (
      <a className={classes.join(' ')} onClick={this.scrollTo} href={`#${this.props.id}`}>{this.props.children}</a>
    )
  }
}
