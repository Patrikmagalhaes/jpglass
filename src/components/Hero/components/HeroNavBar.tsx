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
        <NavLink href="#">Início</NavLink>

        <NavLink href="#">
          Como Adquirir
        </NavLink>

        <NavLink href="#">
          Sobre o Artista
        </NavLink>

        <NavLink href="#">
          Portfólio de Peças
        </NavLink>
      </NavLinks>
    </Navbar>
  );
}