import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { ChevronDown, Flame, Sparkles, CreditCard, Clock, Box } from "lucide-react";
import { theme } from "../../styles/theme";

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;


const FAQSection = styled.section`
  background-color: #000000;
  padding: 100px 24px;
  position: relative;
  overflow: hidden;
  border-top: 1px solid rgba(138, 43, 226, 0.1);
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 70px 16px;
  }
`;

const GridDecor = styled.div`
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(171, 32, 253, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(171, 32, 253, 0.02) 1px, transparent 1px);
  background-size: 50px 50px;
  pointer-events: none;
  z-index: 1;
`;

const Container = styled.div`
  max-width: 860px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 48px;
`;

const HeaderArea = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  animation: ${fadeIn} 0.6s ease-out;
`;

const Title = styled.h2`
  font-family: ${theme.fonts.hero};
  font-weight: 900;
  font-size: clamp(4rem, 5vw, 6rem);
  color: #ffffff;
  line-height: 1.1;
  margin: 0;
  text-transform: uppercase;

  span {
    color: #7B2EFF;
    text-shadow: 0 0 15px rgba(171, 32, 253, 0.4);
  }
`;

const Subtitle = styled.p`
  font-family: ${theme.fonts.secondary};
  font-size: 15px;
  color: #9c92a6;
  max-width: 500px;
  line-height: 1.5;
  margin: 0;
`;

const FAQList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FAQItemWrapper = styled.div<{ $isOpen: boolean }>`
  background: ${props => props.$isOpen ? "rgba(13, 6, 22, 0.7)" : "rgba(4, 2, 8, 0.6)"};
  border: 1px solid ${props => props.$isOpen ? "rgba(182, 255, 0, 0.3)" : "rgba(171, 32, 253, 0.15)"};
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
  box-shadow: ${props => props.$isOpen ? "0 8px 24px rgba(0, 0, 0, 0.5), 0 0 12px rgba(182, 255, 0, 0.05)" : "none"};

  &:hover {
    border-color: ${props => props.$isOpen ? "#b6ff00" : "rgba(182, 255, 0, 0.35)"};
    background: ${props => props.$isOpen ? "rgba(13, 6, 22, 0.9)" : "rgba(8, 4, 14, 0.8)"};
  }
`;

const QuestionHeader = styled.button`
  width: 100%;
  background: none;
  border: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  cursor: pointer;
  text-align: left;
  outline: none;
  font-family: inherit;
  gap: 16px;
`;

const QuestionTextWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const IconContainer = styled.div<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: ${props => props.$isOpen ? "rgba(182, 255, 0, 0.1)" : "rgba(171, 32, 253, 0.08)"};
  border: 1px solid ${props => props.$isOpen ? "rgba(182, 255, 0, 0.3)" : "rgba(171, 32, 253, 0.15)"};
  color: ${props => props.$isOpen ? "#b6ff00" : "#7B2EFF"};
  transition: all 0.3s ease;
  flex-shrink: 0;

  @media (max-width: 480px) {
    width: 34px;
    height: 34px;
  }
`;

const QuestionText = styled.h3<{ $isOpen: boolean }>`
  font-family: ${theme.fonts.secondary};
  font-weight: 700;
  font-size: clamp(15px, 2vw, 17px);
  color: ${props => props.$isOpen ? "#ffffff" : "#eddcfb"};
  margin: 0;
  transition: color 0.3s ease;
`;

const ArrowIconWrapper = styled.div<{ $isOpen: boolean }>`
  color: ${props => props.$isOpen ? "#b6ff00" : "#6c6276"};
  transform: rotate(${props => props.$isOpen ? "180deg" : "0deg"});
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), color 0.3s ease;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AnswerContainer = styled.div<{ $isOpen: boolean }>`
  max-height: ${props => props.$isOpen ? "300px" : "0"};
  opacity: ${props => props.$isOpen ? "1" : "0"};
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
`;

const AnswerText = styled.div`
  padding: 0 24px 24px 80px;
  font-size: 14px;
  line-height: 1.6;
  color: #a197ad;
  font-family: ${theme.fonts.secondary};
  strong {
    color: #ffffff;
  }

  @media (max-width: 480px) {
    padding: 0 16px 20px 16px;
  }
`;

interface FAQItem {
    id: number;
    question: string;
    answer: React.ReactNode;
    icon: React.ReactNode;
}

export default function FAQ() {
    const [openItems, setOpenItems] = useState<Record<number, boolean>>({
        0: true, // Let the first one open by default for premium visual greeting
    });

    const toggleItem = (id: number) => {
        setOpenItems(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const faqData: FAQItem[] = [
        {
            id: 0,
            question: "Quais as formas de pagamento aceitas?",
            icon: <CreditCard size={18} />,
            answer: (
                <span>
                    Aceitamos pagamentos via <strong>Pix (com 5% de desconto automático)</strong> e parcelamento em até
                    <strong> 12x no cartão de crédito</strong> através do Mercado Pago. Para encomendas autorais personalizadas (Custom Drops),
                    trabalhamos com o modelo de 50% de sinal no início do projeto e 50% após a conclusão da peça.
                </span>
            )
        },
        {
            id: 1,
            question: "Quanto tempo leva para cada peça personalizada ficar pronta?",
            icon: <Clock size={18} />,
            answer: (
                <span>
                    O tempo varia de acordo com a complexidade física do projeto. Piteiras sob medida são modeladas e prontas de
                    <strong> 3 a 5 dias úteis</strong>. Já peças maiores como bongs, Sherlock Pipes, rigs e esculturas detalhadas levam de
                    <strong> 10 a 20 dias úteis</strong>. Isso ocorre porque o vidro precisa passar por um ciclo longo e controlado de recoziamento de
                    <strong> têmpera no forno profissional</strong> para estabilizar tensões moleculares e garantir longa durabilidade.
                </span>
            )
        },
        {
            id: 2,
            question: "Por que escolher o vidro borossilicato para acessórios de cannabis?",
            icon: <Flame size={18} />,
            answer: (
                <span>
                    O vidro borossilicato é o mesmo material utilizado em termômetros e laboratórios de alta fusão. Ele possui coeficiente de
                    dilatação baixíssimo, resistindo a <strong>choques térmicos extremos (fogo direto)</strong>. O ponto crucial é a pureza:
                    o borossilicato é <strong>completamente inerte e livre de toxinas</strong>, permitindo que você resfrie e sinta o sabor
                    <strong> 100% fiel e orgânico</strong> do material, de forma limpa e higiênica.
                </span>
            )
        },
        {
            id: 3,
            question: "Como funciona o envio? Corre risco de quebrar no caminho?",
            icon: <Box size={18} />,
            answer: (
                <span>
                    Enviamos de forma **discreta** para todo o Brasil. Temos anos de experiência em embalagens de segurança: cada peça
                    é envolta em múltiplas camadas de plástico bolha de alta gramatura e acondicionada em caixas preenchidas com amortecedores
                    descartáveis de espuma biodegradável. <strong>Nós garantimos a entrega intacta!</strong> Se sua mercadoria for avariada durante o transporte,
                    basta enviar um vídeo da abertura da caixa e nós substituímos a peça ou estornamos 100% do seu pagamento na hora.
                </span>
            )
        },
        {
            id: 4,
            question: "Consigo encomendar peças com cores e formatos específicos?",
            icon: <Sparkles size={18} />,
            answer: (
                <span>
                    Sem dúvida nenhuma! Essa é a nossa grande paixão. No **Projeto Autoral do JP Glass**, você pode encomendar peças com
                    traços fumados de Prata/Ouro (fumeado de metais), craquelados de cor, detalhes de cogumelo 3D, espirais psicodélicas,
                    ou tamanhos sob medida para encaixes específicos de bongs. Todo esse processo de co-criação é discutido diretamente
                    via direct do Instagram para alinharmos sua visão ao desenho no fogo.
                </span>
            )
        }
    ];

    return (
        <FAQSection id="perguntas-frequentes">
            <GridDecor />
            <Container>
                <HeaderArea>

                    <Title>
                        Perguntas <span>Frequentes</span>
                    </Title>
                    <Subtitle>
                        Esclareça as principais dúvidas sobre encomendas, processos de sopro, segurança das remessas e os acessórios artesanais em vidro borossilicato.
                    </Subtitle>
                </HeaderArea>

                <FAQList>
                    {faqData.map((item) => {
                        const isOpen = !!openItems[item.id];
                        return (
                            <FAQItemWrapper key={item.id} $isOpen={isOpen}>
                                <QuestionHeader
                                    onClick={() => toggleItem(item.id)}
                                    aria-expanded={isOpen}
                                >
                                    <QuestionTextWrapper>
                                        <IconContainer $isOpen={isOpen}>
                                            {item.icon}
                                        </IconContainer>
                                        <QuestionText $isOpen={isOpen}>{item.question}</QuestionText>
                                    </QuestionTextWrapper>

                                    <ArrowIconWrapper $isOpen={isOpen}>
                                        <ChevronDown size={18} />
                                    </ArrowIconWrapper>
                                </QuestionHeader>

                                <AnswerContainer $isOpen={isOpen}>
                                    <AnswerText>
                                        {item.answer}
                                    </AnswerText>
                                </AnswerContainer>
                            </FAQItemWrapper>
                        );
                    })}
                </FAQList>
            </Container>
        </FAQSection>
    );
}
