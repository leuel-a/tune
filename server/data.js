const axios = require('axios')
const AxiosError = require('axios').AxiosError

const musics = [
  {
    title: 'Laugh Now Cry Later',
    artist: 'Drake',
    album: 'Laugh Now Cry Later (Single)',
    genre: 'Hip Hop/Rap'
  },
  {
    title: 'Symphony No. 9',
    artist: 'Ludwig van Beethoven',
    album: 'Beethoven: Symphony No. 9',
    genre: 'Classical'
  },
  {
    title: 'Fikir Eskemeske',
    artist: 'Teddy Afro',
    album: 'Teddy Afro Collection',
    genre: 'Ethiopian'
  },
  {
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    album: 'After Hours',
    genre: 'Pop'
  },
  {
    title: 'Shivers',
    artist: 'Ed Sheeran',
    album: 'Equals',
    genre: 'Pop'
  },
  {
    title: 'Heat Waves',
    artist: 'Glass Animals',
    album: 'Dreamland',
    genre: 'Rock'
  },
  {
    title: 'Good 4 U',
    artist: 'Olivia Rodrigo',
    album: 'SOUR',
    genre: 'Pop'
  },
  {
    title: 'Family Ties',
    artist: 'Baby Keem & Kendrick Lamar',
    album: 'The Melodic Blue',
    genre: 'Hip Hop/Rap'
  },
  {
    title: 'Stay',
    artist: 'The Kid LAROI & Justin Bieber',
    album: 'Stay (Single)',
    genre: 'Pop'
  },
  {
    title: 'Under the Bridge',
    artist: 'Red Hot Chili Peppers',
    album: 'Blood Sugar Sex Magik',
    genre: 'Rock'
  },
  {
    title: 'Siqebeleshegn',
    artist: 'Betty G',
    album: 'Wegegta',
    genre: 'Ethiopian'
  },
  {
    title: 'Rapstar',
    artist: 'Polo G',
    album: 'Hall of Fame',
    genre: 'Hip Hop/Rap'
  },
  {
    title: 'Deacon Blues',
    artist: 'Steely Dan',
    album: 'Aja',
    genre: 'Rock'
  },
  {
    title: 'Adore You',
    artist: 'Harry Styles',
    album: 'Fine Line',
    genre: 'Pop'
  },
  {
    title: 'Reflections',
    artist: 'Ludovico Einaudi',
    album: 'Einaudi: Undiscovered',
    genre: 'Classical'
  }
]

async function main() {
  let accessToken = null
  let refreshToken = null

  // login
  try {
    const response = await axios.post('http://localhost:5000/api/auth/login', {
      email: 'leuel.asfaw@gmail.com',
      password: 'leuel.asfaw'
    })
    accessToken = response.data.accessToken
    refreshToken = response.data.refreshToken
  } catch (error) {
    console.log(`Error something went wrong. check creds.`)
    process.exit(1)
  }

  for (const music of musics) {
    try {
      const response = await axios.post('http://localhost:5000/api/musics', music, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'x-refresh': refreshToken
        }
      })
      console.log(response.data)
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response.data)
      }
    }
  }
}

main()
