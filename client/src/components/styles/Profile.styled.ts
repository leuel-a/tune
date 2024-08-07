import styled from 'styled-components'

export const Profile = styled.div`
  p {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 500;
    font-size: 1rem;
  }

  @media (max-width: ${({theme}) => theme.mobile.md}) {
    p {
      display: none;
    }
  }
`
