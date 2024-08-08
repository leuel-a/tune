import { useNavigate } from 'react-router-dom'
import { Music } from '../../types'
import {
  MusicCardActions,
  MusicCardArtist,
  MusicCardListItem,
  MusicCardTitle
} from '../styles/profile/MusicCard.styled'
import { FaRegEdit } from 'react-icons/fa'
import { MdOutlineDelete } from 'react-icons/md'

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
        <FaRegEdit onClick={() => onEditClick(music._id)} size={18} />
        <MdOutlineDelete size={24} onClick={onDelete} />
      </MusicCardActions>
    </MusicCardListItem>
  )
}
