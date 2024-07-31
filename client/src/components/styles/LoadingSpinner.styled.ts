import styled from 'styled-components'

export interface LoadingSpinnerProps {
  $size?: number
}

export const StyledLoadingSpinner = styled.div<LoadingSpinnerProps>`
  height: ${({ $size }) => $size}px;
  width: ${({ $size }) => $size}px;
  border: 2px solid;
  margin: 0 auto;
  border-radius: 50%;
  border-color: ${({ theme }) => theme.colors.primary} transparent;
  animation: spin 1.3s ease infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`
