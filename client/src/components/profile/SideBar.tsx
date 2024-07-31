import { useLocation } from 'react-router-dom'
import { SideBarContainer, StyledLink } from '../styles/ProfileSideBar.styled'

export default function ProfileSideBar() {
  const { pathname } = useLocation()

  return (
    <SideBarContainer>
      <StyledLink to="/profile" $active={pathname === '/profile'}>
        My Musics
      </StyledLink>
      <StyledLink to="/profile/create" $active={pathname === '/profile/create'}>
        Add Music
      </StyledLink>
      <StyledLink to="/profile/stats" $active={pathname === '/profile/stats'}>
        Personal Stats
      </StyledLink>
    </SideBarContainer>
  )
}
