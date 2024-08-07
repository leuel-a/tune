import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  StyledForm,
  StyledInput
} from '../styles/Form.styled'
import Button from '../Button'
import { theme } from '../../main'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useAppDispatch } from '../../hooks'
import { useNavigate, useParams } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { Select, SelectOption } from '../styles/ui/Select.styled'
import { updateMusicRequest } from '../../redux/musics/musicsSlice'
import { UpdateMusic, updateMusicSchema } from '../../schemas/musicSchema'
import { CreateMusicContainer, CreateMusicFormGrid } from '../styles/Profile.CreateMusic.styled'
import { getMusicById } from '../../api/musicApi'

export default function EditMusicForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState<boolean>(false)

  const onSubmit = (values: UpdateMusic) => {
    dispatch(updateMusicRequest({ _id: id as string, ...values }))
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<UpdateMusic>({
    resolver: zodResolver(updateMusicSchema)
  })

  useEffect(() => {
    setLoading(true)
    getMusicById(id as string)
      .then(data => {
        setLoading(false)
        if (data) {
          const { title, artist, album, genre } = data.data
          reset({ artist, album, genre, title })
        }
      })
      .catch(error => {
        console.log(`Error getting music: ${error}`)
        setLoading(false)
        navigate('/profile')
      })
  }, [id, reset, navigate])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <CreateMusicContainer>
      <div>
        <h1>Edit Music</h1>
        <p>Fill in the required fields</p>
      </div>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <CreateMusicFormGrid>
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <StyledInput {...register('title')} placeholder="Music title..." />
            </FormControl>
            {errors.title && <FormMessage>{errors.title.message}</FormMessage>}
          </FormItem>
          <FormItem>
            <FormLabel>Artist</FormLabel>
            <FormControl>
              <StyledInput {...register('artist')} placeholder="Music artist name..." />
            </FormControl>
            {errors.artist && <FormMessage>{errors.artist.message}</FormMessage>}
          </FormItem>
          <FormItem>
            <FormLabel>Album</FormLabel>
            <FormControl>
              <StyledInput {...register('album')} placeholder="Music album name..." />
            </FormControl>
            {errors.album && <FormMessage>{errors.album.message}</FormMessage>}
          </FormItem>
          <FormItem>
            <FormLabel>Genre</FormLabel>
            <FormControl>
              <Select {...register('genre')}>
                <SelectOption value="">Please select a genre</SelectOption>
                <SelectOption value="Classical">Classical</SelectOption>
                <SelectOption value="Jazz">Jazz</SelectOption>
                <SelectOption value="Rock">Rock</SelectOption>
                <SelectOption value="Pop">Pop</SelectOption>
                <SelectOption value="Hip Hop/Rap">Hip Hop/Rap</SelectOption>
                <SelectOption value="Ethiopian">Ethiopian</SelectOption>
              </Select>
            </FormControl>
            {errors.genre && <FormMessage>{errors.genre.message}</FormMessage>}
          </FormItem>
          {errors.root && <FormMessage>{errors.root.message}</FormMessage>}
        </CreateMusicFormGrid>
        <Button bgColor={theme.colors.secondary} color={theme.button.secondary}>
          Submit
        </Button>
      </StyledForm>
    </CreateMusicContainer>
  )
}
