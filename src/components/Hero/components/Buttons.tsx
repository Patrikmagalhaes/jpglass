import { ArrowRight, Flame, Paintbrush, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import styled from "styled-components";
import { theme } from "../../../styles/theme";
import { Link } from "react-router-dom";


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

const PathwayCard = styled(motion.div) <{
  variant: 'green' | 'purple' | 'hybrid';
}>`
  position: relative;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 30px;

  padding: 40px 32px;
  border-radius: 24px;

  /* Glass igual para todos */
  background: rgba(10, 10, 15, 0.22);

  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);

  border: 1px solid rgba(255,255,255,.06);

  box-shadow:
    0 8px 32px rgba(0,0,0,.25),
    inset 0 1px 0 rgba(255,255,255,.04);

  transition: all .3s ease;

  &:hover {
    transform: translateY(-8px);
  }

  /* Barra superior */
  &::before {
    content: '';
    position: absolute;

    top: 0;
    left: 0;

    width: 100%;
    height: 3px;

    background:
      ${({ variant }) => {
    switch (variant) {
      case 'green':
        return '#C6FF00';

      case 'purple':
        return '#9333EA';

      case 'hybrid':
        return 'linear-gradient(90deg,#C6FF00,#9333EA)';
    }
  }};
  }

  /* Glow de identidade */
  &::after {
    content: '';

    position: absolute;
    inset: 0;

    pointer-events: none;

    background:
      ${({ variant }) => {
    switch (variant) {

      case 'green':
        return `
              radial-gradient(
                circle at top left,
                rgba(198,255,0,.18),
                transparent 45%
              )
            `;

      case 'purple':
        return `
              radial-gradient(
                circle at top right,
                rgba(147,51,234,.22),
                transparent 45%
              )
            `;

      case 'hybrid':
        return `
              radial-gradient(
                circle at top left,
                rgba(198,255,0,.16),
                transparent 40%
              ),

              radial-gradient(
                circle at bottom right,
                rgba(147,51,234,.22),
                transparent 45%
              )
            `;
    }
  }};
  }
`;
const CardBadge = styled.div<{
  variant: 'green' | 'purple' | 'hybrid';
}>`
  position: absolute;
  top: 15px;
  right: 15px;

  padding: 4px 10px;
  border-radius: 6px;

  font-family: 'Fira Code', monospace;
  font-size: .65rem;
  font-weight: 700;

  backdrop-filter: blur(8px);

  ${({ variant }) => {
    switch (variant) {
      case 'green':
        return `
          background: rgba(198,255,0,.08);
          border: 1px solid rgba(198,255,0,.35);
          color: #C6FF00;
        `;

      case 'purple':
        return `
          background: rgba(147,51,234,.10);
          border: 1px solid rgba(147,51,234,.35);
          color: #CFA5FF;
        `;

      case 'hybrid':
        return `
          background:
            linear-gradient(
              90deg,
              rgba(198,255,0,.10),
              rgba(147,51,234,.14)
            );

          border: 1px solid rgba(255,255,255,.12);
          color: white;
        `;
    }
  }}
`;
const NumericTag = styled.div<{
  variant: 'green' | 'purple' | 'hybrid';
}>`
   font-family: ${theme.fonts.secondary};
  font-size: .85rem;
  font-weight: 700;

  letter-spacing: .12em;

  display: inline-flex;
  align-items: center;
  gap: 8px;

  ${({ variant }) => {
    switch (variant) {

      case 'green':
        return `
          color: #C6FF00;
        `;

      case 'purple':
        return `
          color: #9333EA;
        `;

      case 'hybrid':
        return `
          background: linear-gradient(
            90deg,
            #C6FF00,
            #9333EA
          );

          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;

          filter:
            drop-shadow(
              0 0 8px rgba(198,255,0,.2)
            );
        `;
    }
  }}
`;
const ContentGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const CardTitle = styled.h3<{
  variant: 'green' | 'purple' | 'hybrid';
}>`
  font-family: ${theme.fonts.hero};
  font-size: 2rem;
letter-spacing: .12em;
  line-height: 1.1;

  ${({ variant }) => {
    switch (variant) {

      case 'green':
        return `
          color: #D8FF4D;

          text-shadow:
            0 0 12px rgba(198,255,0,.25);
        `;

      case 'purple':
        return `
          color: #CFA5FF;

          text-shadow:
            0 0 12px rgba(147,51,234,.25);
        `;

      case 'hybrid':
        return `
          background: linear-gradient(
            90deg,
            #C6FF00,
            #CFA5FF
          );

          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;

          filter:
            drop-shadow(
              0 0 10px rgba(255,255,255,.08)
            );
        `;
    }
  }}
`;
const CardDescription = styled.p`
  font-family: 'Space Grotesk', sans-serif;
  font-size: .95rem;
  line-height: 1.7;

  color: rgba(255,255,255,.88);
`;
const ButtonGroup = styled.div`
  margin-top: auto;
`;

const ActionButton = styled(motion.a) <{
  variant: 'green' | 'purple' | 'hybrid';
}>`
  width: 100%;
  padding: 16px 24px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;

  text-decoration: none;

  font-family: 'Fira Code', monospace;
  font-weight: 700;
  letter-spacing: .12em;
  text-transform: uppercase;

  background: rgba(0,0,0,.35);

  color:
    ${({ variant }) => {
    switch (variant) {
      case 'green':
        return '#C6FF00';

      case 'purple':
        return '#CFA5FF';

      case 'hybrid':
        return '#FFFFFF';
    }
  }};

  border:
    ${({ variant }) => {
    switch (variant) {
      case 'green':
        return '2px solid #C6FF00';

      case 'purple':
        return '2px solid #9333EA';

      case 'hybrid':
        return '2px solid transparent';
    }
  }};

  ${({ variant }) =>
    variant === 'hybrid' &&
    `
      background:
        linear-gradient(rgba(0,0,0,.35), rgba(0,0,0,.35)) padding-box,
        linear-gradient(90deg,#C6FF00,#9333EA) border-box;
    `}

  box-shadow:
    ${({ variant }) => {
    switch (variant) {
      case 'green':
        return 'none';

      case 'purple':
        return 'none';

      case 'hybrid':
        return '6px 6px 0 #9333EA';
    }
  }};

  transition: all .25s ease;

  &:hover {
    transform: translateY(-2px);

    color:
      ${({ variant }) => {
    switch (variant) {
      case 'green':
        return '#C6FF00';

      case 'purple':
        return '#E2C5FF';

      case 'hybrid':
        return '#FFFFFF';
    }
  }};

    box-shadow:
      ${({ variant }) => {
    switch (variant) {
      case 'green':
        return '0 0 20px rgba(198,255,0,.35)';

      case 'purple':
        return '0 0 20px rgba(147,51,234,.35)';

      case 'hybrid':
        return `
              10px 10px 0 #9333EA,
              0 0 25px rgba(198,255,0,.25)
            `;
    }
  }};
  }
`;
export default function Buttons() {



  return (


    <PathwayGrid
      as={motion.div}

      initial="hidden"
      animate="visible"
    >
      {/* Card 01 - PEÇAS PRONTAS (FEATURED) */}
      <PathwayCard
        variant="green"

        whileHover={{ y: -8, transition: { duration: 0.2 } }}
      >
        <CardBadge variant="green">PEÇAS LIMITADAS</CardBadge>
        <NumericTag variant="green">
          <Flame size={14} /> 01. DROP EXCLUSIVO
        </NumericTag>

        <ContentGroup>
          <CardTitle variant='green'>PRONTO PRA SESSAO</CardTitle>
          <CardDescription>
            Escolha entre as peças disponíveis do drop atual. Obras finalizadas, fotografadas e prontas para envio.
          </CardDescription>
        </ContentGroup>

        <ButtonGroup>
          <ActionButton
            variant="green"
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
        variant="purple"

        whileHover={{ y: -8, transition: { duration: 0.2 } }}
      >
        <CardBadge variant="purple">PERSONALIZÁVEL</CardBadge>
        <NumericTag variant="purple">
          <Sparkles size={14} /> 02. CUSTOMIZAÇÃO
        </NumericTag>

        <ContentGroup>
          <CardTitle variant='purple'>DO SEU JEITO</CardTitle>
          <CardDescription>
            Escolha um modelo e personalize cores, técnicas e detalhes para criar uma versão com a sua identidade.
          </CardDescription>
        </ContentGroup>

        <ButtonGroup>
          <Link to={"/agendamento"}>  <ActionButton
            variant="purple"
            href="https://wa.me/5599999999999?text=Olá!%20Gostaria%20de%20fazer%20uma%20customização%20na%20base%20da%20Nébula%20Glass."
            target="_blank"
            rel="noopener noreferrer"
            whileTap={{ scale: 0.98 }}
          >
            CUSTOMIZAR AGORA <ArrowRight size={16} />
          </ActionButton></Link>
        </ButtonGroup>
      </PathwayCard>

      {/* Card 03 - PROJETO AUTORAL */}
      <PathwayCard
        variant="hybrid"

        whileHover={{ y: -8, transition: { duration: 0.2 } }}
      >
        <CardBadge variant="hybrid">EXCLUSIVIDADE</CardBadge>
        <NumericTag variant="hybrid">
          <Paintbrush size={14} /> 03. PROJETO AUTORAL
        </NumericTag>

        <ContentGroup>
          <CardTitle variant='hybrid'>CRIE DO ZERO</CardTitle>
          <CardDescription>
            Tem uma ideia específica? Converse diretamente com o artista e desenvolva uma peça única, criada exclusivamente para você.
          </CardDescription>
        </ContentGroup>

        <ButtonGroup>
          <ActionButton
            variant="hybrid"
            href="https://wa.me/559691564908?text=Ol%C3%A1%21%20%F0%9F%91%8B%20Vim%20pelo%20site%20e%20tenho%20interesse%20em%20desenvolver%20um%20projeto%20autoral.%20Tenho%20uma%20ideia%20para%20uma%20pe%C3%A7a%20personalizada%20e%20gostaria%20de%20conversar%20sobre%20o%20design%2C%20materiais%2C%20prazo%20e%20or%C3%A7amento.%20Quando%20puder%2C%20me%20chame.%20Obrigado%21"
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