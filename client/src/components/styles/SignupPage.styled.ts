import styled from 'styled-components'

export const SignupPageContainer = styled.div`
  height: 100vh;

  h1 {
    font-weight: 600;
    font-size: 3rem;
    margin-bottom: 10px;
    text-align: center;
    color: ${({ theme }) => theme.colors.secondary};
  }

  @media (max-width: ${({ theme }) => theme.mobile.md}) {
    h1 {
      font-size: 1.5rem;
    }
  }
`
export const Wrapper = styled.div`
  color: #fff;

  a {
    color: ${({ theme }) => theme.colors.secondary};
    text-decoration: none;
    /* text-decoration: underline; */
    cursor: pointer;
  }
`
