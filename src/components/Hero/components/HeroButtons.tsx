import {
  ShoppingBag,
  Hammer,
  ArrowRight,
} from 'lucide-react';

import {
  ButtonGroup
} from '../styles';
import { ButtonPrimary, LeftIcon, RightIcon } from '../../Portfolio/Portfolio';
import styled from 'styled-components';



export const SecondaryButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;

  padding: 16px 32px;

  font-family: 'Share Tech Mono', 'Courier New', monospace;
  font-size: 1.15rem;
  font-weight: 900;
  text-transform: uppercase;
  text-decoration: none;
  letter-spacing: 0.18em;

  color: #c6ff1a;
  background-color: transparent;

  border: 3px solid #c6ff1a;
  border-radius: 0;

  transition: all 0.25s cubic-bezier(0.19, 1, 0.22, 1);

  box-shadow:
    6px 6px 0px #8a3dff,
    12px 12px 0px rgba(0, 0, 0, 1);

  &:hover {
    background-color: #c6ff1a;
    color: #000;

    transform: translate(-4px, -4px);

    box-shadow:
      10px 10px 0px #8a3dff,
      20px 20px 0px rgba(0, 0, 0, 1),
      0px 0px 20px rgba(198, 255, 26, 0.35);
  }

  &:hover ${LeftIcon} {
    transform: rotate(-10deg) scale(1.15);
  }

  &:hover ${RightIcon} {
    transform: translateX(6px) scale(1.1);
  }

  &:active {
    transform: translate(6px, 6px);

    box-shadow:
      0px 0px 0px #8a3dff,
      0px 0px 0px rgba(0, 0, 0, 1);
  }
`;


export function HeroButtons() {
  return (
    <ButtonGroup>
      {/* <PrimaryButton
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Peças Disponíveis

        <ShoppingBag size={18} />
      </PrimaryButton> */}
      <ButtonPrimary>
        <LeftIcon><ShoppingBag /></LeftIcon>
        <span>Peças Disponíveis</span>
        <RightIcon><ArrowRight /></RightIcon>
      </ButtonPrimary>
      <SecondaryButton
      >  <LeftIcon><Hammer size={18} /></LeftIcon>
        <span>Customizar Peça</span>
        <RightIcon><ArrowRight /></RightIcon>
        
      </SecondaryButton>
    </ButtonGroup>
  );
}