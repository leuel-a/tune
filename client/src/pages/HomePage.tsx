import React from 'react'
import Card from '../components/Card'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Paginate from '../components/Paginate'
import { useSearchParams } from 'react-router-dom'
import MusicFilters from '../components/MusicFilters'
import { useAppSelector, useAppDispatch } from '../hooks'
import { Flex } from '../components/styles/ui/Flex.styled'
import { Grid } from '../components/styles/ui/Grid.styled'
import MusicCardSkeleton from '../components/MusicCardSkeleton'
import { fetchMusicsRequest } from '../redux/musics/musicsSlice'
import { Container } from '../components/styles/ui/Container.styled'

export default function HomePage() {
  const dispatch = useAppDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const { loading, data } = useAppSelector(state => state.musics)

  const onNext = () => {
    const page = searchParams.get('page') || '1'
    const newSearchParams = new URLSearchParams(searchParams.toString())
    newSearchParams.set('page', (parseInt(page) + 1).toString())

    setSearchParams(newSearchParams.toString())
    dispatch(fetchMusicsRequest(newSearchParams.toString()))
  }

  const onPrevious = () => {
    const page = searchParams.get('page') || '1'
    const newSearchParams = new URLSearchParams(searchParams.toString())
    newSearchParams.set('page', (parseInt(page) - 1).toString())

    setSearchParams(newSearchParams.toString())
    dispatch(fetchMusicsRequest(newSearchParams.toString()))
  }

  React.useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams.toString())
    newSearchParams.set('limit', '12')

    setSearchParams(newSearchParams.toString())
    dispatch(fetchMusicsRequest(newSearchParams.toString()))
  }, [dispatch, searchParams, setSearchParams])

  return (
    <>
      <Header />
      <Container>
        <MusicFilters />
        {/* Create some kind of custom component */}
        <Grid gap={20} columns={4}>
          {loading &&
            Array.from({ length: 12 }).map((_, index) => <MusicCardSkeleton key={index} />)}
          {data && data.data.map(music => <Card key={music._id} music={music} />)}
        </Grid>
        <Flex justify="flex-end">
          {data && (
            <Paginate
              limit={data.limit}
              total={data.total}
              page={data.page}
              previous={onPrevious}
              next={onNext}
            />
          )}
        </Flex>
      </Container>
      <Footer />
    </>
  )
}
