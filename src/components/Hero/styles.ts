import styled, {
  createGlobalStyle,
  keyframes,
} from 'styled-components';

import { motion } from 'motion/react';

import { theme }from  '../../styles/theme'

export const GlobalStyles = createGlobalStyle`
  body {
    background-color: ${theme.colors.background};
    color: ${theme.colors.text};
    margin: 0;
    font-family: ${theme.fonts.secondary};
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }
`;

export const HeroContainer = styled.section`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";

    position: absolute;
    inset: 0;

    background-image: url("https://www.transparenttextures.com/patterns/60-lines.png");

    opacity: 0.1;

    pointer-events: none;

    z-index: 1;
  }

  &::after {
    content: "";

    position: absolute;

    width: 900px;
    height: 900px;

    left: -250px;
    top: 50%;

    transform: translateY(-80%);

    border-radius: 50%;

    background: radial-gradient(
      circle,
      rgba(196, 253, 52, 0.69) 0%,
      rgba(196, 253, 52, 0.4) 35%,
      rgba(196, 253, 52, 0.1) 55%,
      transparent 75%
    );

    filter: blur(140px);

    opacity: 0.7;

    pointer-events: none;

    z-index: 0;
  }

  @media (max-width: 1024px) {
    &::after {
      width: 500px;
      height: 500px;

      left: 50%;
      top: -200px;

      transform: translateX(-50%);
    }
  }
`;

export const Navbar = styled.nav`
  width: 100%;
  max-width: 1200px;
  padding: 2rem 4rem;

  display: flex;
  justify-content: space-between;
  align-items: center;

  z-index: 100;


  margin: 0 auto;

  @media (max-width: 1024px) {
    padding: 1.5rem 2rem;
  }
`;

export const Logo = styled.div`
  font-family: ${theme.fonts.hero};

  font-size: clamp(1.8rem, 2vw, 2.4rem);

  color: ${theme.colors.primary};

  text-shadow: 0 0 10px rgba(199, 255, 26, 0.4);
`;

export const NavLinks = styled.div`
  display: flex;

  gap: 3rem;

  @media (max-width: 900px) {
    display: none;
  }
`;

export const NavLink = styled.a`
  text-decoration: none;

  color: ${theme.colors.text};

  font-size: 0.82rem;

  letter-spacing: 0.18em;

  text-transform: uppercase;

  font-weight: 300;

  transition: all 0.3s ease;

  position: relative;

  &:hover {
    color: ${theme.colors.primary};

    text-shadow: 0 0 8px rgba(199, 255, 26, 0.5);
  }

  &::after {
    content: "";

    position: absolute;

    bottom: -4px;
    left: 0;

    width: 0;
    height: 1px;

    background: ${theme.colors.primary};

    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
`;

export const MainContent = styled.main`
  display: flex;

  flex: 1;

  justify-content: space-between;
  align-items: center;

  padding: 0 4rem;

  max-width: 1600px;

  margin: 0 auto;

  width: 100%;

  @media (max-width: 1024px) {
    flex-direction: column;

    padding: 4rem 2rem;

    text-align: center;
  }

  @media (max-width: 768px) {
    padding-top: 0;
    margin-top: 0;
  }
`;

export const TextSection = styled.div`
  position: relative;

  z-index: 10;
`;

export const Title = styled(motion.h1)`
  font-family: ${theme.fonts.hero};

  font-size: clamp(4rem, 5vw, 6rem);

  line-height: 0.85;


  text-transform: uppercase;

  letter-spacing: 6px;

  background: linear-gradient(
    180deg,
    ${theme.colors.secondary} 0%,
    ${theme.colors.primary} 100%
  );

  -webkit-background-clip: text;

  -webkit-text-fill-color: transparent;

  padding-left: 0.08em;

  margin-left: -0.08em;

  padding-top: 0.08em;

  margin-top: -0.08em;

  overflow: visible;

  @media (max-width: 768px) {
    line-height: 1;

    padding-top: 0;

    margin-top: 0;
  }
`;

export const Subtitle = styled(motion.p)`
  font-family: ${theme.fonts.secondary};

  font-size: clamp(0.95rem, 1.1vw, 1.2rem);

  color: ${theme.colors.textSecondary};

  line-height: 1.7;

  max-width: 500px;

  margin-bottom: 3rem;

  letter-spacing: 0.05em;

  text-transform: uppercase;

  @media (max-width: 1024px) {
    margin-left: auto;
    margin-right: auto;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;

  gap: 1.5rem;

  @media (max-width: 1024px) {
    justify-content: center;
  }

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const BaseButton = styled(motion.button)`
  padding: 1.25rem 2.5rem;

  font-family: ${theme.fonts.secondary};

  font-size: 0.9rem;

  letter-spacing: 0.1em;

  text-transform: uppercase;

  cursor: pointer;

  display: flex;
  align-items: center;
  gap: 0.75rem;

  transition: all 0.3s ease;
`;

export const PrimaryButton = styled(BaseButton)`
  background: ${theme.colors.primary};

  color: #000;

  border: none;

  font-weight: 600;

  clip-path: polygon(
    0 0,
    95% 0,
    100% 30%,
    100% 100%,
    5% 100%,
    0 70%
  );

  &:hover {
    transform: translateY(-5px);

    box-shadow: 0 0 25px rgba(199, 255, 26, 0.5);
  }
`;

export const SecondaryButton = styled(BaseButton)`
  background: transparent;

  color: ${theme.colors.text};

  border: 1px solid #5d5d5d;

  font-weight: 400;

  clip-path: polygon(
    5% 0,
    100% 0,
    100% 70%,
    95% 100%,
    0 100%,
    0 30%
  );

  &:hover {
    border-color: ${theme.colors.secondary};

    text-shadow: 0 0 8px rgba(155, 77, 255, 0.5);

    box-shadow: inset 0 0 15px rgba(155, 77, 255, 0.1);
  }
`;

export const ImageSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: min(45vw, 600px);
  height: min(45vw, 600px);

  position: relative;

  @media (max-width: 1024px) {
    width: min(80vw, 450px);
    height: min(80vw, 450px);
  }
`;

export const ProductImage = styled(motion.img)`
  position: absolute;
  inset: 0;

  width: 100%;
  height: 100%;

  object-fit: contain;

  z-index: 5;


  pointer-events: none;
  will-change: transform, opacity, filter;
`;

export const BgText = styled.div`
  display: none;

  position: absolute;

  top: 50%;

  transform: translateY(-50%);

  font-family: ${theme.fonts.hero};

  font-size: 35vw;

  color: rgba(255, 255, 255, 0.03);

  pointer-events: none;

  white-space: nowrap;

  user-select: none;

  @media (min-width: 768px) {
    display: block;
  }
`;

export const BgTextMobile = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;

    position: absolute;

    top: 50%;
    left: 50%;

    transform: translate(-50%, -50%);

    font-family: ${theme.fonts.hero};

    font-size: 100vw;

    line-height: 0.75;

    text-align: center;

    color: rgba(255, 255, 255, 0.03);

    pointer-events: none;

    user-select: none;
  }
`;

const scroll = keyframes`
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-50%);
  }
`;

export const MarqueeWrapper = styled.div`
  width: 100%;

  padding: 0.5rem 0;

  overflow: hidden;

  display: flex;

  border-top: 4px solid #000;

  box-shadow: 0 -10px 30px rgba(0, 0, 0, 0.5);

  z-index: 20;

  background: linear-gradient(
    90deg,
    #7E3BED 0%,
    #C6FF34 100%
  );
`;

export const MarqueeContent = styled.div`
  display: flex;

  white-space: nowrap;

  animation: ${scroll} 20s linear infinite;
`;

export const MarqueeItem = styled.span`
  font-family: ${theme.fonts.hero};

  font-size: 2.2rem;

  color: #000;

  margin: 0 4rem;

  text-transform: uppercase;

  letter-spacing: -0.02em;
`;