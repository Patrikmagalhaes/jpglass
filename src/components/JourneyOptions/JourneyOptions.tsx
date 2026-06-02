
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
  min-height: 100vh;
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
  font-size: clamp(5rem, 8vw, 9rem);
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
  max-width: 1200px;
  z-index: 10;
  align-items: stretch;

  @media (max-width: 968px) {
    flex-direction: column;
    align-items: center;
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
  [-100, 100]
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
          {/* <Card
            id="card-1"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <CardContent>
              <CardTopLabel color={COLORS.neonPurple}>01. Peças Prontas</CardTopLabel>
              <CardMainTitle>O fogo já fez sua parte.</CardMainTitle>
              <CardText>
                Seleção de peças exclusivas do drop atual, prontas para envio imediato.
                Oportunidade única de elevar sua sessão agora.
              </CardText>
            </CardContent>
            <Button id="button-1" glowColor={COLORS.neonPurple}>
              <span>Ver Peças</span>
              <ShoppingBag size={16} />
            </Button>
          </Card>

          <Card
            id="card-2"
            isHighlighted
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <CardContent>
              <CardTopLabel color={COLORS.neonGreen}>02. Customização</CardTopLabel>
              <CardMainTitle>Sua identidade, nosso toque.</CardMainTitle>
              <CardText>
                Transforme conceitos em realidade. Personalize bases existentes
                com elementos únicos que definem seu estilo nas ruas.
              </CardText>
            </CardContent>
            <Button id="button-2" glowColor={COLORS.neonGreen} isSolid>
              Customizar Peça
            </Button>
          </Card>

          <Card
            id="card-3"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <CardContent>
              <CardTopLabel color={COLORS.neonPurple}>03. Projeto Autoral</CardTopLabel>
              <CardMainTitle>Tem uma ideia na cabeça?</CardMainTitle>
              <CardText>
                Aqui a peça nasce do zero. Você e o artista desenvolvem algo único,
                moldado pela sua visão e pelo calor do maçarico.
              </CardText>
            </CardContent>
            <Button id="button-3" glowColor={COLORS.neonPurple}>
              Falar com o Artista
            </Button>
          </Card> */}

          <Buttons />
        </CardsGrid>
      </Content>

    </JourneyContainer>
  );
}

