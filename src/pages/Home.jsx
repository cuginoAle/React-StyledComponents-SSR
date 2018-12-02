import React, { Component } from 'react'
import Layout from '../layouts/one_col.jsx'
import s from 'styled-components'
import { fetchContent } from '../api'
const Wrapper = s(Layout)`
  .title {
    font-size: 20px;
  }
  img {
    display: block;
    width: 100%;
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
        console.table(data.Home)
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
        <p className='title'>Pizza Pi</p>
        <h3>Hello world</h3>
        <img src='assets/images/1.jpg' />
        {this.state.articoli.map(data => {
          return (
            <p key={data.id}>
              <img src={data.immagine[0].fields.file.url} alt={data.immagine[0].fields.title} />
              {data.titolo} = {data.descrizione}
            </p>
          )
        })}
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
