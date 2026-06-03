
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import Buttons from '../Hero/components/Buttons';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

const BackgroundVideo = styled(motion.video)`
  position: absolute;
  inset: 0;

  width: 100%;
  height: 120%;

  object-fit: cover;

  z-index: 0;
 
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;

  z-index: 1;
`;

const Content = styled.div`
  position: relative;
  z-index: 10;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const COLORS = {
  bg: '#050505',
  neonGreen: '#C6FF00',
  neonPurple: '#7A00FF',
  offWhite: '#EAEAEA',
  cardBg: 'rgba(10, 10, 10, 0.7)',
};



const JourneyContainer = styled.section`
  width: 100%;
  min-height: 120vh;
  background: #050505;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  color: ${COLORS.offWhite};
  overflow: hidden;
  position: relative;
`;


const Title = styled.h1`
  font-family: ${theme.fonts.hero};
  font-size: clamp(4rem, 5vw, 6rem);
  color: ${theme.colors.primary};
  margin: 0;
  line-height: 1;
  transform: skew(-5deg);

`;

const Subtitle = styled.h2`
  font-family: ${theme.fonts.secondary};
  font-size: clamp(0.95rem, 1.1vw, 1.2rem);
  color: ${COLORS.offWhite};
  letter-spacing: 0.05em;
  margin-top: 1rem;
  font-weight: normal;
  opacity: 0.8;
  margin-bottom: 2rem;
  text-transform: uppercase;
`;

const CardsGrid = styled.div`
  display: flex;
  gap: 1.5rem;
  width: 100%;
  max-width: 1600px;
  z-index: 10;
  align-items: stretch;
  padding: 0 4rem;

  @media (max-width: 968px) {
    flex-direction: column;
    align-items: center;
    padding: 0px;
  }
`;


export default function JourneyOptions() {


  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
const y = useTransform(
  scrollYProgress,
  [0, 1],
  [-1000, 1000]
);

  return (
    <JourneyContainer   ref={sectionRef} id="hero-section">

      <BackgroundVideo
        style={{ y }}
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/media/videos/cannabis.mp4" type="video/mp4" />
      </BackgroundVideo>

      <Overlay />

      <Content>
        <Title id="hero-main-title">Os 3 caminhos</Title>

        <Subtitle id="hero-subtitle">
          Decida como prefere adquirir sua peça
        </Subtitle>

        <CardsGrid id="cards-grid">
          

          <Buttons />
        </CardsGrid>
      </Content>

    </JourneyContainer>
  );
}

