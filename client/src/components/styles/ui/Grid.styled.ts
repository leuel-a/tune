import styled from 'styled-components'

export interface GridProps {
  columns: number
  gap?: number
}

export const Grid = styled.div<GridProps>`
  display: grid;
  grid-gap: ${({ gap }) => (gap ? `${gap}px` : '10px')};
  grid-template-columns: ${({ columns }) => `repeat(${columns}, 1fr)`};

  @media (max-width: ${({ theme }) => theme.mobile.md}) {
    grid-template-columns: ${({ columns }) => `repeat(${columns - 1}, 1fr)`};
  }

  @media (max-width: ${({ theme }) => theme.mobile.sm}) {
    grid-template-columns: ${({ columns }) => `repeat(${columns - 2}, 1fr)`};
  }

  @media (max-width: ${({ theme }) => theme.mobile.xs}) {
    grid-template-columns: ${({ columns }) => `repeat(${columns - 3}, 1fr)`};
  }
`
