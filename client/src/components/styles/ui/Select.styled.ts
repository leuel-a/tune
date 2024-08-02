import styled from 'styled-components'

export const Select = styled.select`
  width: 100%;
  height: 100%;
  border: none;
  color: ${({ theme }) => theme.colors.secondary};
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  font-size: 1rem;
  border-radius: 12px;
  background-color: inherit;
  padding: 12px 25px;
`

export const SelectOption = styled.option`
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.primary};
`
