import styled from 'styled-components'

interface FlexProps {
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse'
  align?: 'center' | 'flex-start' | 'flex-end'
  justify?: 'space-between' | 'center' | 'flex-start' | 'flex-end'
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
