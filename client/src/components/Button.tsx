import { StyledButton } from './styles/Button.styled'
import { ButtonHTMLAttributes, PropsWithChildren } from 'react'

interface ButtonProps extends PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {
  color?: string
  bgColor?: string
}

export default function Button({ children, color, bgColor, ...props }: ButtonProps) {
  return (
    <StyledButton $bgColor={bgColor} $color={color} {...props}>
      {children}
    </StyledButton>
  )
}
