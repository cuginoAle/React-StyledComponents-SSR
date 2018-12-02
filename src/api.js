import fetch from 'isomorphic-fetch'

const URL = 'https://cdn.contentful.com'
const SPACE_ID = 'fafkg42w420e'
const ACCESS_TOKEN = 'ff8b1553e4717677a6519ddae24e9909afcc5bc6296937d4f68eade3ec48f404'

async function fetchContent (contentType) {
  const str = `${URL}/spaces/${SPACE_ID}/environments/master/entries?content_type=${contentType}&access_token=${ACCESS_TOKEN}&include=2`

  return fetch(str)
    .then(res => { return res.json() })
    .then(res => res)
    .catch((error) => {
      console.error(`\nError occurred while fetching Entries for ${contentType}:`)
      console.error(error)
    })
}

export { fetchContent }
