import styled from 'styled-components'

export const StyledCard = styled.div`
  color: #fff;
  border: 2px solid ${({ theme }) => theme.colors.secondary};
  border-radius: 20px;
  box-shadow: 0, 0, 0, 0, ${({ theme }) => theme.colors.secondary};

  h4 {
    font-size: 0.8rem;
  }
`

export const CardHeader = styled.div`
  & > img {
    width: 100%;
    border-radius: 20px 20px 0 0;
  }
`

export const CardContent = styled.div`
  padding: 20px 15px;
  & > h3 {
    font-weight: 600;
    font-size: 1.2rem;
  }

  & > p {
    margin-top: 5px;
    font-weight: 300;
    font-size: 0.85rem;
  }
`

export const CardBadge = styled.h5`
  padding: 5px 20px;
  border-radius: 15px;
  font-size: 0.75rem;

  background-color: ${({ theme }) => theme.colors.secondary};
`

export const CardAlbum = styled.div``
