import styled from 'styled-components'

export const AuthDescription = styled.div`
  height: 100vh;
  color: ${({ theme }) => theme.colors.primary};
  padding: 0 40px;
  background-color: ${({ theme }) => theme.colors.secondary};

  h1 {
    font-weight: 800;
    font-size: 3rem;
  }

  h2 {
    font-weight: 800;
    font-size: 1.1rem;
  }

  img {
    width: 80px;
    /* margin: 0 auto; */
  }

  p {
    font-size: 1.1rem;
    line-height: 2rem;
  }
`
