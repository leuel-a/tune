import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createMusicSchema, CreateMusic } from '../../schemas/musicSchema'
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  StyledForm,
  StyledInput
} from '../styles/Form.styled'
import { CreateMusicContainer, CreateMusicFormGrid } from '../styles/Profile.CreateMusic.styled'
import Button from '../Button'
import { theme } from '../../main'
import { Select, SelectOption } from '../styles/ui/Select.styled'

export default function ProfileCreateMusic() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateMusic>({
    resolver: zodResolver(createMusicSchema)
  })

  const onSubmit = (values: CreateMusic) => {
    console.log(values)
  }
  return (
    <CreateMusicContainer>
      <div>
        <h1>Add Music</h1>
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
              </Select>
            </FormControl>
            {errors.genre && <FormMessage>{errors.genre.message}</FormMessage>}
          </FormItem>
        </CreateMusicFormGrid>
        <Button bgColor={theme.colors.secondary} color={theme.button.secondary}>
          Create
        </Button>
      </StyledForm>
    </CreateMusicContainer>
  )
}
