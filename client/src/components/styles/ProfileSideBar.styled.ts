import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const SideBarContainer = styled.div`
  flex: 1;
  gap: 15px;
  display: flex;
  padding-top: 10px;
  padding-inline: 10px;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  color: ${({ theme }) => theme.colors.secondary};
  border-right: 1px solid ${({ theme }) => theme.colors.secondary};
`

export const OutletContainer = styled.div`
  flex: 4;
`

export const StyledLink = styled(Link)<{ $active?: boolean }>`
  width: 100%;
  border: 1px solid;
  background-color: ${({ theme, $active }) => ($active ? theme.colors.secondary : 'inherit')};
  color: ${({ theme, $active }) => ($active ? theme.colors.primary : 'inherit')};
  border-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 8px;
  padding: 15px 10px;
  text-decoration: none;
`

export const SideBarLink = styled.div<{ $active?: boolean }>`
  width: 100%;
  border: 1px solid;
  background-color: ${({ theme, $active }) => ($active ? theme.colors.secondary : 'inherit')};
  color: ${({ theme, $active }) => ($active ? theme.colors.primary : 'inherit')};
  border-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 8px;
  padding: 15px 10px;

  a {
    width: 100%;
    text-decoration: none;
    color: inherit;
  }
`