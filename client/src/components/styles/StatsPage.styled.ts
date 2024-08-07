import styled from 'styled-components'

export const StatsPageGrid = styled.div`
  height: 100%;
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 400px);

  @media (max-width: ${({ theme }) => theme.mobile.md}) {
    grid-template-columns: 100%;
    grid-template-rows: repeat(4, 400px);
  }
`

export const StatsPageCard = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.secondary};
`
