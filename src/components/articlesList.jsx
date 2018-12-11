import React, { PureComponent } from 'react'
import styled from 'styled-components'
import Article from './article.jsx'
import { isInViewport } from '../helpers.js'

const _ArticlesList = styled.div`
  padding: 50px;
  background-color: rgb(200,200,200);
  background-image: url('/assets/images/debut_light_@2X.png');
  background-size: 200px 200px;
  
  .catWrapper {
    position: relative;
    margin-bottom: 4em;
  }

  .categoryContent {
    display: flex;
    flex-wrap: wrap;
    margin-left: -2%;
  }

  h2 {
    font-size: 2.4em;
    color: var(--gold);
    border-bottom: 2px solid var(--gold);
    margin-bottom: 1em;
    font-weight: bold;
    line-height: 1.4;
  }

  .catAnchor {
    position: absolute;
    top: -70px;
  }

  .article{
    margin-left: 2%;
    margin-bottom: 5%;

    @media screen and (min-width: 600px) {
      width: 48%;        
    }

    @media screen and (min-width: 1023px) {
      width: 31.2%;        
    }    

    @media screen and (min-width: 1700px) {
      width: 23%;        
    }    
  }


`
_ArticlesList.displayName = 'ArticlesList'

export default class ArticlesList extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      onHiRes: {}
    }

    if (typeof window !== 'undefined') {
      this.articles = [].concat.apply([], props.data.categorie.map(c => c.articoli.filter(a => a.immagine[0])))

      window.addEventListener('load', () => {
        const onHiRes = { ...this.state.onHiRes }
        this.articles.forEach((a) => {
          onHiRes[a.id] = false
        })

        this.setState({
          onHiRes
        })
      })

      document.body.addEventListener('scroll', e => {
        const onHiRes = { ...this.state.onHiRes }
        let changed = false
        this.articles.forEach((a) => {
          if (isInViewport(document.querySelector(`#pic_${a.id}`), document.body)) {
            onHiRes[a.id] = true
            changed = true
          }
        })

        if (changed) {
          this.setState({
            onHiRes
          })
        }
      })
    }
  }
  renderCat (data) {
    return data.map(d => {
      return (
        <div key={d.id} className='catWrapper' >
          <a id={`_${d.id}`} className='catAnchor' />
          <h2>{d.categoria}</h2>
          <div className='categoryContent'>
            {d.articoli.filter(a => a.immagine[0])
              .map(a => {
                const res = this.state.onHiRes[a.id]
                return <Article hiRes={res} key={a.id} data={a} />
              })}
          </div>
        </div>
      )
    })
  }
  render () {
    const classes = ['articlesList']
    return (
      <_ArticlesList className={classes.join(' ')}>
        {this.renderCat(this.props.data.categorie)}
      </_ArticlesList>
    )
  }
}
