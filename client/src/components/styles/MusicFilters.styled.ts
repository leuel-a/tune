import styled from 'styled-components'

export const MusicFiltersWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;


  @media (max-width: ${({theme}) => theme.mobile.md}) {
    gap: 10px;
    flex-direction: column;
  }
`
