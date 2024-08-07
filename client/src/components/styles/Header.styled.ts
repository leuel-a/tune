import styled from 'styled-components'

export const StyledHeader = styled.header`
  background: ${({ theme }) => theme.colors.secondary};
  /* padding: 20px 0; */
  position: sticky;
  top: 0;
  /* box-shadow: 0 1px 3px 0.5px ${({ theme }) => theme.colors.secondary}; */
`

export const Logo = styled.img`
  width: 40px;
`

export const LogoText = styled.h1`
  font-size: 2rem;
  font-weight: 500;
  color: ${({ theme }) => theme.button.secondary};

  @media (max-width: ${({theme}) => theme.mobile.sm}) {
    font-size: 1.2rem;
  }
`
