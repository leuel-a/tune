import { useNavigate } from 'react-router-dom'
import { theme } from '../../main'
import { Music } from '../../types'
import Button from '../Button'
import {
  MusicCardActions,
  MusicCardArtist,
  MusicCardListItem,
  MusicCardTitle
} from '../styles/profile/MusicCard.styled'

interface MusicCardProps {
  onDelete: () => void
  music: Music
}

export default function MusicCard({ music, onDelete }: MusicCardProps) {
  const navigate = useNavigate()
  const onEditClick = (id: string) => navigate(`/profile/musics/${id}`)

  return (
    <MusicCardListItem>
      <div>
        <MusicCardTitle>{music.title}</MusicCardTitle>
        <MusicCardArtist>{music.artist}</MusicCardArtist>
      </div>
      <MusicCardActions>
        <Button onClick={() => onEditClick(music._id)} bgColor={theme.colors.secondary}>
          Edit
        </Button>
        <Button onClick={onDelete} bgColor="red">
          Delete
        </Button>
      </MusicCardActions>
    </MusicCardListItem>
  )
}
