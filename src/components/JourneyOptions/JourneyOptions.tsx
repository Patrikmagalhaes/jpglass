
import styled from 'styled-components';
import { ShoppingBag } from 'lucide-react';
import { motion } from 'motion/react';
import { theme } from '../../styles/theme';





const BackgroundVideo = styled.video`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
 
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(5, 5, 5, 0.7),
    rgba(5, 5, 5, 0.9)
  );
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

interface CardProps {
  isHighlighted?: boolean;
}

const Card = styled(motion.div) <CardProps>`
  flex: 1;

  border-radius: 12px;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  transition: all 0.3s ease;
  min-height: 420px;

  ${props => props.isHighlighted ? `
    border: 1px solid rgba(198, 255, 0, 0.5);
    box-shadow: inset 0 0 20px rgba(198, 255, 0, 0.15), 0 0 30px rgba(198, 255, 0, 0.3);
    transform: scale(1.05);
    z-index: 20;
  ` : `
    border: 1px solid rgba(122, 0, 255, 0.4);
    box-shadow: inset 0 0 15px rgba(122, 0, 255, 0.1), 0 0 20px rgba(122, 0, 255, 0.2);
  `}

  &:hover {
    transform: translateY(-10px) ${props => props.isHighlighted ? 'scale(1.06)' : ''};
    background: rgba(20, 20, 20, 0.8);
  }

  @media (max-width: 968px) {
    width: 100%;
    max-width: 400px;
    transform: none;
    &:hover { transform: translateY(-5px); }
  }
`;

const CardContent = styled.div`
  margin-bottom: 2rem;
`;

const CardTopLabel = styled.span<{ color: string }>`
  color: ${props => props.color};
  font-weight: 700;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  display: block;
  margin-bottom: 1rem;
  font-family: ${theme.fonts.secondary};
`;

const CardMainTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 800;
  text-transform: uppercase;
  margin-bottom: 1rem;
  line-height: 1.2;
  font-family: ${theme.fonts.secondary};
`;

const CardText = styled.p`
  font-size: 0.875rem;
  line-height: 1.6;
  color: #9CA3AF;
  font-family: ${theme.fonts.secondary};
`;

const Button = styled.button<{ glowColor: string; isSolid?: boolean }>`
  background: ${props => props.isSolid ? props.glowColor : 'transparent'};
  border: 1px solid ${props => props.glowColor};
  color: ${props => props.isSolid ? '#000' : props.glowColor};
  padding: 0.875rem 1.5rem;
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  width: 100%;
  border-radius: 6px;
  box-shadow: ${props => props.isSolid ? `0 0 25px ${props.glowColor}80` : `0 0 10px ${props.glowColor}4d`};

  &:hover {
    background: ${props => props.glowColor};
    color: #000;
    transform: scale(1.02);
  }
`;


export default function JourneyOptions() {
  return (
    <JourneyContainer id="hero-section">

      <BackgroundVideo
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/images/cannabis.mp4" type="video/mp4" />
      </BackgroundVideo>

      <Overlay />

      <Content>
        <Title id="hero-main-title">Os 3 caminhos</Title>

        <Subtitle id="hero-subtitle">
          Decida como prefere adquirir sua peça
        </Subtitle>

        <CardsGrid id="cards-grid">
          <Card
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
          </Card>
        </CardsGrid>
      </Content>

    </JourneyContainer>
  );
}

