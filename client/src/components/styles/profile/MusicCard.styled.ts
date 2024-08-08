import styled from 'styled-components'

export const MusicCardListItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid;
  padding: 15px 12px;
  border-radius: 8px;
  border-color: ${({ theme }) => theme.button.secondary};
`

export const MusicCardActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 10px;

  * {
    cursor: pointer;
  }
`
export const MusicCardTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 5px;
`
export const MusicCardArtist = styled.p`
  font-size: 0.9rem;
`
