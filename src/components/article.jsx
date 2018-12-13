import React, { PureComponent } from 'react'
import styled from 'styled-components'
import MultiPrice from './multiPrice.jsx'

const _Article = styled.div`
  align-items     : center;
  background-color: white;
  box-shadow      : 0 2px 4px rgba(0,0,0,0.4);
  display         : flex;
  flex-direction  : column;
  position: relative;

  .anchor {
    position: absolute;
    top: -70px;
  }
  
  .productImg {
    max-width: 100%;
    flex-shrink: 0;
    width: 100%;
  }
  .details {
    padding        : 1.4em;
    display        : flex;
    flex-direction : column;
    justify-content: space-between;
    width          : 100%;
    flex-grow      : 1;
  }  
  
  .article-name {
    font-size    : 2.3em;
    color        : var(--gold);
    margin-bottom: 1em;
    font-weight  : bold;
  }

  .article-description {
    font-size    : 1.4em;
    font-style   : italic;
    opacity      : .6;
    margin-bottom: 1em;
    flex-grow    : 1;
  }

  .article-footer {
    display: flex;
    align-items: center;
  }

  .cat-diet {
    display: flex;
    align-items: center;
    img {
      width: 32px;
    }
  }

  .article-price {
    margin-left: auto;
    color: var(--gold);
    font-size: 2em;
    span {
      font-size: .8em;
      font-weight: bold;
    }
  }
`
_Article.displayName = 'Article'

export default class Article extends PureComponent {
  render () {
    const data = this.props.data
    const image = data.immagine[0]
    const imgSize = this.props.hiRes ? 'w=500&h=300' : 'w=10&h=6'

    return (
      <_Article className='article' key={data.id}>
        <a id={`pic_${data.id}`} className='anchor' />
        {image && this.props.hiRes !== undefined && (<img className='productImg' src={`${image.file.url}?fit=fill&${imgSize}`} alt={image.title} />)}
        <div className='details'>
          <p className='article-name'>
            {data.titolo}
          </p>
          <p className='article-description'>
            {data.descrizione}
          </p>
          <div className='article-footer'>
            <div className='cat-diet'>
              {data.categoriaDietetica.map(cat => <img key={cat.id} src={cat.file.url} alt={cat.title} title={cat.title} />)}
            </div>
            <MultiPrice priceList={data.multiPrezzo} className='article-price' />
          </div>
        </div>
      </_Article>
    )
  }
}
