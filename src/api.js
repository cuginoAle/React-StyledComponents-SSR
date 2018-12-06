import fetch from 'isomorphic-fetch'

const URL = 'https://cdn.contentful.com'
const SPACE_ID = 'fafkg42w420e'
const ACCESS_TOKEN = 'ff8b1553e4717677a6519ddae24e9909afcc5bc6296937d4f68eade3ec48f404'

// async function fetchHomeContent () {
//   const gallery = await fetchContent('homeGalery')
//   const art = await fetchContent('articolo', 'order=fields.posizione')
//   const cat = await fetchContent('categorie', 'order=fields.posizione')
//   const catDiet = await fetchContent('categoriaDietetica')

//   // console.log(catDiet);

//   return {
//     gallery,
//     articoli: art,
//     categorie: cat,
//     catDiet
//   }
// }

async function fetchHomeContent () {
  const menu = await fetchContent('menu', ['include=3'])
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

      const articoli = cat.fields.articolo.map(a => {
        // looking for the article
        const art = includes.find(e => e.sys.id === a.sys.id)

        // looking for the catDiet.
        art.fields.categoriaDietetica = art.fields.categoriaDietetica || []
        art.fields.categoriaDietetica = art.fields.categoriaDietetica.map(a => includes.find(e => e.sys.id === a.sys.id))
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
        art.fields.immagine = art.fields.immagine.map(i => {
          return assets.find(a => {
            return a.sys.id === i.sys.id
          })
        }).map(a => {
          return {
            id: a.sys.id,
            ...a.fields
          }
        })

        return art
      }).map(a => {
        return {
          id: a.sys.id,
          ...a.fields
        }
      })

      return {
        id: c.sys.id,
        categoria: cat.fields.titolo,
        articoli
      }
    })

  const gallery = await fetchContent('homeGalery')

  return {
    categorie,
    gallery: gallery.items.map(g => {
      const img = gallery.includes.Asset.find(i => i.sys.id === g.fields.hero.sys.id)
      return {
        id: img.sys.id,
        ...img.fields
      }
    })
  }
}

async function fetchContent (contentType, options = []) {
  const str = `${URL}/spaces/${SPACE_ID}/environments/master/entries?content_type=${contentType}&access_token=${ACCESS_TOKEN}&${options.join('&')}`

  return fetch(str)
    .then(res => { return res.json() })
    .then(res => res)
    .catch((error) => {
      console.error(`\nError occurred while fetching Entries for ${contentType}:`)
      console.error(error)
    })
}

export { fetchHomeContent, fetchContent }
