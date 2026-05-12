import React from 'react';
import styled, { keyframes, createGlobalStyle } from 'styled-components';
import { motion } from 'motion/react';
import { ShoppingBag, Hammer } from 'lucide-react';

const theme = {
    colors: {
        primary: '#C7FF1A', // Neon Green
        secondary: '#9B4DFF', // Purple
        background: '#000000',
        text: '#FFFFFF',
        textSecondary: '#BFBFBF',
        overlay: 'rgba(155, 77, 255, 0.08)',
    },
    fonts: {
        hero: "adrip",
        secondary: "'IBM Plex Mono', monospace",
        display: "'Sedgwick Ave Display', cursive",
    }
};

const GlobalStyles = createGlobalStyle`
  body {
    background-color: ${theme.colors.background};
    color: ${theme.colors.text};
    margin: 0;
    font-family: ${theme.fonts.secondary};
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }
`;

const HeroContainer = styled.div`
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

const Navbar = styled.nav`
  width: 100%;
  padding: 2rem 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
  max-width: 1600px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    padding: 1.5rem 2rem;
  }
`;

const Logo = styled.div`
  font-family: ${theme.fonts.hero};
  font-size: 2rem;
  color: ${theme.colors.primary};
  text-shadow: 0 0 10px rgba(199, 255, 26, 0.4);
`;

const NavLinks = styled.div`
  display: flex;
  gap: 3rem;

  @media (max-width: 900px) {
    display: none;
  }
`;

const NavLink = styled.a`
  text-decoration: none;
  color: ${theme.colors.text};
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
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

const MainContent = styled.main`
  display: flex;
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

const TextSection = styled.div`
  position: relative;
  z-index: 10;

  
`;

const Title = styled(motion.h1)`
  font-family: ${theme.fonts.hero};
  font-size: clamp(5rem, 8vw, 9rem);
  line-height: 0.85;
  margin-bottom: 2.5rem;
  text-transform: uppercase;
  letter-spacing: 6px;
  color: ${theme.colors.text};
 
 
    background: linear-gradient(180deg, ${theme.colors.secondary} 0%, ${theme.colors.primary} 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
 
 

  @media (max-width: 768px) {
    line-height: 1;
    padding-top: 0;
    margin-top: 0;
  }
`;

const Subtitle = styled(motion.p)`
  font-family: ${theme.fonts.secondary};
  font-size: 1rem;
  color: ${theme.colors.textSecondary};
  line-height: 1.6;
  max-width: 500px;
  margin-bottom: 3rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;

  @media (max-width: 1024px) {
    margin-left: auto;
    margin-right: auto;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1.5rem;

  @media (max-width: 1024px) {
    justify-content: center;
  }
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const PrimaryButton = styled(motion.button)`
  background: ${theme.colors.primary};
  color: #000;
  border: none;
  padding: 1.25rem 2.5rem;
  font-family: ${theme.fonts.secondary};
  font-weight: 600;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  transition: all 0.3s ease;
  clip-path: polygon(0 0, 95% 0, 100% 30%, 100% 100%, 5% 100%, 0 70%);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 0 25px rgba(199, 255, 26, 0.5);
  }
`;

const SecondaryButton = styled(motion.button)`
  background: transparent;
  color: ${theme.colors.text};
  border: 1px solid #5d5d5d;
  padding: 1.25rem 2.5rem;
  font-family: ${theme.fonts.secondary};
  font-weight: 400;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  transition: all 0.3s ease;
  clip-path: polygon(5% 0, 100% 0, 100% 70%, 95% 100%, 0 100%, 0 30%);

  &:hover {
    border-color: ${theme.colors.secondary};
    text-shadow: 0 0 8px rgba(155, 77, 255, 0.5);
    box-shadow: inset 0 0 15px rgba(155, 77, 255, 0.1);
  }
`;

const ImageSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  &::before {
    content: '';

    position: absolute;

    width: 500px;
    height: 500px;

    border-radius: 50%;

    background: #7f3bed80;

    filter: blur(120px);

    opacity: 0.7;

    z-index: 1;
  }

  @media (max-width: 1024px) {
    margin-top: 4rem;
    justify-content: center;

    &::before {
      width: 300px;
      height: 300px;
    }
  }
`;

const ProductImage = styled(motion.img)`
  max-width: 100%;
  height: auto;
  max-height: 80vh;

  position: relative;
  z-index: 5;
`;

const BgText = styled.div`
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
  margin: 0;
  padding: 0;

    @media (min-width: 768px) {
    display: block;
`;
const BgTextMobile = styled.div`
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
const MarqueeWrapper = styled.div`
  width: 100%;
  background: ${theme.colors.primary};
  padding: 0.5rem 0;
  margin-top: auto;
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

const scroll = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
`;

const MarqueeContent = styled.div`
  display: flex;
  white-space: nowrap;
  animation: ${scroll} 20s linear infinite;

`;

const MarqueeItem = styled.span`
  font-family: ${theme.fonts.hero};
  font-size: 2.2rem;
  color: #000;
  margin: 0 4rem;
  text-transform: uppercase;
  letter-spacing: -0.02em;
`;

export const Hero: React.FC = () => {
    const marqueeItems = [
        "JP GLASS", "GLASS", "HANDMADE", "BOROSSILICATO", "JP GLASS",
        "BRASIL", "HANDMADE", "JP glass", "BRASIL", "JP GLASS"
    ];

    return (
        <>
            <GlobalStyles />
            <HeroContainer>
                <Navbar>
                    <Logo>JP GLASS</Logo>
                    <NavLinks>
                        <NavLink href="#">Início</NavLink>
                        <NavLink href="#">Como Adquirir</NavLink>
                        <NavLink href="#">Sobre o Artista</NavLink>
                        <NavLink href="#">Portfólio de Peças</NavLink>
                    </NavLinks>
                </Navbar>

                <MainContent>
                    <TextSection>
                        <Title

                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                        >
                            ARTE QUE<br />
                            ELEVA SUA SESSAO.
                        </Title>
                        <Subtitle
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.5 }}
                        >
                            DESIGN EM VIDRO DIRETO DO MAÇARICO. GARANTA PEÇAS EXCLUSIVAS DO DROP ATUAL OU ENCOMENDE A SUA DO ZERO.
                        </Subtitle>

                        <ButtonGroup>
                            <PrimaryButton
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Peças Disponíveis <ShoppingBag size={18} />
                            </PrimaryButton>
                            <SecondaryButton
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Customizar Peça <Hammer size={18} />
                            </SecondaryButton>
                        </ButtonGroup>
                    </TextSection>

                    <ImageSection>

                        <ProductImage
                            src={'./public/images/bong.png'}
                            alt="Custom Glass Piece"
                            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                            whileHover={{
                                y: -20,
                                rotate: 5,
                                transition: { duration: 2, repeat: Infinity, repeatType: "reverse" }
                            }}
                        />
                    </ImageSection>
                   
                </MainContent>

                <MarqueeWrapper>
                    <MarqueeContent>
                        {[...marqueeItems, ...marqueeItems].map((item, index) => (
                            <MarqueeItem key={index}>{item}</MarqueeItem>
                        ))}
                    </MarqueeContent>
                </MarqueeWrapper>
                 <BgText>JP GLASS</BgText>
                 <BgTextMobile>JP <br/>GLA <br/>SS</BgTextMobile>
            </HeroContainer>
        </>
    );
};
