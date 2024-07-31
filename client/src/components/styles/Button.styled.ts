import styled from 'styled-components'

export interface StyledButtonProps {
  color?: string
  bgColor?: string
}

export const StyledButton = styled.button<StyledButtonProps>`
  border: none;
  cursor: pointer;
  font-weight: 500;
  font-size: 1rem;
  width: 100%;
  border-radius: 12px;
  padding: 12px 50px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  color: ${({ theme, color }) => (color ? color : theme.button.secondary)};
  background-color: ${({ theme, bgColor }) => (bgColor ? bgColor : theme.colors.primary)};

  &:hover {
    opacity: 0.8;
  }
`