import { Music } from '../types'

interface MusicSectionProps {
  musics: Music[] | null
}

export default function MusicsSection({ musics }: MusicSectionProps) {
  if (!musics) {
    return null
  }
  return <div>{musics.map(music => `${music.title} ${music.album}`)}</div>
}
