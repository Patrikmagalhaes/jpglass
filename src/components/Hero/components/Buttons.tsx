import { ArrowRight, Flame, Paintbrush, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import styled from "styled-components";
import { theme } from "../../../styles/theme";


const PathwayGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  width: 100%;
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const PathwayCard = styled(motion.div)<{ isFeatured: boolean }>`
  background: ${props => props.isFeatured ? 'rgba(15, 10, 16, 0.65)' : 'rgba(11, 6, 12, 0.45)'};
  border: 1.5px solid ${props => props.isFeatured ? '#C6FF00' : '#5D1A8F'};
  border-radius: 16px;
  padding: 40px 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 30px;
  backdrop-filter: blur(8px);
  position: relative;
  overflow: hidden;
  box-shadow: ${props => props.isFeatured ? '0 10px 40px -15px rgba(198, 255, 0, 0.25)' : '0 10px 30px -20px rgba(93, 26, 143, 0.3)'};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at top right, ${props => props.isFeatured ? 'rgba(198, 255, 0, 0.04)' : 'rgba(93, 26, 143, 0.05)'}, transparent 60%);
    pointer-events: none;
  }
`;

const CardBadge = styled.div<{ isFeatured: boolean }>`
  position: absolute;
  top: 15px;
  right: 15px;
  background: ${props => props.isFeatured ? 'rgba(198, 255, 0, 0.15)' : 'rgba(255, 255, 255, 0.05)'};
  border: 1px solid ${props => props.isFeatured ? '#C6FF00' : 'rgba(255, 255, 255, 0.1)'};
  color: ${props => props.isFeatured ? '#C6FF00' : '#FFFFFF'};
  font-family: 'Fira Code', monospace;
  font-size: 0.65rem;
  font-weight: 500;
  padding: 4px 10px;
  border-radius: 4px;
`;

const NumericTag = styled.div<{ isFeatured: boolean }>`
  font-family: 'Fira Code', monospace;
  font-size: 0.85rem;
  letter-spacing: 0.1em;
  color: ${props => props.isFeatured ? '#C6FF00' : '#5D1A8F'};
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 8px;
`;

const ContentGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const CardTitle = styled.h3`
  font-family: ${theme.fonts.secondary};
  font-size: 1.5rem;
  font-weight: 800;
  color: #FFFFFF;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  line-height: 1.2;
`;

const CardDescription = styled.p`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.9rem;
  line-height: 1.5;
  color: #ffffff;
`;

const ButtonGroup = styled.div`
  margin-top: auto;
`;

const ActionButton = styled(motion.a)<{ isFeatured: boolean }>`
  width: 100%;
  padding: 16px 28px;
  border-radius: 10px;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.3s ease;
  text-decoration: none;
  box-sizing: border-box;
  
  border: 1.5px solid ${props => props.isFeatured ? '#C6FF00' : '#5D1A8F'};
  background-color: ${props => props.isFeatured ? '#C6FF00' : 'transparent'};
  color: ${props => props.isFeatured ? '#0B060C' : '#FFFFFF'};

  &:hover {
    background-color: ${props => props.isFeatured ? '#ffffff' : '#5D1A8F'};
    border-color: ${props => props.isFeatured ? '#ffffff' : '#5D1A8F'};
    color: ${props => props.isFeatured ? '#0B060C' : '#FFFFFF'};
    box-shadow: ${props => props.isFeatured ? '0 0 25px rgba(255, 255, 255, 0.4)' : '0 0 25px rgba(93, 26, 143, 0.4)'};
  }
`;


 
 
 
 export default function Buttons(){



    return(


        <PathwayGrid
          as={motion.div}

          initial="hidden"
          animate="visible"
        >
          {/* Card 01 - PEÇAS PRONTAS (FEATURED) */}
          <PathwayCard
            isFeatured={true}
      
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
          >
            <CardBadge isFeatured={true}>PEÇAS LIMITADAS</CardBadge>
            <NumericTag isFeatured={true}>
              <Flame size={14} /> 01. DROP EXCLUSIVO
            </NumericTag>
            
            <ContentGroup>
              <CardTitle>PRONTO PRA SESSÃO</CardTitle>
              <CardDescription>
                Escolha entre as peças disponíveis do drop atual. Obras finalizadas, fotografadas e prontas para envio. 
              </CardDescription>
            </ContentGroup>
            
            <ButtonGroup>
              <ActionButton
                isFeatured={true}
                href="https://wa.me/5599999999999?text=Olá!%20Gostaria%20de%20ver%20o%20drop%20atual%20de%20peças%20prontas%20da%20Nébula%20Glass."
                target="_blank"
                rel="noopener noreferrer"
                whileTap={{ scale: 0.98 }}
              >
                VER DROP ATUAL <ArrowRight size={16} />
              </ActionButton>
            </ButtonGroup>
          </PathwayCard>

          {/* Card 02 - CUSTOMIZAÇÃO */}
          <PathwayCard
            isFeatured={false}
      
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
          >
            <CardBadge isFeatured={false}>PERSONALIZÁVEL</CardBadge>
            <NumericTag isFeatured={false}>
              <Sparkles size={14} /> 02. CUSTOMIZAÇÃO
            </NumericTag>
            
            <ContentGroup>
              <CardTitle>DO SEU JEITO</CardTitle>
              <CardDescription>
                Escolha um modelo e personalize cores, técnicas e detalhes para criar uma versão com a sua identidade.
              </CardDescription>
            </ContentGroup>
            
            <ButtonGroup>
              <ActionButton
                isFeatured={false}
                href="https://wa.me/5599999999999?text=Olá!%20Gostaria%20de%20fazer%20uma%20customização%20na%20base%20da%20Nébula%20Glass."
                target="_blank"
                rel="noopener noreferrer"
                whileTap={{ scale: 0.98 }}
              >
                CUSTOMIZAR AGORA <ArrowRight size={16} />
              </ActionButton>
            </ButtonGroup>
          </PathwayCard>

          {/* Card 03 - PROJETO AUTORAL */}
          <PathwayCard
            isFeatured={false}
            
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
          >
            <CardBadge isFeatured={false}>EXCLUSIVIDADE</CardBadge>
            <NumericTag isFeatured={false}>
              <Paintbrush size={14} /> 03. PROJETO AUTORAL
            </NumericTag>
            
            <ContentGroup>
              <CardTitle>CRIE DO ZERO</CardTitle>
              <CardDescription>
               Tem uma ideia específica? Converse diretamente com o artista e desenvolva uma peça única, criada exclusivamente para você.
              </CardDescription>
            </ContentGroup>
            
            <ButtonGroup>
              <ActionButton
                isFeatured={false}
                href="https://wa.me/5599999999999?text=Olá!%20Tenho%20uma%20ideia%20para%20criar%20um%20projeto%20autoral%20do%20zero!"
                target="_blank"
                rel="noopener noreferrer"
                whileTap={{ scale: 0.98 }}
              >
                CRIAR DO ZERO <ArrowRight size={16} />
              </ActionButton>
            </ButtonGroup>
          </PathwayCard>
        </PathwayGrid>
    )
 }