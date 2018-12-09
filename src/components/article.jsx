import React, { PureComponent } from 'react'
import styled from 'styled-components'

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
  
  img {
    max-width: 100%;
    flex-shrink: 0;
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
    return (
      <_Article className='article' key={data.id}>
        <a id={`pic_${data.id}`} className='anchor' />
        {image && (<img src={`${image.file.url}?fit=fill&w=500&h=300`} alt={image.title} />)}
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
            <div className='article-price'>
              <span>€</span> {data.prezzo}
            </div>
          </div>
        </div>
      </_Article>
    )
  }
}
