import React, { PureComponent } from 'react'
import styled from 'styled-components'

const _SimpleList = styled.div`
  padding: 50px;
  background-color: rgb(200,200,200);
  background-image: url('/assets/images/debut_light_@2X.png');
  background-size: 200px 200px;
  
  .catWrapper {
    position: relative;
    margin-bottom: 8em;
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

  .categoryContent {
    width: 100%;
  }  

  .articleLine {
    display: flex;
    padding: .5em 0;
    border-bottom: 1px dotted var(--gold);
    margin-bottom: .5em;
    font-weight: bold;
    white-space: nowrap;
    flex-wrap: wrap;

    .descrizione {
      width: 100%;
      font-weight: 200;
      white-space: normal;
      font-size: 1.4em;
      order:1;
      margin-top: .5em;
      opacity: .8;
    }

    .titolo {
      font-weight: bold;
      font-size: 1.6em;
      max-width: 75%;
      min-width: 30%;
      white-space: normal;
      margin-right: auto;
    }

    .prezzo{
      font-size: 1.4em;
    }

    @media (min-width: 1000px){
      font-size: 1.2em;
      flex-wrap: nowrap;
      .descrizione{
        order: 0;
        padding: 0 1em;
        margin-top: 0;
      }
      .titolo {
        margin-right: unset;
        max-width: 200px;
        min-width: 30%;
      }
    }

    @media (min-width: 1400px){
      font-size: 1.3em;
      .titolo {
        min-width: 20%;
      }
    }
  }
  
`
_SimpleList.displayName = 'SimpleList'

export default class SimpleList extends PureComponent {
  renderCat (data) {
    return data.map(d => {
      return (
        <div key={d.id} className='catWrapper' >
          <a id={`_${d.id}`} className='catAnchor' />
          <h2>{d.categoria}</h2>
          <div className='categoryContent'>
            {d.articoli.map(a => (
              <div className='articleLine' key={a.id}>
                <p className='titolo'>{a.titolo}</p>
                <p className='descrizione'>{a.descrizione}</p>
                <p className='prezzo'>€ {a.prezzo}</p>
              </div>
            ))
            }
          </div>
        </div>
      )
    })
  }
  render () {
    const classes = ['SimpleList']
    this.props.className && classes.push(this.props.className)
    return (
      <_SimpleList className={classes.join(' ')}>
        {this.renderCat(this.props.data.categorie)}
      </_SimpleList>
    )
  }
}
