import { useState, useEffect, memo } from 'react'
import { Input } from './styles/Input.styled'
import { MusicFiltersWrapper } from './styles/MusicFilters.styled'
import { GenreList, GenreListItem } from './styles/GenreList.styled'
import { useDebounce } from '../hooks'

const genres = ['Raggae', 'Jazz', 'Rock', 'Pop', 'Hip Hop/Rap', 'Rap', 'Ethiopian']

interface MusicFiltersProps {
  filterMusics: (values: string[]) => void
  searchMusics: (query: string) => void
}

function MusicFilters({ filterMusics, searchMusics }: MusicFiltersProps) {
  console.log(`Rendering MusicFilters`)
  const [search, setSearch] = useState<string>('')
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const debouncedSearch = useDebounce(search)

  const toggleGenre = (genre: string) => {
    setSelectedGenres(prev =>
      prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]
    )
  }

  useEffect(() => {
    searchMusics(debouncedSearch)
  }, [debouncedSearch, searchMusics])

  useEffect(() => {
    filterMusics(selectedGenres)
  }, [filterMusics, selectedGenres])

  return (
    <MusicFiltersWrapper>
      <Input
        value={search}
        onChange={e => setSearch(e.currentTarget.value)}
        type="text"
        placeholder="Search musics, artists, albums..."
      />
      <GenreList>
        {genres.map((value, idx) => (
          <GenreListItem
            $selected={selectedGenres.includes(value)}
            onClick={() => toggleGenre(value)}
            key={idx}
          >
            {value}
          </GenreListItem>
        ))}
      </GenreList>
    </MusicFiltersWrapper>
  )
}

export default memo(MusicFilters)
