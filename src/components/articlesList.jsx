import React, { PureComponent } from 'react'
import styled from 'styled-components'
import Article from './article.jsx'

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
    color: #000;
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
  renderCat (data) {
    return data.map(d => {
      return (
        <div key={d.id} className='catWrapper' >
          <a name={d.id} className='catAnchor' />
          <h2>{d.categoria}</h2>
          <div className='categoryContent'>
            {d.articoli.map(a => (<Article key={a.id} data={a} />))}
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
