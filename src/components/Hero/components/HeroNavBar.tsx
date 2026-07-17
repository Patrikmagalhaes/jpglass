import {
  Navbar,
  Logo,
  NavLinks,
  NavLink,
} from '../styles';

export function HeroNavbar() {
  return (
    <Navbar>
      <Logo>JP GLASS</Logo>

      <NavLinks>
        <NavLink href="#home">Início</NavLink>

        <NavLink href="#options">
          Como Adquirir
        </NavLink>

        <NavLink href="#sobre">
         O Artista
        </NavLink>

        <NavLink href="#portfolio">
          Portfólio
        </NavLink>
          <NavLink href="#social">
          Clientes
        </NavLink>
           <NavLink href="#faq">
          FAQ
        </NavLink>
      </NavLinks>
    </Navbar>
  );
}