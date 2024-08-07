import styled from 'styled-components'
import { Link } from 'react-router-dom'

interface NavLinkProps {
  isActive: boolean
}

export const NavLink = styled(Link)<NavLinkProps>`
  font-size: 1rem;
  font-weight: 600;
  text-decoration: ${({ isActive }) => isActive ? 'underline' : ''};
  color: ${({ theme, isActive }) => (!isActive ? '#fff' : theme.colors.primary)};
`
