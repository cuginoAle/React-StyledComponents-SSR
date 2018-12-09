import React, { PureComponent } from 'react'
import styled from 'styled-components'
import HashLink from './hashLink.jsx'

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
    color: inherit;
    display: flex;
    padding: .5em 0;
    border-bottom: 1px dotted var(--gold);
    margin-bottom: .5em;
    font-weight: bold;
    white-space: nowrap;
    flex-wrap: wrap;

    &.noImage {
      cursor: default;
    }

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
      display: flex;
      align-items: center;
    }

    svg {
      margin-right: 0.5em;
      width:1.2em;
      height:1.2em;
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
            {d.articoli.map(a => {
              const lineClassName = ['articleLine']
              a.immagine[0] === undefined && lineClassName.push('noImage')
              return (
                <HashLink className={lineClassName.join(' ')} key={a.id} id={`pic_${a.id}`}>
                  <p className='titolo'>
                    {a.immagine[0] && (<svg viewBox='0 0 500 500' xmlns='http://www.w3.org/2000/svg'><path clipRule='evenodd' d='M277.258 276.758c0-12.54 10.176-22.715 22.712-22.715s22.715 10.175 22.715 22.715c0 12.537-10.179 22.712-22.715 22.712s-22.712-10.175-22.712-22.712zm22.712-59.057c-32.615 0-59.056 26.441-59.056 59.057s26.44 59.052 59.056 59.052 59.057-26.436 59.057-59.052-26.442-59.057-59.057-59.057zM31.949 381.241c0 20.079 16.264 36.34 36.34 36.34H431.71c20.078 0 36.34-16.261 36.34-36.34V172.274c0-20.079-16.262-36.342-36.34-36.342h-34.07l-46.521-46.52c-5.356-5.358-12.36-7.993-19.348-7.993H268.26c-6.993 0-14.081 2.635-19.352 7.993l-46.342 46.52H168.23V115.49c0-8.811-7.08-15.9-15.901-15.9H93.274a15.856 15.856 0 0 0-15.899 15.9v20.442H68.29c-20.077 0-36.34 16.264-36.34 36.342v208.967zm118.112-163.54H95.548c-9.992 0-18.173-8.177-18.173-18.17 0-9.996 8.181-18.173 18.173-18.173h54.512c9.99 0 18.17 8.177 18.17 18.173.001 9.993-8.18 18.17-18.169 18.17zm149.909-36.343c52.693 0 95.396 42.705 95.396 95.4 0 52.69-42.703 95.397-95.396 95.397-52.694 0-95.396-42.707-95.396-95.397 0-52.695 42.702-95.4 95.396-95.4z' fill='#010101' fillRule='evenodd' /></svg>)}
                    {a.titolo}
                  </p>
                  <p className='descrizione'>{a.descrizione}</p>
                  <p className='prezzo'>€ {a.prezzo}</p>
                </HashLink>
              )
            })
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
