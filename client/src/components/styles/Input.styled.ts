import styled from 'styled-components'

export interface InputProps {
  width?: number
}

export const Input = styled.input<InputProps>`
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  background-color: inherit;
  color: #fff;
  /* color: ${({ theme }) => theme.colors.secondary}; */
  font-size: 1rem;
  border-radius: 12px;
  width: ${({ width }) => (width ? `${width}px` : '100%')};
  padding: 12px 25px;

  &::placeholder {
    color: #fff;
  }

  &:focus {
    outline: none;
    border-color: #fff;
    /* border-color: ${({ theme }) => theme.colors.secondary}; */
  }
`
