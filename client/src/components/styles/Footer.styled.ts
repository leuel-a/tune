import styled from 'styled-components'

export const StyledFooter = styled.footer`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: #fff;
  padding: 100px 0 60px;

  ul {
    list-style-type: none;
  }

  ul li {
    margin-bottom: 20px;
  }

  p {
    text-align: right;
  }

  @media (max-width: ${({ theme }) => theme.mobile.md}) {
    text-align: center;
    ul {
      padding: 0;
    }
    p {
      text-align: center;
    }
  }
`

export const FooterImage = styled.img`
  width: 50px;
`
