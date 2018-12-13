import React, { Component } from 'react'
import Layout from '../layouts/one_col.jsx'
import styled from 'styled-components'
import { fetchHomeContent } from '../api'
import SectionBar from '../components/sectionBar.jsx'
import HorizMenu from '../components/horizMenu.jsx'
import ArticlesList from '../components/articlesList.jsx'
import MobilePhone from '../components/mobilePhone.jsx'
import HeroGallery from '../components/heroGallery.jsx'
import SimpleList from '../components/simpleList.jsx'
import LanguagePicker from '../components/languagePicker.jsx'
import DummyLinks from '../components/dummyLinks.jsx'

const Wrapper = styled(Layout)`
  .MobilePhone {
    font-size: 2em;
    &.numFooter {
      align-self: center;
      margin: 40px;
    }
  }


  .intro{    
    height: 100vh;
    display: flex;
    flex-direction: column;
    position: relative;
    .title {
      display: flex;
      align-items: center;
      justify-content: center;    
      font-size: 50px;
      flex-grow:1;
      img {
        display: block;
        max-width: 30vw;
        max-height: 30vh;
        filter: drop-shadow(0px 8px 6px rgba(0,0,0,1))
      }
    }

    .MobilePhone {
      opacity: .8;
      display: none;

      &.numTop{
        position: absolute;
        right: 10px;
        top: 12px;
      }

      &.numBottom{
        align-self: center;
        display: flex;
        position: relative;
        bottom: 100px;
      }
    }

    .sectionBar {
      flex-shrink:0;
      display: flex;
      align-items: center;
      justify-content: center;
      border-top: none;
      position: sticky;
      padding: 0px 15px;
      
      .socialLinks {
        display: flex;
        align-items: center;
        justify-content: center;        
        a {
          border-radius: 50%;
          width:40px;
          height: 40px;
          border: 1px solid var(--gold);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 10px 5px;
        }
        svg {
          width: 20px;
          fill: var(--gold);
        }
      }

    }
    
    .LanguagePicker {
      margin: 10px auto 10px 5px;
    }

          
    @media screen and (min-width: 600px){
      .MobilePhone{
        &.numTop{ 
          display: flex;
          position: static;
        }
        &.numBottom{
          display: none;
        }
      }

      .LanguagePicker {
        margin-right: 152px;
      }

      .socialLinks {
        margin: auto;
      }

    }
  }
  .hero {
    border-top: 1px solid var(--gold);
    height: 60vh;

    @media screen and (orientation: portrait){
      height: 40vh;
    }
  }

  .menuBar,
  .contactsBar {
    padding: 10px 10%;
    font-size: 2em;
  }

  .menuBar {
    padding: 0px 10%;
    a {
      padding: 1em .5em;
      &:last-child {
        padding-right: 2em;
      }      
    }
  }

  .articlesList,
  .SimpleList{
    @media screen and (min-width: 800px){
      width: 80%;
      margin: 0 auto;      
    }
  }

  .SimpleList {
    margin-bottom: 20px;
  }

  .articles{
    margin-bottom: 100px;
  }

  .contactsBar {
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }

  .gmap {
    width: 100%;
    border: none;
    height: 50vh;
  }
`

class Home extends Component {
  constructor (props) {
    super(props)

    this.showLanguage = true

    this.langs = {
      'es': 'Español',
      'en': 'English',
      'de': 'Deutsche',
      'it': 'Italiano'
    }

    this.state = {
      categorie: undefined,
      gallery: undefined
    }

    if (props.staticContext && props.staticContext.fetched) {
      const data = props.staticContext.fetched.find(item => {
        return item['Home']
      })
      this.state = data['Home']
      this.state.langKey = props.staticContext.fetched.lang
    }

    if (props.clientData) {
      const data = props.clientData.find(item => {
        return item.Home
      })
      if (data) {
        this.state = data['Home']
      } else {
        this.state = {
          categorie: undefined,
          gallery: undefined
        }
      }
    }

    this.state.langKey = this.props.match.params.lang || this.state.langKey

    if (!this.state.categorie) {
      this.state = {
        categorie: [],
        gallery: []
      }

      fetchHomeContent(this.state.langKey).then((data) => {
        this.setState(data)
      })
    }
  }

  render () {
    return (
      <Wrapper>
        <DummyLinks links={Object.keys(this.langs).map(l => `/${l}`)} />
        <div className='intro'>
          <SectionBar className='socialBar'>
            {this.showLanguage && <LanguagePicker langs={this.langs} langKey={this.state.langKey} />}
            <div className='socialLinks'>
              <a target='_blank' href='https://www.facebook.com/SantapiSineu/'>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><path d='M37.1 64V34.8h10l1.5-11.4H37.1v-7.3c0-3.3.9-5.5 5.8-5.5h6.2V.4C47.9.3 44.3 0 40 0c-8.9 0-15 5.3-15 15v8.4H15v11.4h10V64h12.1z' /></svg>
              </a>
              <a target='_blank' href='https://www.instagram.com/pizzeriasantapi/'>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><circle cx='48.8' cy='15.2' r='3.8' /><path d='M32 16.1c-8.8 0-15.9 7.1-15.9 15.9S23.2 47.9 32 47.9 47.9 40.8 47.9 32 40.8 16.1 32 16.1zm0 26.8c-6 0-10.9-4.9-10.9-10.9S26 21.1 32 21.1 42.9 26 42.9 32 38 42.9 32 42.9z' /><path d='M63.8 19.7c-.1-3.1-.6-5.6-1.5-8-.9-2.4-2.2-4.3-4-6.1-1.8-1.8-3.7-3-6.1-4-2.4-.9-4.8-1.4-8-1.5C41.1 0 40 0 32 0s-9.1 0-12.3.2c-3.1.1-5.6.6-8 1.5-2.4.9-4.3 2.2-6.1 4-1.8 1.8-3 3.7-4 6.1-.9 2.4-1.4 4.8-1.5 8C0 22.9 0 24 0 32s0 9.1.2 12.3c.1 3.1.6 5.6 1.5 8 .9 2.4 2.2 4.3 4 6.1 1.8 1.8 3.7 3 6.1 4 2.4.9 4.8 1.4 8 1.5 3.1.1 4.2.1 12.2.1s9.1 0 12.3-.2c3.1-.1 5.6-.6 8-1.5 2.4-.9 4.3-2.2 6.1-4 1.8-1.8 3-3.7 4-6.1.9-2.4 1.4-4.8 1.5-8 .1-3.1.1-4.2.1-12.2s0-9.1-.2-12.3zm-5 24.3c-.1 2.6-.5 4.5-1.2 6.4-.7 1.7-1.5 3.1-2.8 4.4s-2.6 2.2-4.4 2.8c-1.8.7-3.8 1.1-6.4 1.2-3 .2-4.1.2-12 .2s-9 0-12-.2c-2.6-.1-4.5-.5-6.4-1.2-1.7-.7-3.1-1.5-4.4-2.8S7 52.2 6.4 50.4c-.7-1.8-1.1-3.8-1.2-6.4C5 40.9 5 39.9 5 32s0-8.9.2-12c.1-2.6.5-4.5 1.2-6.4.7-1.7 1.5-3.1 2.8-4.4s2.6-2.2 4.4-2.8c1.8-.7 3.8-1.1 6.4-1.2C23 5 24.1 5 32 5s9 0 12 .2c2.6.1 4.5.5 6.4 1.2 1.7.7 3.1 1.5 4.4 2.8s2.2 2.6 2.8 4.4c.7 1.8 1.1 3.8 1.2 6.4.2 3 .2 4.1.2 12s0 9-.2 12z' /></svg>
              </a>
              <a target='_blank' href='https://www.tripadvisor.it/Restaurant_Review-g616240-d10280854-Reviews-Pizzeria_Santapi-Sineu_Majorca_Balearic_Islands.html'>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 1000'><path d='M451.65 211.67c-124.41 5.97-215.57 34.47-258.47 81.05-4.9 5.21-8.89 10.11-8.89 10.88 0 .92-33.4 1.69-84.27 1.84l-84.26.46 8.43 11.34c9.8 12.86 22.67 38.45 30.49 60.21l5.36 14.71-8.58 12.87c-10.11 15.01-23.13 41.52-28.8 58.53-24.21 72.62-13.33 151.67 29.56 216.18 13.94 21.14 46.12 53.32 66.95 67.11 100.05 66.03 227.98 53.62 313.17-30.64 7.97-7.81 14.55-14.1 14.71-13.79.31.15 12.56 17.31 27.43 38.15 14.86 20.99 27.58 38 28.19 38 .61 0 11.65-17.93 24.51-39.83l23.59-39.84 16.39 16.55c92.54 92.69 236.41 98.67 336.76 13.79 37.84-32.02 66.04-77.22 78.6-126.09 6.13-24.21 8.27-45.66 7.2-72.47-1.99-47.65-15.63-88.4-43.05-129.01l-11.94-17.48 4.9-13.18c7.05-18.54 20.07-43.51 28.96-55.16l7.51-9.95-83.04-.77-83.04-.77-12.87-13.18c-36.77-37.54-101.73-62.66-190.75-74-42.14-5.36-108.63-7.65-154.75-5.51zm100.51 29.26c53.78 4.14 100.51 15.48 138.81 33.55 16.55 7.81 37.08 20.68 46.88 29.26l5.98 5.21-23.59.15c-42.44.31-77.07 10.57-112.3 33.55-48.42 31.25-80.59 79.67-104.34 156.89-.46 1.23-3.68-6.59-7.36-17.62-17.16-50.87-37.84-85.49-69.4-115.68-39.68-37.84-87.94-57.15-143.25-57.3H262.6l4.14-4.29c6.74-7.05 27.58-20.22 46.42-29.42 39.22-18.84 93.77-31.87 145.4-34.93 21.13-1.2 74.91-.9 93.6.63zM292.92 345.89c60.52 10.87 113.69 50.4 141.88 105.71 24.21 47.19 28.19 106.48 10.57 155.67-23.44 65.57-79.21 114.3-148 129.31-17.01 3.68-50.87 4.44-69.87 1.53-81.82-12.41-147.24-74.92-165.16-157.2-3.98-18.23-3.98-59.75-.15-78.14 8.58-40.3 26.51-73.24 55.31-101.89 47.03-46.72 110.46-66.49 175.42-54.99zm485.08 0c36.62 5.98 73.24 24.67 101.58 51.79 28.04 26.66 46.42 58.07 56.23 96.06 5.52 20.99 7.05 58.83 3.22 80.44-7.2 41.52-26.2 78.29-56.08 107.86-27.88 27.88-61.13 45.96-99.59 54.39-15.78 3.37-50.1 4.75-66.03 2.45-31.1-4.44-62.97-16.7-88.4-34.17-16.39-11.18-39.07-34.47-50.56-51.48-23.44-35.24-34.01-70.02-34.01-112.31 0-52.09 18.84-98.67 55.31-136.82 46.41-48.72 110.15-69.4 178.33-58.21z' /><path d='M228.88 426.02c-55 13.94-93.61 66.34-89.94 121.96 1.07 17.47 4.14 28.96 11.49 44.43 13.64 28.65 36.92 49.95 65.88 60.52 61.44 22.37 127.93-7.82 152.29-68.95 5.21-13.33 7.2-25.13 7.2-43.67 0-51.17-32.17-95.15-81.97-112-16.53-5.66-47.48-6.74-64.95-2.29zm48.87 35.69c17.31 3.68 37.38 17.92 48.26 34.32 16.24 24.36 18.08 56.54 5.06 82.58-8.89 17.62-26.5 33.25-45.5 40.29-13.48 4.9-34.01 6.28-47.19 2.76-22.37-5.67-43.36-22.06-53.78-41.67-23.6-45.04-.61-101.27 47.8-117.05 13.79-4.44 28.65-4.9 45.35-1.23z' /><path d='M245.43 503.24c-18.23 6.89-27.73 19.92-27.73 38.61-.15 11.49 4.29 21.45 12.87 29.26 8.27 7.51 15.47 10.27 26.66 10.27 24.05.15 42.13-19.46 39.99-43.36-1.23-14.25-9.19-26.05-21.76-32.48-7.51-3.99-22.53-5.06-30.03-2.3zM719.47 424.64c-21.45 4.29-44.12 16.55-59.75 32.48-11.95 12.1-16.24 17.77-22.67 30.34-19.46 38.46-16.85 84.42 7.05 120.12 40.6 60.83 126.4 70.63 179.87 20.53 38.61-36 48.57-93 24.51-140.65-11.8-23.44-33.86-44.28-58.22-55-18.7-8.28-50.57-11.81-70.79-7.82zm45.5 37.84c27.43 7.51 50.25 30.49 57.46 57.91 1.23 5.06 2.3 14.55 2.3 21.45 0 23.59-7.05 40.29-24.36 57.46-17.01 16.85-34.93 24.51-57.61 24.51s-40.6-7.66-57.61-24.51c-17.31-17.16-24.36-33.86-24.36-57.46 0-28.19 12.87-53.01 35.24-68.03 21.45-14.24 44.58-18.07 68.94-11.33z' /><path d='M728.97 503.69c-13.33 4.75-24.21 18.54-26.2 33.4-1.53 10.42 2.91 22.83 11.18 31.71 28.8 30.95 79.06 1.69 67.26-39.07-6.28-21.44-30.79-33.7-52.24-26.04z' /></svg>
              </a>
            </div>
            <MobilePhone className='numTop' num='+34 64 666 4313' />
          </SectionBar>
          <h1 className='title' title='Santa Pi'><img src='/assets/logo.png' alt='Logo Santa Pi' /></h1>
          <MobilePhone className='numBottom' num='+34 64 666 4313' />
        </div>

        <HeroGallery className='hero' images={this.state.gallery} />

        <SectionBar className='menuBar'>
          <HorizMenu links={this.state.categorie.map(c => { return { ...c, label: c.categoria } })} />
        </SectionBar>

        <div className='articles'>
          <SimpleList data={this.state} />
          <ArticlesList data={this.state} />
        </div>

        <SectionBar className='contactsBar'>
          <p>Come visit us!</p>
        </SectionBar>

        <iframe className='gmap' src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3072.308169053147!2d3.0079210152457185!3d39.64277857946253!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1297c98f75bbf6f1%3A0x673dfd54604023ab!2zU2FudGFww60!5e0!3m2!1sen!2suk!4v1544037998967' allowFullScreen />

        <MobilePhone className='numFooter' num='+34 64 666 4313' />
      </Wrapper>
    )
  }
}

// this is needed for SSR
Home.dataFetch = fetchHomeContent

export default Home
