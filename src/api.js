import fetch from 'isomorphic-fetch'

const URL = 'https://cdn.contentful.com'
const SPACE_ID = 'fafkg42w420e'
const ACCESS_TOKEN = 'ff8b1553e4717677a6519ddae24e9909afcc5bc6296937d4f68eade3ec48f404'

async function fetchHomeContent (lang) {
  const menu = await fetchContent('menu', ['include=3', `locale=${lang}`])

  const includes = menu.includes.Entry
  const assets = menu.includes.Asset

  const categorie = menu
    .items[0]
    .fields
    .categorie
    .map(c => {
      const cat = includes.find(e => {
        return e.sys.id === c.sys.id
      })
      let articoli = []

      if (cat.fields.articolo) {
        articoli = cat.fields.articolo.map(a => {
          // looking for the article
          const art = includes.find(e => e.sys.id === a.sys.id)

          // looking for the catDiet.
          art.fields.categoriaDietetica = (art.fields.categoriaDietetica || []).map(a => includes.find(e => e.sys.id === a.sys.id))
            .map(e => {
              return assets.find(cd => {
                return cd.sys.id === e.fields.icona.sys.id
              })
            }).map(a => {
              return {
                id: a.sys.id,
                ...a.fields
              }
            })

          // looking for the images
          art.fields.immagine = (art.fields.immagine || []).map(i => {
            return assets.find(a => {
              return a.sys.id === i.sys.id
            })
          }).map(a => {
            return {
              id: a.sys.id,
              ...a.fields
            }
          })

          // looking for the prices
          art.fields.multiPrezzo = (art.fields.multiPrezzo || []).map(p => {
            return includes.find(a => {
              return a.sys.id === p.sys.id
            })
          })
            .map(a => {
              return {
                value: a.fields.prezzo,
                descrizione: a.fields.descrizione
              }
            })

          return art
        }).map(a => {
          return {
            id: a.sys.id,
            ...a.fields
          }
        })
      }

      return {
        id: c.sys.id,
        categoria: cat.fields.titolo,
        articoli
      }
    })

  const gallery = await fetchContent('homeGalery')

  return {
    categorie,
    gallery: gallery.items[0].fields.image.map(g => {
      const hero = gallery.includes.Entry.find(i => i.sys.id === g.sys.id)
      const img = gallery.includes.Asset.find(i => i.sys.id === hero.fields.image.sys.id)
      return {
        id: img.sys.id,
        ...img.fields
      }
    })
  }
}

async function fetchContent (contentType, options = []) {
  const str = `${URL}/spaces/${SPACE_ID}/environments/master/entries?content_type=${contentType}&access_token=${ACCESS_TOKEN}&${options.join('&')}`
  // console.log(str);

  return fetch(str)
    .then(res => { return res.json() })
    .then(res => res)
    .catch((error) => {
      console.error(`\nError occurred while fetching Entries for ${contentType}:`)
      console.error(error)
    })
}

export { fetchHomeContent, fetchContent }
