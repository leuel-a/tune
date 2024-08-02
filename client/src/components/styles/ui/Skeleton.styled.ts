import styled, { keyframes } from 'styled-components'

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }

  50% {
    opacity: 0.5;
  }
`

export const Skeleton = styled.div<{ $width: number; $height: number }>`
  width: ${({ $width }) => $width}px;
  border-radius: 8px;
  height: ${({ $height }) => $height}px;
  background-color: ${({ theme }) => theme.colors.secondary};
  animation: ${pulse} 1.5s ease-in-out infinite;
`
