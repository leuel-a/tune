import { CSSProperties } from 'react'
import styled from 'styled-components'

export const Cursor = styled.div<{ $cursor: CSSProperties['cursor'] }>`
  cursor: ${({ $cursor }) => $cursor};
`
