import styled from 'styled-components'

interface ContainerProps {
  height?: 'screen'
  padding?: string
}

export const Container = styled.div<ContainerProps>`
  width: 1250px;
  min-width: 360px;
  height: ${({ height }) => (height ? (height === 'screen' ? '100vh' : '') : '100%')};
  max-width: 100%;
  padding: ${({ padding }) => (padding ? padding : '20px 0')};
  margin: 0 auto;

  @media (max-width: ${({ theme }) => theme.mobile.lg}) {
    padding: 20px 30px;
  }
`
