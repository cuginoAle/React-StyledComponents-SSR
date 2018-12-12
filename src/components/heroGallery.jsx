import React, { PureComponent } from 'react'
import styled from 'styled-components'

const _HeroGallery = styled.div`
  position: relative;

  div {
    background-size: cover;  
    background-position: 50%;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    height: 100%;
    transition: opacity 1s;
    opacity: 0;
  }
  @media (-moz-touch-enabled: 0), (pointer:fine) {
    div {
      background-attachment: fixed;
    }
  }
  &.imageA {
    div.imageA{
      opacity:1
    }
  }

  &.imageB {
    div.imageB{
      opacity:1
    }
  }
`

const ResBgImg = styled.div`
  background-image: url("${props => props.url}?w=1200&h=800");

  @media (min-width: 400px){
    background-image: -webkit-image-set(
      url("${props => props.url}?w=800&h=400") 1x,
      url("${props => props.url}?w=1200&h=800") 2x
    );
    background-image: image-set(
      url("${props => props.url}?w=800&h=400") 1x,
      url("${props => props.url}?w=1200&h=800") 2x
    );
  }

  @media (min-width: 800px){
    background-image: -webkit-image-set(
      url("${props => props.url}?w=1200&h=800") 1x,
      url("${props => props.url}?w=1600&h=1200") 2x
    );
    background-image: image-set(
      url("${props => props.url}?w=1200&h=800") 1x,
      url("${props => props.url}?w=1600&h=1200") 2x
    );
  }

  @media (min-width: 1500px){
    background-image: -webkit-image-set(
      url("${props => props.url}?w=1500&h=1200") 1x,
      url("${props => props.url}?w=3000&h=2400") 2x
    );
    background-image: image-set(
      url("${props => props.url}?w=1500&h=1200") 1x,
      url("${props => props.url}?w=3000&h=2400") 2x
    );
  }  

`
_HeroGallery.displayName = 'HeroGallery'

export default class HeroGallery extends PureComponent {
  constructor (props) {
    super(props)

    this.index = 0

    this.keys = ['imageA', 'imageB']

    this.state = {
      imageA: props.images[this.index].file.url,
      imageB: props.images[this.index].file.url,
      focusOn: 'imageA'
    }

    if (typeof document !== 'undefined') {
      this.img = document.createElement('img')
      this.img.onload = this.showNext.bind(this)
    }

    this.checkImageLoad()
  }

  checkImageLoad () {
    if (typeof document !== 'undefined') {
      this.img.src = this.props.images[this.index].file.url
    }
  }

  getNextIndex (index = this.index) {
    return index < this.props.images.length - 1 ? index + 1 : 0
  }

  showNext () {
    setTimeout(() => {
      this.index = this.getNextIndex()
      this.setState({
        [this.keys[this.index % 2]]: this.props.images[this.index].file.url,
        focusOn: this.keys[this.index % 2]
      })
      this.checkImageLoad()
    }, 4000)
  }

  render () {
    const classes = ['HeroGallery', this.keys[this.index % 2]]
    this.props.className && classes.push(this.props.className)

    return (
      <_HeroGallery className={classes.join(' ')}>
        <ResBgImg className='imageA' url={this.state.imageA} />
        <ResBgImg className='imageB' url={this.state.imageB} />
      </_HeroGallery>
    )
  }
}
