import { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ChevronRight, Maximize2 } from 'lucide-react';

import idleClosed from '/images/idle-closed.png'
import idleOpen from '/images/idle-open.png'

import torchClosed from '/images/torch-closed.png'
import torchOpen from '/images/torch-open.png'

import bongClosed from '/images/bong-closed.png'
import bongOpen from '/images/bong-open.png'
import { theme } from '../../styles/theme';

const characterStates = {
  idle: {
    closed: idleClosed,
    open: idleOpen,
  },
  torch: {
    closed: torchClosed,
    open: torchOpen,
  },
  bong: {
    closed: bongClosed,
    open: bongOpen,
  },
};

interface DialogueNode {
  state: 'idle' | 'torch' | 'bong';
  speaker: string;
  tagline: string;
  expression: 'welcome' | 'focused' | 'reflective' | 'passionate' | 'visionary';
  text: string;
}

const DIALOGUES_DATA: DialogueNode[] = [
  {
    state: 'idle',
    speaker: 'José Porto',
    tagline: 'O Segredo da Areia',
    expression: 'reflective',
    text: `Tem gente que olha pro vidro e vê só um objeto.\nEu vejo uma peça esperando personalidade.`,
  },
  {
    state: 'torch',
    speaker: 'José Porto',
    tagline: 'Sopro da Vida',
    expression: 'focused',
    text: `Sou José Porto.\nDesde 2020 transformo vidro em arte feita pra fazer parte do ritual de alguém.`,
  },
  {
    state: 'torch',
    speaker: 'José Porto',
    tagline: 'O Improviso',
    expression: 'passionate',
    text: `O que eu faço nunca sai exatamente igual.\nPorque o vidro não funciona assim.`,
  },
  {
    state: 'torch',
    speaker: 'José Porto',
    tagline: 'Fogo & Paciência',
    expression: 'focused',
    text: `O vidro ensina paciência.\nSe tentar controlar demais… ele quebra.`,
  },
  {
    state: 'bong',
    speaker: 'José Porto',
    tagline: 'Copiosa Arte',
    expression: 'visionary',
    text: `Pra muita gente isso aqui é só um bong ou uma piteira.\n\nPra quem realmente entende…\né parte da experiência.`,
  },
  {
    state: 'idle',
    speaker: 'José Porto',
    tagline: 'Arte que Completa',
    expression: 'welcome',
    text: `Eu só começo a peça.\n\nQuem termina a história…\né quem usa ela.`,
  },
];

// Expression Config (Lighting, Accents & Glows)
const EXPRESSION_THEMES = {
  welcome: {
    glowColor: 'rgba(245, 158, 11, 0.35)',
    badgeBg: 'rgba(245, 158, 11, 0.15)',
    badgeBorder: 'rgba(245, 158, 11, 0.4)',
    accent: '#f59e0b',
  },
  focused: {
    glowColor: 'rgba(59, 130, 246, 0.35)',
    badgeBg: 'rgba(59, 130, 246, 0.15)',
    badgeBorder: 'rgba(59, 130, 246, 0.4)',
    accent: '#3b82f6',
  },
  reflective: {
    glowColor: 'rgba(168, 85, 247, 0.35)',
    badgeBg: 'rgba(168, 85, 247, 0.15)',
    badgeBorder: 'rgba(168, 85, 247, 0.4)',
    accent: '#a855f7',
  },
  passionate: {
    glowColor: 'rgba(239, 68, 68, 0.45)',
    badgeBg: 'rgba(239, 68, 68, 0.18)',
    badgeBorder: 'rgba(239, 68, 68, 0.5)',
    accent: '#ef4444',
  },
  visionary: {
    glowColor: 'rgba(16, 185, 129, 0.35)',
    badgeBg: 'rgba(16, 185, 129, 0.15)',
    badgeBorder: 'rgba(16, 185, 129, 0.4)',
    accent: '#10b981',
  },
};

// Component Styles (Pure styled-components)
const PageWrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  background-color: #030303;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 2rem;
  box-sizing: border-box;

  @media (max-width: 900px) {
    padding: 1rem;
    height: 100vh;
    max-height: 100vh;
    align-items: stretch;
  }
`;

const DarkOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 50% 30%, transparent 20%, #000000 85%);
  z-index: 1;
  pointer-events: none;
`;

const BackgroundGraffitiLeft = styled.div`
  position: absolute;
  left: -4%;
  top: 20%;
  font-family: 'Permanent Marker', cursive;
  font-size: 24vw;
  font-weight: 900;
  color: rgba(99, 44, 150, 0.05);
  user-select: none;
  transform: rotate(-12deg);
  white-space: nowrap;
  letter-spacing: -0.05em;
  z-index: 0;
  pointer-events: none;

  @media (max-width: 1024px) {
    font-size: 32vw;
    top: 10%;
  }
`;

const BackgroundGraffitiRight = styled.div`
  position: absolute;
  right: -4%;
  bottom: 8%;
  font-family: 'Permanent Marker', cursive;
  font-size: 22vw;
  font-weight: 900;
  color: rgba(74, 94, 64, 0.05);
  user-select: none;
  transform: rotate(6deg);
  white-space: nowrap;
  letter-spacing: -0.03em;
  z-index: 0;
  pointer-events: none;

  @media (max-width: 1024px) {
    font-size: 30vw;
    bottom: 5%;
  }
`;

const ParticleContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 2;
  overflow: hidden;
`;

const FloatingDust = styled(motion.div)<{ $color: string }>`
  position: absolute;
  width: 5px;
  height: 5px;
  background-color: ${props => props.$color};
  border-radius: 50%;
  filter: blur(1px);
`;

const InterfaceContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  height: calc(100vh - 4rem);
  min-height: 550px;
  max-height: 750px;
  display: grid;
  grid-template-rows: auto 1fr;
  position: relative;
  z-index: 3;
  gap: 2rem;

  @media (max-width: 900px) {
    height: 100%;
    min-height: auto;
    max-height: none;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: hidden;
  }
`;

const TopMenuBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  padding-bottom: 1rem;
`;

const StudioLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #fff;
  font-weight: 600;
  letter-spacing: 0.1em;
  font-size: 0.9rem;
`;

const GlowingLed = styled.span<{ $color: string }>`
  width: 7px;
  height: 7px;
  background-color: ${props => props.$color};
  border-radius: 50%;
  display: inline-block;
  box-shadow: 0 0 10px ${props => props.$color};
  animation: pulseLEDEffect 1.5s infinite steps(2, alternate);

  @keyframes pulseLEDEffect {
    from { opacity: 0.5; }
    to { opacity: 1; }
  }
`;

const TitleTxt = styled.span`
   text-transform: uppercase;
   font-family: ${theme.fonts.hero};
   font-size: ${theme.fontSizes.title};
   color: rgba(255, 255, 255, 0.9);
`;

// Responsive Grid:
// On Desktop (width > 900px): Grid with 2 columns. Left column = Dialog Box, Right column = character portrait.
// On Mobile (width <= 900px): Swapped to place portrait underneath (footer) and dialogue on top.
const MainNovelStage = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 2.5rem;
  align-items: stretch;

  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    flex-grow: 1;
    position: relative;
    justify-content: flex-start;
  }
`;

const ContentPanelBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 10;
  
  @media (max-width: 900px) {
    justify-content: flex-start;
    flex-shrink: 0;
  }
`;

const DialogueConsole = styled.div`
  width: 100%;
  background: rgba(10, 10, 10, 0.75);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 2.25rem;
  backdrop-filter: blur(25px);
  -webkit-backdrop-filter: blur(25px);
  box-shadow: 
    0 25px 50px -12px rgba(0, 0, 0, 0.8),
    inset 0 1px 1px rgba(255, 255, 255, 0.05);
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  min-height: 320px;
  cursor: pointer;
  user-select: none;
  box-sizing: border-box;

  @media (max-width: 900px) {
    padding: 1.25rem;
    min-height: 250px;
    height: auto;
    max-height: none;
    overflow: visible;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent);
  }
`;

const CharacterInfoLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px dashed rgba(255, 255, 255, 0.1);
  padding-bottom: 0.75rem;
`;

const SpeakerName = styled.h2`
  font-family: 'Permanent Marker', cursive;
  font-size: 1.6rem;
  color: #ffffff;
  letter-spacing: 0.03em;
  margin: 0;
`;

const TaglineBadge = styled(motion.div)<{ $badgeBg: string; $badgeBorder: string; $accent: string }>`
  font-family: 'Fira Mono', monospace;
  font-size: 0.75rem;
  text-transform: uppercase;
  color: ${props => props.$accent};
  background-color: ${props => props.$badgeBg};
  border: 1px solid ${props => props.$badgeBorder};
  padding: 0.25rem 0.6rem;
  border-radius: 4px;
`;

const TextContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const NovelText = styled.p`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.15rem;
  line-height: 1.7;
  color: #eceff4;
  margin: 0;
  text-shadow: 0 1px 2px rgba(0,0,0,0.5);

  @media (max-width: 768px) {
    font-size: 1.05rem;
    line-height: 1.6;
  }

  strong {
    color: #f59e0b;
    font-weight: 600;
    text-shadow: 0 0 8px rgba(245, 158, 11, 0.3);
  }
`;

const InteractiveChoiceStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1rem;
`;

const ChoiceButton = styled(motion.button)<{ $accentColor: string }>`
  width: 100%;
  text-align: left;
  background: rgba(15, 15, 15, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #f3f4f6;
  padding: 1rem 1.5rem;
  border-radius: 10px;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.02rem;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    border-color: ${props => props.$accentColor};
    background: rgba(255, 255, 255, 0.03);
    color: #ffffff;
    box-shadow: 0 0 12px ${props => `${props.$accentColor}25`};
    transform: translateX(4px);
  }
`;

const ActionFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 1rem;
`;

const AutoIndicatorBadge = styled.div`
  font-family: 'Fira Mono', monospace;
  font-size: 0.7rem;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.45);
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;

const NextPromptButton = styled(motion.div)<{ $glowColor: string }>`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: #fff;
  font-family: 'Fira Mono', monospace;
  font-size: 0.8rem;
  opacity: 0.85;

  svg {
    animation: bounceRight 1s infinite alternate;
  }

  @keyframes bounceRight {
    0% { transform: translateX(0); }
    100% { transform: translateX(5px); }
  }
`;

const AvatarFrameSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  min-height: 320px;

  @media (max-width: 900px) {
    position: absolute;
    bottom: 0px;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    height: 30vh;
    margin-top: 0;
    z-index: 1;
    pointer-events: none;
    display: flex;
    align-items: flex-end;
    justify-content: center;
  }
`;

const AmbientGlowBehindAvatar = styled(motion.div)<{ $color: string }>`
  position: absolute;
  width: 280px;
  height: 280px;
  background: radial-gradient(circle, ${props => props.$color} 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
  z-index: 1;

  @media (max-width: 900px) {
    width: 120px;
    height: 120px;
  }
`;

const CharacterPortraitContainer = styled(motion.div)`
  position: relative;
  width: 100%;
  max-width: 520px;
  border-radius: 30px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: linear-gradient(180deg, rgba(16, 16, 16, 0.4) 0%, rgba(5, 5, 5, 0.82) 100%);
  padding: 1.5rem;
  box-shadow: 
    0 30px 60px rgba(0,0,0,0.8),
    inset 0 1px 3px rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 900px) {
    max-width: 140px;
    padding: 0.35rem;
    border-radius: 12px;
    margin-bottom: 0;
  }
`;

const StagePedestal = styled.div`
  position: absolute;
  bottom: 0px;
  width: 80%;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(239, 68, 68, 0.6), transparent);
  filter: blur(1px);
`;

const PortraitImg = styled.img<{ $activeExpression: string }>`
  width: 100%;
  height: auto;
  border-radius: 18px;
  object-fit: cover;
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  filter: ${props => {
    switch (props.$activeExpression) {
      case 'focused': return 'grayscale(20%) contrast(110%) brightness(95%)';
      case 'reflective': return 'grayscale(15%) sepia(20%) contrast(95%)';
      case 'passionate': return 'saturate(120%) contrast(115%) brightness(102%)';
      case 'visionary': return 'saturate(110%) hue-rotate(15deg)';
      default: return 'grayscale(5%) contrast(105%)';
    }
  }};

  &:hover {
    transform: scale(1.02);
  }

  @media (max-width: 900px) {
    max-height: 110px;
    width: auto;
    border-radius: 8px;
  }
`;

// Helper for highlighting specific key Portuguese phrases from the original prompt copy
function formatAndHighlightText(text: string) {
  let formatted = text;
  const rawSnippetsToHighlight = [
    { target: "transformo vidro em arte", replacement: "<strong>transformo vidro em arte</strong>" },
    { target: "equilíbrio constante entre o controle e o improviso", replacement: "<strong>equilíbrio constante entre o controle e o improviso</strong>" },
    { target: "equilíbrio de controle e improviso", replacement: "<strong>equilíbrio de controle e improviso</strong>" },
    { target: "equilíbrio entre controle e improviso", replacement: "<strong>equilíbrio entre controle e improviso</strong>" },
    { target: "quem completa essa história é quem usa", replacement: "<strong>quem completa essa história é quem usa</strong>" }
  ];

  for (const item of rawSnippetsToHighlight) {
    formatted = formatted.replace(item.target, item.replacement);
  }

  return <span dangerouslySetInnerHTML={{ __html: formatted }} />;
}

export default function App() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [customNode, setCustomNode] = useState<any>(null);
  const [showChoices, setShowChoices] = useState<boolean>(false);
  const [typedText, setTypedText] = useState<string>('');
  const [isTypingCompleted, setIsTypingCompleted] = useState<boolean>(false);
  const [mouthOpen, setMouthOpen] = useState<boolean>(false);
  
  const activeDialogue = customNode || DIALOGUES_DATA[currentIndex];
  const activeStyle = EXPRESSION_THEMES[activeDialogue.expression];
  const isTalking = !isTypingCompleted;
  const isLastDialogue = currentIndex === DIALOGUES_DATA.length - 1;

  // Mouth animation interval matching random timing similar to reference code
  useEffect(() => {
    if (!isTalking) {
      setMouthOpen(false);
      return;
    }

    const timer = setInterval(() => {
      setMouthOpen((prev) => !prev);
    }, Math.random() * 120 + 90);

    return () => clearInterval(timer);
  }, [isTalking]);

  // Particle generator parameters
  const [floatingParticles, setFloatingParticles] = useState<Array<{ id: number; x: number; y: number; delay: number; speed: number }>>([]);

  useEffect(() => {
    const pool = Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      x: Math.random() * 90 + 5,
      y: Math.random() * 80 + 10,
      delay: Math.random() * 5,
      speed: Math.random() * 15 + 10
    }));
    setFloatingParticles(pool);
  }, []);

  // Set up typewriter effect
  useEffect(() => {
    setIsTypingCompleted(false);
    setTypedText('');
    let index = 0;
    const fullText = activeDialogue.text;
    let clock: any;

    const performCharTyping = () => {
      if (index < fullText.length) {
        setTypedText(fullText.substring(0, index + 1));
        index++;
        clock = setTimeout(performCharTyping, 22);
      } else {
        setIsTypingCompleted(true);
      }
    };

    performCharTyping();

    return () => {
      clearTimeout(clock);
    };
  }, [activeDialogue.text]);

  // Advance dialogues or trigger finishing the typewriter on click
  const advanceConversation = () => {
    if (!isTypingCompleted) {
      setTypedText(activeDialogue.text);
      setIsTypingCompleted(true);
      return;
    }

    if (customNode) {
      return;
    }

    if (!isLastDialogue) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setShowChoices(true);
    }
  };

  const handleRestart = () => {
    setCustomNode(null);
    setShowChoices(false);
    setCurrentIndex(0);
  };

  const handleChoiceOption = (choiceType: 'ready' | 'custom' | 'contact') => {
    if (choiceType === 'ready') {
      setCustomNode({
        state: 'idle',
        speaker: 'José Porto',
        tagline: 'Minhas Peças',
        expression: 'visionary',
        text: 'Luminárias de mesa translúcidas, esculturas abstratas de alta fusão e piteiras artesanais. Cada peça é assunção de um design orgânico único.',
        options: [
          { text: '✦ Falar Diretamente Comigo', target: 'contact' },
          { text: '✦ Voltar ao Início', target: 'restart' }
        ]
      });
    } else if (choiceType === 'custom') {
      setCustomNode({
        state: 'torch',
        speaker: 'José Porto',
        tagline: 'Sob Demanda',
        expression: 'focused',
        text: 'Quer tirar uma ideia do papel? Selecionamos o estilo, a cor do vidro alemão e moldamos de forma exclusiva para o seu ritual.',
        options: [
          { text: '✦ Chamar no WhatsApp', target: 'whatsapp' },
          { text: '✦ Voltar ao Início', target: 'restart' }
        ]
      });
    } else if (choiceType === 'contact') {
      setCustomNode({
        state: 'bong',
        speaker: 'José Porto',
        tagline: 'Fale Comigo',
        expression: 'welcome',
        text: 'Entre de cabeça no mundo do sopro de vidro! Me chame agora mesmo para conversar sobre ideias de bong, luminárias ou presentes.',
        options: [
          { text: '✦ Chamar no WhatsApp', target: 'whatsapp' },
          { text: '✦ Rever a História', target: 'restart' }
        ]
      });
    }
  };

  const handleAction = (target: string) => {
    if (target === 'ready') handleChoiceOption('ready');
    else if (target === 'custom') handleChoiceOption('custom');
    else if (target === 'contact') handleChoiceOption('contact');
    else if (target === 'restart') handleRestart();
    else if (target === 'whatsapp') {
      window.open('https://wa.me/5511999999999', '_blank');
    }
  };

  // Determine current image matching open / closed mouth based on active dialogue state
  const currentImage = useMemo(() => {
    const stateImages = characterStates[activeDialogue.state as keyof typeof characterStates];
    return mouthOpen ? stateImages.open : stateImages.closed;
  }, [activeDialogue.state, mouthOpen]);

  return (
    <PageWrapper>
      <BackgroundGraffitiLeft>Vidro</BackgroundGraffitiLeft>
      <BackgroundGraffitiRight>Porto</BackgroundGraffitiRight>
      <DarkOverlay />

      {/* Floating dust and embers to mimic heat of glass furnace */}
      <ParticleContainer>
        {floatingParticles.map((particle) => (
          <FloatingDust
            key={particle.id}
            $color={activeStyle.accent}
            initial={{ opacity: 0, y: "110vh" }}
            animate={{ 
              opacity: [0, 0.45, 0.7, 0.45, 0],
              y: ["100vh", "-10vh"],
              x: [`${particle.x}%`, `${particle.x + (particle.id % 2 === 0 ? 4 : -4)}%`]
            }}
            transition={{
              duration: particle.speed,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut"
            }}
          />
        ))}
      </ParticleContainer>

      <InterfaceContainer>
        {/* Top Minimal System Header */}
        <TopMenuBar>
          <StudioLogo>
            <GlowingLed $color={activeStyle.accent} />
            <TitleTxt>O Artista</TitleTxt>
          </StudioLogo>
        </TopMenuBar>

        {/* Visual Novel Theater Stage */}
        <MainNovelStage>
          
          {/* Section 1: Dialogue Box / Conversation Box */}
          <ContentPanelBox>
            <DialogueConsole onClick={advanceConversation}>
              
              <CharacterInfoLine>
                <SpeakerName>{activeDialogue.speaker}</SpeakerName>
                <TaglineBadge 
                  $badgeBg={activeStyle.badgeBg} 
                  $badgeBorder={activeStyle.badgeBorder}
                  $accent={activeStyle.accent}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  key={activeDialogue.tagline}
                  transition={{ duration: 0.3 }}
                >
                  ✦ {activeDialogue.tagline}
                </TaglineBadge>
              </CharacterInfoLine>

              <TextContainer>
                <NovelText>
                  {formatAndHighlightText(typedText)}
                  {!isTypingCompleted && (
                    <motion.span 
                      animate={{ opacity: [1, 0, 1] }} 
                      transition={{ repeat: Infinity, duration: 0.6 }}
                      style={{ color: activeStyle.accent, fontWeight: 'bold', marginLeft: '2px' }}
                    >
                      |
                    </motion.span>
                  )}
                </NovelText>

                {/* Standard final options of the dialogue list */}
                <AnimatePresence>
                  {isTypingCompleted && isLastDialogue && showChoices && !customNode && (
                    <InteractiveChoiceStack onClick={(e) => e.stopPropagation()}>
                      <ChoiceButton
                        $accentColor={activeStyle.accent}
                        onClick={() => handleAction('ready')}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                      >
                        <span>VER PEÇAS PRONTAS</span>
                        <ChevronRight size={16} style={{ color: activeStyle.accent }} />
                      </ChoiceButton>

                      <ChoiceButton
                        $accentColor={activeStyle.accent}
                        onClick={() => handleAction('custom')}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                      >
                        <span>CRIAR PEÇA CUSTOM</span>
                        <ChevronRight size={16} style={{ color: activeStyle.accent }} />
                      </ChoiceButton>

                      <ChoiceButton
                        $accentColor={activeStyle.accent}
                        onClick={() => handleAction('contact')}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                      >
                        <span>FALAR DIRETAMENTE COMIGO</span>
                        <ChevronRight size={16} style={{ color: activeStyle.accent }} />
                      </ChoiceButton>
                    </InteractiveChoiceStack>
                  )}
                </AnimatePresence>

                {/* Inline options for custom choices response */}
                <AnimatePresence>
                  {isTypingCompleted && customNode && customNode.options && (
                    <InteractiveChoiceStack onClick={(e) => e.stopPropagation()}>
                      {customNode.options.map((option: any, optIdx: number) => (
                        <ChoiceButton
                          key={optIdx}
                          $accentColor={activeStyle.accent}
                          onClick={() => handleAction(option.target)}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                        >
                          <span>{option.text}</span>
                          <ChevronRight size={16} style={{ color: activeStyle.accent }} />
                        </ChoiceButton>
                      ))}
                    </InteractiveChoiceStack>
                  )}
                </AnimatePresence>
              </TextContainer>

              <ActionFooter>
                <div style={{ flexGrow: 1 }} />

                {isTypingCompleted && !showChoices && !customNode && (
                  <NextPromptButton 
                    $glowColor={activeStyle.glowColor}
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    Próximo <ChevronRight size={14} />
                  </NextPromptButton>
                )}
                {!isTypingCompleted && (
                  <NextPromptButton 
                    $glowColor={activeStyle.glowColor}
                    style={{ color: 'rgba(255,255,255,0.4)' }}
                  >
                    Pular <Maximize2 size={13} />
                  </NextPromptButton>
                )}
              </ActionFooter>

            </DialogueConsole>
          </ContentPanelBox>

          {/* Section 2: Character Portrait Frame */}
          <AvatarFrameSection>
            <AmbientGlowBehindAvatar 
              $color={activeStyle.glowColor} 
              animate={{
                scale: [0.85, 1.15, 0.85],
                opacity: [0.35, 0.65, 0.35],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />

            <CharacterPortraitContainer
              animate={{
                y: [0, -8, 0],
                rotateZ: [0, 0.5, -0.5, 0]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <PortraitImg 
                src={currentImage} 
                $activeExpression={activeDialogue.expression}
                alt="José Porto - Sopro de Vidro"
                referrerPolicy="no-referrer"
              />
              <StagePedestal />
            </CharacterPortraitContainer>
          </AvatarFrameSection>

        </MainNovelStage>
      </InterfaceContainer>
    </PageWrapper>
  );
}
