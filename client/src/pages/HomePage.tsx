import { useCallback, useEffect } from 'react'
import Card from '../components/Card'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Paginate from '../components/Paginate'
import { useSearchParams } from 'react-router-dom'
import MusicFilters from '../components/MusicFilters'
import { useAppSelector, useAppDispatch } from '../hooks'
import { Flex } from '../components/styles/ui/Flex.styled'
import { Grid } from '../components/styles/ui/Grid.styled'
import { fetchMusicsRequest } from '../redux/musics/musicsSlice'
import { Container } from '../components/styles/ui/Container.styled'
import LoadingGridSkeleton from '../components/LoadingGridSkeleton'

export default function HomePage() {
  const dispatch = useAppDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const { loading, data } = useAppSelector(state => state.musics)

  const filterMusics = useCallback(
    (values: string[]) => {
      const newSearchParams = new URLSearchParams(searchParams.toString())
      newSearchParams.delete('genres')
      newSearchParams.append('genres', values.join(','))

      setSearchParams(newSearchParams.toString())
      // dispatch(fetchMusicsRequest(newSearchParams.toString()))
    },
    [searchParams, setSearchParams]
  )

  const searchMusics = useCallback(
    (query: string) => {
      const newSearchParams = new URLSearchParams(searchParams.toString())
      newSearchParams.delete('search')
      newSearchParams.append('search', query)

      setSearchParams(newSearchParams.toString())
      dispatch(fetchMusicsRequest(newSearchParams.toString()))
    },
    [searchParams, setSearchParams, dispatch]
  )

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

  // this useEffect will make a call to the api on the first render, and
  // all subsequent renders because of the searchParams, and setSearchParams
  useEffect(() => {
    dispatch(fetchMusicsRequest(`limit=8`))
  }, [dispatch])

  return (
    <>
      <Header />
      <Container>
        <MusicFilters filterMusics={filterMusics} searchMusics={searchMusics} />
        <Grid gap={20} columns={4}>
          {loading && <LoadingGridSkeleton />}
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
