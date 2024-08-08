import { useEffect, useState } from 'react'
import { StatsCardHeading, StatsPageCard } from '../styles/StatsPage.styled'
import { getArtistsStats } from '../../api/statsApi'
import { ArtistStats } from '../../types'
import { Table, TableContainer } from '../styles/stats/ArtistsStatsCard.styled'

export default function ArtistsStatsCard() {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<ArtistStats[] | null>(null)

  useEffect(() => {
    setLoading(true)
    getArtistsStats()
      .then(data => {
        setLoading(false)
        setData(data)
      })
      .catch(error => {
        setError(error)
      })
  }, [])

  if (error) {
    console.error(error)
    return null
  }

  if (error) {
    console.log(error)
    return null
  }

  return (
    <StatsPageCard>
      <StatsCardHeading>Artists Stats</StatsCardHeading>
      {loading && <div>Loading...</div>}
      <TableContainer>
        {data && (
          <Table>
            <tr>
              <th>#</th>
              <th>Artist</th>
              <th>Album</th>
              <th>Songs</th>
            </tr>
            {data.map((value, idx) => (
              <tr>
                <td>{idx + 1}</td>
                <td>{value.artist}</td>
                <td>{value.albumCount}</td>
                <td>{value.totalSongs}</td>
              </tr>
            ))}
          </Table>
        )}
      </TableContainer>
    </StatsPageCard>
  )
}
