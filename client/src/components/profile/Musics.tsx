import { useEffect } from 'react'
import MusicCard from './MusicCard'
import { useAppSelector, useAppDispatch } from '../../hooks'
import { getUsersMusicRequest } from '../../redux/users/usersSlice'
import {
  ProfileMusicList,
  ProfileMusicsContainer,
  ProfileMusicsPaginate
} from '../styles/Profile.Musics'
import { deleteMusic } from '../../api/musicApi'
import { toast } from 'react-toastify'
import { isAxiosError } from 'axios'
import { useSearchParams } from 'react-router-dom'
import Paginate from '../Paginate'

export default function ProfileMusics() {
  const dispatch = useAppDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const { data, loading } = useAppSelector(state => state.users)

  const onDelete = async (id: string) => {
    try {
      await deleteMusic(id)
      toast.success('Successfully deleted music.')
      dispatch(getUsersMusicRequest(searchParams.toString()))
    } catch (error) {
      if (isAxiosError(error)) {
        const errorMessage = error.response?.data
        toast.error(errorMessage)
      } else {
        toast.error('Uable to delete music try again.')
      }
    }
  }

  const onNext = () => {
    const page = searchParams.get('page') || '1'
    searchParams.set('page', (parseInt(page) + 1).toString())
    setSearchParams(searchParams)

    dispatch(getUsersMusicRequest(searchParams.toString()))
  }

  const onPrevious = () => {
    const page = searchParams.get('page') || '1'
    searchParams.set('page', (parseInt(page) - 1).toString())
    setSearchParams(searchParams)

    dispatch(getUsersMusicRequest(searchParams.toString()))
  }

  useEffect(() => {
    dispatch(getUsersMusicRequest(`limit=10`))
  }, [dispatch])

  console.log(data)

  return (
    <ProfileMusicsContainer>
      <div>
        <h1>My Musics</h1>
      </div>
      <ProfileMusicList>
        {loading && <div>Loading...</div>}
        {data &&
          data.data.map(music => (
            <MusicCard onDelete={() => onDelete(music._id)} key={music._id} music={music} />
          ))}
        {data && (
          <ProfileMusicsPaginate>
            <Paginate
              page={data.page}
              limit={data.limit}
              total={data.total}
              next={onNext}
              previous={onPrevious}
            />
          </ProfileMusicsPaginate>
        )}
      </ProfileMusicList>
    </ProfileMusicsContainer>
  )
}
