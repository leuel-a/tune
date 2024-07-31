import { ButtonHTMLAttributes, PropsWithChildren } from 'react'
import Button from './Button'
import { Flex } from './styles/ui/Flex.styled'
import { StyledDiv } from './styles/OAuthButton.styled'

export interface OAuthButtonProps
  extends PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {}

export default function OAuthButton({ children, ...props }: OAuthButtonProps) {
  return (
    <StyledDiv>
      <Button color={'#fff'} {...props}>
        <Flex gap={10}>{children}</Flex>
      </Button>
    </StyledDiv>
  )
}
