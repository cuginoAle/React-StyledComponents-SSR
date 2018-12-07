import React, { PureComponent } from 'react'
import styled from 'styled-components'

const _SimpleList = styled.div`
  padding: 50px;
  background-color: rgb(200,200,200);
  background-image: url('/assets/images/debut_light_@2X.png');
  background-size: 200px 200px;
  
  .catWrapper {
    position: relative;
    margin-bottom: 4em;
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

  .categoryContent {
    width: 100%;
  }  

  .articleLine td {
    padding: .3em 0;
    border-bottom: 1px dotted var(--gold);
    margin-bottom: .3em;
    font-weight: bold;
    font-size: 1.4em;
    white-space: nowrap;

    &.descrizione {
      width: 100%;
      padding: .3em 1em;
      font-weight: 200;
      white-space: normal;
    }

    &.titolo {
      font-weight: bold;
      font-size: 1.6em;
      min-width: 30%;
      white-space: normal;
    }

    @media (min-width: 1000px){
      &.titolo{
        white-space: nowrap;
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
          <table className='categoryContent'>
            <tbody>
              {d.articoli.map(a => (
                <tr className='articleLine' key={a.id}>
                  <td className='titolo'>{a.titolo}</td>
                  <td className='descrizione'>{a.descrizione}</td>
                  <td className='prezzo'>€ {a.prezzo}</td>
                </tr>
              ))
              }
            </tbody>
          </table>
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
