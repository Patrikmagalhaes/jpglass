import styled, { keyframes } from 'styled-components';
import { ArrowRight } from 'lucide-react';
import { theme } from '../../styles/theme';
import LogoInstagram from '../../assets/icons/logo-instagram.svg?react'
import MediaRenderer, { type MediaItem } from './MediaRenderer';

// Ambient pulsing glows
const pulseGlow = keyframes`
  0% {
    transform: translate(-30%, -30%) scale(1) rotate(0deg);
    opacity: 0.4;
  }
  50% {
    transform: translate(-25%, -20%) scale(1.15) rotate(180deg);
    opacity: 0.6;
  }
  100% {
    transform: translate(-30%, -30%) scale(1) rotate(360deg);
    opacity: 0.4;
  }
`;

const pulseGlowReverse = keyframes`
  0% {
    transform: translate(30%, 30%) scale(1.1) rotate(360deg);
    opacity: 0.4;
  }
  50% {
    transform: translate(20%, 25%) scale(0.9) rotate(180deg);
    opacity: 0.55;
  }
  100% {
    transform: translate(30%, 30%) scale(1.1) rotate(0deg);
    opacity: 0.4;
  }
`;




const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #000000;
  background-image: 
    radial-gradient(circle at 10% 20%, #050014 0%, transparent 40%),
    radial-gradient(circle at 90% 80%, #03000b 0%, transparent 45%);
  color: #FFFFFF;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
`;

// Decorative ambient neon orbs
const GlowOrbLeft = styled.div`
  position: absolute;
  top: 5%;
  left: -10%;
  width: 50vw;
  height: 50vw;
  max-width: 600px;
  max-height: 600px;
  background: radial-gradient(circle, rgba(139, 255, 0, 0.15) 0%, rgba(95, 0, 255, 0.05) 50%, rgba(0,0,0,0) 70%);
  filter: blur(80px);
  pointer-events: none;
  z-index: 1;
  animation: ${pulseGlow} 15s infinite linear;
`;

const GlowOrbRight = styled.div`
  position: absolute;
  bottom: 10%;
  right: -10%;
  width: 55vw;
  height: 55vw;
  max-width: 650px;
  max-height: 650px;
  background: radial-gradient(circle, rgba(106, 0, 255, 0.18) 0%, rgba(166, 255, 0, 0.05) 60%, rgba(0,0,0,0) 80%);
  filter: blur(100px);
  pointer-events: none;
  z-index: 1;
  animation: ${pulseGlowReverse} 18s infinite linear;
`;

const GallerySection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1600px;
  margin: auto;
padding: 0 4rem;
  box-sizing: border-box;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    padding: 40px 16px;
  }
`;

const HeroHeader = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  text-align: center;
  margin-bottom: 50px;
  position: relative;

  @media (max-width: 768px) {
    margin-bottom: 35px;
  }
`;

const Title = styled.h1`
  font-family: ${theme.fonts.hero};
  font-size: clamp(4rem, 5vw, 6rem);
  font-weight: 700;
  color: #FFFFFF;
  letter-spacing: 0.04em;
  margin: 0;
  text-transform: uppercase;
  display: inline-block;
  line-height: 1.1;

  @media (max-width: 768px) {
    font-size: 3.5rem;
    letter-spacing: 0.02em;
    transform: rotate(-1deg);
  }
`;

const Subtitle = styled.p`
   font-family: ${theme.fonts.secondary};
   font-size: clamp(0.95rem, 1.1vw, 1.2rem);
  color: #D9D9D9;
  letter-spacing: -0.01em;
  text-transform: uppercase;
  margin: 18px 0 0 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8), 0px 0px 10px rgba(138, 61, 255, 0.4);
  display: inline-block;
  border-bottom: 1.5px solid #8A3DFF;
  padding-bottom: 4px;

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
`;


const GalleryRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  gap: 32px;
  padding: 30px 10px 50px 10px;
  
  /* Scrollbar customized with a cyber neon design */
  &::-webkit-scrollbar {
    height: 6px;
  }
  &::-webkit-scrollbar-track {
    background: rgba(5, 0, 20, 0.4);
    backdrop-filter: blur(8px);
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.05);
  }
  &::-webkit-scrollbar-thumb {
    background: linear-gradient(90deg, #8BFF00, #8A3DFF);
    box-shadow: 0 0 8px rgba(139, 255, 0, 0.6);
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(90deg, #A6FF00, #A25FFF);
  }

  @media (max-width: 768px) {
    gap: 20px;
    padding: 20px 10px 40px 10px;
    
    /* Touch devices specific styling for physical swiping */
    -webkit-overflow-scrolling: touch;
    scroll-padding: 20px;
  }
`;

const MediaCard = styled.div`
  flex: 0 0 330px;
  height: 470px;
  position: relative;
  background-color: #000000;
  
  /* Minimal sharp border */
  border: 1px solid #FFFFFF;
  border-radius: 4px; /* Minimal radius */
  overflow: hidden;
  scroll-snap-align: center;
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  
  /* Alternating green and purple backlight glows */
  box-shadow: 
    0 10px 30px rgba(0, 0, 0, 0.9),
    ${props => props.id && parseInt(props.id.split('-')[1]) % 2 === 0
    ? '0px 0px 15px rgba(95, 0, 255, 0.25)'
    : '0px 0px 15px rgba(166, 255, 0, 0.22)'};

  @media (min-width: 769px) {
    &:hover {
      transform: translateY(-10px) scale(1.02);
      border-color: ${props => props.id && parseInt(props.id.split('-')[1]) % 2 === 0 ? '#8A3DFF' : '#B6FF00'};
      box-shadow: 
        0 20px 40px rgba(0, 0, 0, 0.95),
        ${props => props.id && parseInt(props.id.split('-')[1]) % 2 === 0
    ? '0px 0px 30px rgba(138, 61, 255, 0.6)'
    : '0px 0px 30px rgba(182, 255, 0, 0.6)'};
    }
  }

  @media (max-width: 768px) {
    flex: 0 0 280px;
    height: 400px;
    
    &:active {
      transform: scale(0.97);
    }
  }
`;

const GlassReflectionOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  
  /* Highly glossy 3D liquid chrome & glass reflection */
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.28) 0%,
    rgba(255, 255, 255, 0.08) 25%,
    rgba(0, 0, 0, 0) 60%,
    rgba(138, 61, 255, 0.1) 85%,
    rgba(182, 255, 0, 0.15) 100%
  );
  mix-blend-mode: overlay;
  pointer-events: none;
`;

const CtaFooter = styled.footer`
  width: 100%;
  text-align: center;
  margin-top: 50px;
  position: relative;

  @media (max-width: 768px) {
    margin-top: 35px;
  }
`;
export const LeftIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;

  transition: transform 0.3s cubic-bezier(0.19, 1, 0.22, 1);

  svg {
    width: 22px;
    height: 22px;
  }
`;
export const RightIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;

  transition: transform 0.3s cubic-bezier(0.19, 1, 0.22, 1);

  svg {
    width: 22px;
    height: 22px;
    stroke-width: 2.5;
  }
`;
export const ButtonPrimary = styled.a`
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

  color: #000;
  background-color: #c6ff1a;

  border: 3px solid #c6ff1a;
  border-radius: 0;

  transition: all 0.25s cubic-bezier(0.19, 1, 0.22, 1);

  box-shadow:
    6px 6px 0px #8a3dff,
    12px 12px 0px rgba(0, 0, 0, 1);

  &:hover {
    background-color: #000;
    color: #c6ff1a;
    border-color: #c6ff1a;

    transform: translate(-4px, -4px);

    box-shadow:
      10px 10px 0px #8a3dff,
      20px 20px 0px rgba(0, 0, 0, 1),
      0px 0px 30px rgba(198, 255, 26, 0.5);
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


const ButtonText = styled.span`
  margin: 0 12px;
`;

export default function Portfolio() {

  const mediaItems: MediaItem[] = [
    {
      id: 'artwork-1',
      type: 'image',
      src: "media/portfolio/images/piteiras-1.jpg",
      alt: 'Escultura de vidro 1',
    },
    {
      id: 'artwork-2',
      type: 'image',
      src: 'media/portfolio/images/piteiras-2.jpg',
      alt: 'Escultura de vidro 2',
    },
    {
      id: 'artwork-3',
      type: 'video',
      src: '/media/portfolio/videos/cuia.mp4',
    },
    {
      id: 'artwork-4',
      type: 'video',
      src: '/media/portfolio/videos/piteira-1.mp4',

    },
    {
      id: 'artwork-5',
      type: 'video',
      src: '/media/portfolio/videos/piteira-2.mp4',

    },
    {
      id: 'artwork-5',
      type: 'video',
      src: '/media/portfolio/videos/pote.mp4',

    },


  ];

  return (
    <AppContainer>
      {/* Visual Ambient glow gradients to set the underground psychedelic vibe */}
      <GlowOrbLeft />
      <GlowOrbRight />

      <GallerySection id="gallery-section">
        <HeroHeader id="hero-header">
          <Title>Galeria</Title>
          <Subtitle>Obras Autorais & Esculturas de Vidro</Subtitle>
        </HeroHeader>

        <GalleryRow id="media-gallery">
          {mediaItems.map((art) => (
            <MediaCard key={art.id} id={art.id}>
              <MediaRenderer item={art} />
              <GlassReflectionOverlay />
            </MediaCard>
          ))}
        </GalleryRow>

        <CtaFooter id="cta-footer">
          <ButtonPrimary
            href="https://www.instagram.com/jp._.glass/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LeftIcon><LogoInstagram /></LeftIcon>
            <ButtonText>@jp._.glass</ButtonText>

            <RightIcon> <ArrowRight size={18} /></RightIcon>
           
          </ButtonPrimary>
        </CtaFooter>
      </GallerySection>
    </AppContainer>
  );
}

