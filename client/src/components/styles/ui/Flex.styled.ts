import styled, { CSSProperties } from 'styled-components'

interface FlexProps {
  direction?: CSSProperties['flexDirection']
  align?: CSSProperties['alignItems']
  justify?: CSSProperties['justifyContent']
  margin?: string
  gap?: number
}

export const Flex = styled.div<FlexProps>`
  display: flex;
  width: 100%;
  height: 100%;
  gap: ${({ gap }) => (gap ? `${gap}px` : '')};
  margin: ${({ margin }) => (margin ? margin : '')};
  align-items: ${({ align }) => (align ? align : 'center')};
  justify-content: ${({ justify }) => justify || 'center'};
  flex-direction: ${({ direction }) => direction || 'row'};
`
