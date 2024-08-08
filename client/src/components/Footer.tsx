import { Container } from './styles/ui/Container.styled'
import { FooterLinks, StyledFooter } from './styles/Footer.styled'

export default function Footer() {
  return (
    <StyledFooter>
      <Container>
        <FooterLinks>
          <ul>
            <li>
              Tune is a web application designed for music enthusiasts to easily upload and share
              their music.
            </li>
            <li>tune@gmail.com</li>
          </ul>

          <ul>
            <li>About Us</li>
            <li>What We Do</li>
            <li>FAQ</li>
          </ul>

          <ul>
            <li>Career</li>
            <li>Blog</li>
            <li>Contact Us</li>
          </ul>

        </FooterLinks>
        <p>&copy; 2024 Tune. All rights reserved.</p>
      </Container>
    </StyledFooter>
  )
}
