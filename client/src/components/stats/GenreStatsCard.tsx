import { GenreStats } from '../../types'
import { useState, useEffect } from 'react'
import { getGenreStats } from '../../api/statsApi'
import { StatsCardHeading, StatsPageCard } from '../styles/StatsPage.styled'
import { StyledLoadingSpinner } from '../styles/LoadingSpinner.styled'

import { PieChart, Pie, PieProps, Sector, ResponsiveContainer } from 'recharts'
import { ActiveShape } from 'recharts/types/util/types'
import { PieSectorDataItem } from 'recharts/types/polar/Pie'
import { theme } from '../../main'

interface DataItem {
  _id: string
  count: number
}
interface RenderActiveShapeProps {
  cx: number
  cy: number
  midAngle: number
  innerRadius: number
  outerRadius: number
  startAngle: number
  endAngle: number
  fill: string
  payload: DataItem
  percent: number
  value: number
}

export default function GenreStatsCard() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<GenreStats[] | null>(null)

  const renderActiveShape = (props: RenderActiveShapeProps) => {
    const RADIAN = Math.PI / 180
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value
    } = props
    const sin = Math.sin(-RADIAN * midAngle)
    const cos = Math.cos(-RADIAN * midAngle)
    const sx = cx + (outerRadius + 10) * cos
    const sy = cy + (outerRadius + 10) * sin
    const mx = cx + (outerRadius + 30) * cos
    const my = cy + (outerRadius + 30) * sin
    const ex = mx + (cos >= 0 ? 1 : -1) * 22
    const ey = my
    const textAnchor = cos >= 0 ? 'start' : 'end'

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload._id}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill={theme.button.primary}
        >{`${value} Songs`}</text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
          {`(${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    )
  }
  useEffect(() => {
    setLoading(true)
    getGenreStats()
      .then(data => {
        setLoading(false)
        setData(data)
      })
      .catch(error => {
        setError(error)
      })
  }, [])

  if (loading) {
    return <StyledLoadingSpinner />
  }

  if (error) {
    console.error(error)
  }

  const onPieEnter: PieProps['onMouseEnter'] = (_, index) => {
    setActiveIndex(index ?? 0)
  }

  console.log(data)

  return (
    <StatsPageCard>
      <StatsCardHeading>Genre Stats</StatsCardHeading>
      {data && (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={600} height={600}>
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={100}
              outerRadius={120}
              fill={theme.colors.secondary}
              dataKey="count"
              color={theme.button.primary}
              onMouseEnter={onPieEnter}
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </StatsPageCard>
  )
}
