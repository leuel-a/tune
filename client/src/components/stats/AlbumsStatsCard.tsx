import { useEffect, useState } from 'react'
import { getAlbumsStats } from '../../api/statsApi'
import { StatsCardHeading, StatsPageCard } from '../styles/StatsPage.styled'
import { AlbumsStats } from '../../types'
import { Table, TableContainer } from '../styles/stats/AlbumStatsCard.styled'

export default function AlbumsStatsCard() {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<AlbumsStats[] | null>(null)

  useEffect(() => {
    setLoading(true)
    getAlbumsStats()
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

  return (
    <StatsPageCard>
      <StatsCardHeading>Albums Stats</StatsCardHeading>
      {loading && <div>Loading...</div>}
      <TableContainer>
        {data && (
          <Table>
            <tr>
              <th>#</th>
              <th>Album</th>
              <th>Artist</th>
              <th>Song Count</th>
            </tr>
            {data.map((stat, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{stat.album}</td>
                  <td>{stat.artist}</td>
                  <td>{stat.count}</td>
                </tr>
              )
            })}
          </Table>
        )}
      </TableContainer>
    </StatsPageCard>
  )
}
