import React, { Component } from 'react'
import Layout from '../layouts/one_col.jsx'
import styled from 'styled-components'
import { fetchContent } from '../api'

const Wrapper = styled(Layout)`
  .title {
    font-size: 50px;
    img {
      display: block;
      max-width: 30vw;
      max-height: 30vh;
      filter: drop-shadow(0px 8px 6px rgba(0,0,0,1))
    }
  }

  .intro{
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
  }
  .hero {
    height: 100vh;
    background-image: url('assets/images/1.jpg');
    background-attachment: fixed;
    background-size: cover;
  }

  .articles {
    display: flex;
    justify-content: space-between;
    padding: 50px;
    background-color: rgb(200,200,200);
    width: 80%;
    margin: 50px auto;

    .article {
      width: 30%;
      max-width: 500px;
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: white;
      font-size: 20px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.4);

      img {
        max-width: 100%;
      }
      .details {
        padding: 10px;
        display: flex;
        flex-direction: column;
        width: 100%;
      }
    }

  }
`

class Home extends Component {
  constructor (props) {
    super(props)

    this.state = {
      categorie: undefined,
      articoli: undefined
    }

    if (props.staticContext && props.staticContext.fetched) {
      const data = props.staticContext.fetched.find(item => {
        return item['Home']
      })
      this.state = processData(data['Home'])
    }

    if (props.clientData) {
      const data = props.clientData.find(item => {
        return item.Home
      })
      if (data) {
        this.state = processData(data['Home'])
      } else {
        this.state = {
          categorie: undefined,
          articoli: undefined
        }
      }
    }

    if (!this.state.categorie) {
      this.state = {
        categorie: [],
        articoli: []
      }

      fetchContent('articolo').then((data) => {
        this.setState(processData(data))
      })
    }
  }

  render () {
    return (
      <Wrapper>
        <div className='intro'>
          <h1 className='title' title='Santa Pi'><img src='/assets/logo.png' alt='Logo Santa Pi' /></h1>
        </div>
        <div className='hero' />

        <div className='articles'>
          {this.state.articoli.map(data => {
            return (
              <div className='article' key={data.id}>
                <img src={`${data.immagine[0].fields.file.url}?fit=fill&w=500&h=300`} alt={data.immagine[0].fields.title} />
                <div className='details'>
                  <p className='article-name'>
                    {data.titolo}
                  </p>
                  <p className='article-description'>
                    {data.descrizione}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </Wrapper>
    )
  }
}

// this is needed for SSR
Home.dataFetch = () => { return fetchContent('articolo') }

function processData (data) {
  const articoli = []
  const categorie = []

  data && data.items.forEach(element => {
    const articolo = {
      id: element.sys.id,
      ...element.fields
    }
    articolo.immagine = articolo.immagine.map(artImg => {
      return data.includes.Asset.find(img => img.sys.id === artImg.sys.id)
    })

    const categoria = data.includes.Entry.find(cat => cat.sys.id === articolo.categoria.sys.id)

    articoli.push(articolo)
    categorie.push(categoria)
  })

  return {
    articoli,
    categorie
  }
}

export default Home
