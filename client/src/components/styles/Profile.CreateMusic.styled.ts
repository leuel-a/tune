import styled from 'styled-components'

export const CreateMusicContainer = styled.div`
  h1 {
    color: ${({ theme }) => theme.button.secondary};
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 10px;
  }

  p {
    font-size: 0.85rem;
    color: ${({ theme }) => theme.button.secondary};
    margin-bottom: 20px;
  }
`

export const CreateMusicFormGrid = styled.div`
  display: grid;
  gap: 15px;
  width: 100%;
  margin-bottom: 20px;
  grid-template-columns: repeat(2, 1fr);

  @media (max-width: ${({theme}) => theme.mobile.md}) {
    grid-template-columns: 100%;
  }
`
