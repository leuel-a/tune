import { useEffect, useState } from 'react'
import { getTotalStats } from '../../api/statsApi'
import { StatsCardHeading, StatsPageCard } from '../styles/StatsPage.styled'
import { TotalStats } from '../../types'
import { TotalStatsContainer } from '../styles/stats/TotalStatsCard.styled'

export default function TotalStatsCard() {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<TotalStats | null>(null)

  useEffect(() => {
    setLoading(true)
    getTotalStats()
      .then(data => {
        setLoading(false)
        setData(data)
      })
      .catch(error => {
        setLoading(false)
        setError(error)
      })
  }, [])

  if (error) {
    console.log(error)
  }

  return (
    <StatsPageCard>
      <StatsCardHeading>Total Stats</StatsCardHeading>
      {loading && <div>Loading...</div>}
      {data && (
        <TotalStatsContainer>
          <h4>Songs</h4>
          <p>{data.totalSongs}</p>
          <h4>Albums</h4>
          <p>{data.totalAlbums}</p>
          <h4>Artists</h4>
          <p>{data.totalArtists}</p>
          <h4>Genres</h4>
          <p>{data.totalGenres}</p>
        </TotalStatsContainer>
      )}
    </StatsPageCard>
  )
}
