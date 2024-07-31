import { GenreList, GenreListItem } from './styles/GenreList.styled'
import { Input } from './styles/Input.styled'
import { MusicFiltersWrapper } from './styles/MusicFilters.styled'

export default function MusicFilters() {
  return (
    <MusicFiltersWrapper>
      <Input width={400} type="text" placeholder="Search musics, artists, albums..." />
      <GenreList>
        <GenreListItem>Classical</GenreListItem>
        <GenreListItem>Jazz</GenreListItem>
        <GenreListItem>Rock</GenreListItem>
        <GenreListItem>Pop</GenreListItem>
        <GenreListItem>Hip Hop/Rap</GenreListItem>
      </GenreList>
    </MusicFiltersWrapper>
  )
}
