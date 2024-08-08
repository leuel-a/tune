import styled from 'styled-components'

export const StatsPageGrid = styled.div`
  height: 100%;
  display: grid;
  gap: 15px;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 400px);

  @media (max-width: ${({ theme }) => theme.mobile.md}) {
    grid-template-columns: 100%;
    grid-template-rows: repeat(4, 400px);
  }
`

export const StatsCardHeading = styled.h2`
  color: ${({ theme }) => theme.button.primary};
  font-weight: 500;
  font-size: 1.5rem;
`

export const StatsPageCard = styled.div`
  padding: 10px 15px;
  color: ${({ theme }) => theme.button.primary};
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  box-shadow: 0px 2px 3px ${({ theme }) => theme.colors.secondary};
`
