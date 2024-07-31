import { LuListMusic } from 'react-icons/lu'
import { Music } from '../types'
import { CardBadge, CardContent, CardHeader, StyledCard } from './styles/Card.styled'
import { Flex } from './styles/ui/Flex.styled'

interface CardProps {
  music: Music
}

export default function Card({ music }: CardProps) {
  return (
    <StyledCard>
      <CardHeader>
        <img src="./images/default_music_image.png" alt="" />
      </CardHeader>
      <CardContent>
        <h3>{music.title}</h3>
        <p>{music.artist}</p>
        <Flex margin="20px 0 0 0" justify="space-between">
          <Flex justify="flex-start" gap={8}>
            <LuListMusic />
            <h4> {music.album}</h4>
          </Flex>
          <CardBadge>{music.genre}</CardBadge>
        </Flex>
      </CardContent>
    </StyledCard>
  )
}
