import React from 'react'
import Card from '../components/Card'
import Footer from '../components/Footer'
import Header from '../components/Header'
import MusicFilters from '../components/MusicFilters'
import { Grid } from '../components/styles/ui/Grid.styled'
import { useAppSelector, useAppDispatch } from '../hooks'
import { fetchMusicsRequest } from '../redux/musics/musicsSlice'
import { Container } from '../components/styles/ui/Container.styled'

export default function HomePage() {
  const dispatch = useAppDispatch()
  const { loading, musics } = useAppSelector(state => state.musics)

  React.useEffect(() => {
    dispatch(fetchMusicsRequest())
  }, [dispatch])

  if (loading) {
    return <div>Loading</div>
  }

  return (
    <>
      <Header />
      <Container>
        <MusicFilters />
        {/* Create some kind of custom component */}
        <Grid gap={20} columns={4}>
          {musics && musics.map(music => <Card key={music._id} music={music} />)}
        </Grid>
      </Container>
      <Footer />
    </>
  )
}
