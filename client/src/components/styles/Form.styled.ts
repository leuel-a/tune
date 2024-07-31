import styled from 'styled-components'

export interface StyledFormProps {
  width?: string
}

export const StyledForm = styled.form<StyledFormProps>`
  width: ${({ width }) => width || '100%'};
  margin: 0 auto;

  @media (max-width: ${({ theme }) => theme.mobile.sm}) {
    padding-inline: 20px;
    width: 100%; /* Adjust width for mobile devices */
  }

  @media (max-width: ${({ theme }) => theme.mobile.md}) {
    width: 90%;
  }
`

export interface StyledInputProps {
  width?: number
}
export const StyledInput = styled.input`
  width: ${({ width }) => (width ? `${width}px` : '100%')};
  border-radius: 10px;
  font-size: 1rem;
  padding-left: 20px;
  padding-block: 12px;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  background-color: inherit;
  color: ${({ theme }) => theme.button.secondary};
`

export const FormControl = styled.div`
  width: 100%;
`
export const FormItem = styled.div`
  width: 100%;
`

export const FormMessage = styled.p`
  color: red;
  margin-block: 10px;
`
