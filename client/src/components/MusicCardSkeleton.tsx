import styled from 'styled-components'
import { Skeleton } from './styles/ui/Skeleton.styled'

const MusicCardSkeletonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  div {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
`

export default function MusicCardSkeleton() {
  return (
    <MusicCardSkeletonContainer>
      <Skeleton $width={300} $height={250} />
      <div>
        <Skeleton $width={250} $height={15} />
        <Skeleton $width={150} $height={10} />
      </div>
    </MusicCardSkeletonContainer>
  )
}
