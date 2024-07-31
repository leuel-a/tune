import styled from 'styled-components'

export const StyledDiv = styled.div`
  width: 100%;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.button.secondary};
`
