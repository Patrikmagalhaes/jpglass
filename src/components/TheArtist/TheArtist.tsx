import { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, Maximize2 } from 'lucide-react';

import idleClosed from '../../assets/chat/images/idle-closed.png'
import idleOpen from '../../assets/chat/images/idle-open.png'

import torchClosed from '../../assets/chat/images/torch-closed.png'
import torchOpen from '../../assets/chat/images/torch-open.png'

import bongClosed from '../../assets/chat/images/bong-closed.png'
import bongOpen from '../../assets/chat/images/bong-open.png'

import youOpen from "../../assets/chat/images/you-open.png"
import youClosed from "../../assets/chat/images/you-closed.png"
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
    you: {
        closed: youClosed,
        open: youOpen,
    }
};

interface DialogueNode {
    state: 'idle' | 'torch' | 'bong' | 'you';
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
        text: `Pra muita gente isso aqui é só um bong.\n\nPra quem realmente entende…\né parte da experiência.`,
    },
    {
        state: 'you',
        speaker: 'José Porto',
        tagline: 'Arte que Completa',
        expression: 'welcome',
        text: `Eu só começo a peça.\n\nQuem termina a história…\né você.`,
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

// =========================================
// PAGE WRAPPER
// =========================================

const Container = styled.section`
  width: 100%;
  height: 100vh;

  background-color: #030303;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 2rem;
  box-sizing: border-box;

  overflow: hidden;

  @media (max-width: 900px) {
    padding: 1rem;

    height: 100svh;
    align-items: stretch;
    justify-content: stretch;

    overflow: hidden;
  }
`;







// =========================================
// INTERFACE
// =========================================

const InterfaceContainer = styled.div`
  width: 100%;
  max-width: 1200px;

  display: grid;
  grid-template-rows: auto 1fr;

  position: relative;

  z-index: 3;

  @media (max-width: 900px) {
    height: 100svh;

    display: flex;
    flex-direction: column;

    overflow: hidden;
  }
`;



// =========================================
// TITLE
// =========================================

const TitleTxt = styled.h2`
  text-transform: uppercase;

  text-align: center;

  font-family: ${theme.fonts.hero};

  font-size: ${theme.fontSizes.title};

  color: rgba(255, 255, 255, 0.9);

  z-index: 30;

  @media (max-width: 900px) {
    flex-shrink: 0;
  }
`;



// =========================================
// MAIN STAGE
// =========================================

const MainNovelStage = styled.div`
  display: grid;

  grid-template-columns: 1.1fr 0.9fr;

  align-items: stretch;

  @media (max-width: 900px) {
    position: relative;

    flex: 1;

    width: 100%;

    display: flex;
    flex-direction: column;

    justify-content: flex-end;

    overflow: hidden;
  }
`;



// =========================================
// DIALOG CONTAINER
// =========================================

const ContentPanelBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  position: relative;

  z-index: 10;

  @media (max-width: 900px) {
    position: absolute;

    top: 0px;

width: 100%;
    max-height: 58svh;

    z-index: 20;

    pointer-events: none;
  }
`;



// =========================================
// DIALOG BOX
// =========================================

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

  pointer-events: auto;

  overflow: hidden;

  @media (max-width: 900px) {
    padding: 1.25rem;

    min-height: unset;

    height: auto;

    max-height: 58svh;

    overflow-y: auto;
    overflow-x: hidden;

    overscroll-behavior: contain;

    -webkit-overflow-scrolling: touch;
  }

  &::before {
    content: '';

    position: absolute;

    top: 0;
    left: 0;
    right: 0;

    height: 1px;

    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.15),
      transparent
    );
  }
`;



// =========================================
// CHARACTER INFO
// =========================================

const CharacterInfoLine = styled.div`
  display: flex;

  align-items: center;
  justify-content: space-between;

  border-bottom: 1px dashed rgba(255, 255, 255, 0.1);

  padding-bottom: 0.75rem;

  gap: 1rem;
`;

const SpeakerName = styled.h2`
  font-family: ${theme.fonts.hero};

  font-size: 1.6rem;

  color: #ffffff;

  letter-spacing: 0.08em;

  margin: 0;
`;

const TaglineBadge = styled(motion.div)<{
  $badgeBg: string;
  $badgeBorder: string;
  $accent: string;
}>`
  font-family: 'Fira Mono', monospace;

  font-size: 0.75rem;

  text-transform: uppercase;

  color: ${(props) => props.$accent};

  background-color: ${(props) => props.$badgeBg};

  border: 1px solid ${(props) => props.$badgeBorder};

  padding: 0.25rem 0.6rem;

  border-radius: 4px;

  flex-shrink: 0;
`;



// =========================================
// TEXT
// =========================================

const TextContainer = styled.div`
  flex-grow: 1;

  display: flex;
  flex-direction: column;

  justify-content: flex-start;
`;

const NovelText = styled.p`
  font-family: ${theme.fonts.secondary};

  font-size: 1.15rem;

  line-height: 1.7;

  color: #eceff4;

  margin: 0;

  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    font-size: 1.05rem;
    line-height: 1.6;
  }
`;



// =========================================
// CHOICES
// =========================================

const InteractiveChoiceStack = styled.div`
  display: flex;
  flex-direction: column;

  gap: 0.75rem;

  margin-top: 1rem;
`;

const ChoiceButton = styled(motion.button)<{
  $accentColor: string;
}>`
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

  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  display: flex;

  justify-content: space-between;
  align-items: center;

  &:hover {
    border-color: ${(props) => props.$accentColor};

    background: rgba(255, 255, 255, 0.03);

    color: #ffffff;

    box-shadow: 0 0 12px ${(props) => `${props.$accentColor}25`};

    transform: translateX(4px);
  }
`;



// =========================================
// FOOTER
// =========================================

const ActionFooter = styled.div`
  display: flex;

  justify-content: space-between;
  align-items: center;

  margin-top: auto;

  padding-top: 1rem;
`;

const NextPromptButton = styled(motion.div)<{
  $glowColor: string;
}>`
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
    0% {
      transform: translateX(0);
    }

    100% {
      transform: translateX(5px);
    }
  }
`;



// =========================================
// AVATAR SECTION
// =========================================

const AvatarFrameSection = styled.div`
  display: flex;

  align-items: center;
  justify-content: center;

  position: relative;

  @media (max-width: 900px) {
  z-index: 1;

  flex: 1;

  display: flex;

  align-items: flex-end;
  justify-content: center;

  overflow: hidden;

  pointer-events: none;

  width: 100vw;
  }
`;



// =========================================
// PORTRAIT CONTAINER
// =========================================

const CharacterPortraitContainer = styled(motion.div)`
  position: relative;

  width: 100%;
  max-width: 520px;

  border-radius: 30px;

  border: 1px solid rgba(255, 255, 255, 0.08);

  background: #00000066;

  z-index: 2;

  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  overflow: hidden;

  @media (max-width: 900px) {
   width: 100vw;

  max-width: none;

  border-radius: 0;

  border: none;

  background: transparent;

  margin-top: auto;

  opacity: 0.95;
  }
`;



// =========================================
// PEDESTAL
// =========================================

const StagePedestal = styled.div`
  position: absolute;

  bottom: 0px;

  width: 80%;
  height: 2px;

  background: linear-gradient(
    90deg,
    transparent,
    rgba(239, 68, 68, 0.6),
    transparent
  );

  filter: blur(1px);
`;



// =========================================
// IMAGE
// =========================================

const PortraitImg = styled.img<{ $activeExpression: string }>`
  width: 100%;

  border-radius: 18px;

  object-fit: cover;

  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);

  @media (max-width: 900px) {
    width: 100vw;

    height: auto;

    max-height: 45svh;

    object-fit: contain;

    border-radius: 0;
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
interface CustomNode extends DialogueNode {
    options?: {
        text: string;
        target: string;
    }[];
}
export default function App() {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [customNode, setCustomNode] = useState<CustomNode | null>(null);
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
        <Container>


            {/* Floating dust and embers to mimic heat of glass furnace */}


            <InterfaceContainer>
                {/* Top Minimal System Header */}

                <TitleTxt>O Artista</TitleTxt>



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


                        <CharacterPortraitContainer

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
        </Container>
    );
}
