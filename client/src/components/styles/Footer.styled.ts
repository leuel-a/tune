import styled from 'styled-components'

export const StyledFooter = styled.footer`
  display: flex;
  flex-wrap: wrap;
  background-color: ${({ theme }) => theme.colors.secondary};
  color: #fff;
  padding: 100px 0 60px;

  p {
    text-align: right;
  }
`

export const FooterImage = styled.img`
  width: 50px;
`

export const FooterLinks = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  gap: 30px;

  * { 
    flex: 1;
  }

  ul {
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 10;
  }

  @media (max-width: ${({theme}) => theme.mobile.sm}) {
    text-align: center;
    flex-direction: column;
  }
`
