import Header from '../components/Header'
import TotalStatsCard from '../components/stats/TotalStatsCard'
import GenreStatsCard from '../components/stats/GenreStatsCard'
import AlbumsStatsCard from '../components/stats/AlbumsStatsCard'
import ArtistsStatsCard from '../components/stats/ArtistsStatsCard'
import { Container } from '../components/styles/ui/Container.styled'
import { StatsPageGrid } from '../components/styles/StatsPage.styled'

export default function StatsPage() {
  return (
    <>
      <Header />
      <Container>
        <StatsPageGrid>
          <TotalStatsCard />
          <GenreStatsCard />
          <ArtistsStatsCard />
          <AlbumsStatsCard />
        </StatsPageGrid>
      </Container>
    </>
  )
}
