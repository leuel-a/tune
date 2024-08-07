import styled from 'styled-components'

export const ProfileMusicsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0 20px;
  color: ${({ theme }) => theme.colors.secondary};

  h1 {
    font-size: 2rem;
  }
`

export const ProfileMusicsPaginate = styled.div`
  display: flex;
  justify-content: end;
`

export const ProfileMusicList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
`
