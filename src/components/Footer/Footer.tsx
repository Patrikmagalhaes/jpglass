import styled, { keyframes } from "styled-components";
import { Flame, Info, Mail, Sparkles, ExternalLink, ShieldAlert, ArrowRight, CheckCircle2 } from "lucide-react";
import { theme } from "../../styles/theme";
import { Link } from "react-router-dom";


// --- ANIMATIONS ---

const pulseGlow = keyframes`
  0%, 100% {
    opacity: 0.6;
    text-shadow: 0 0 10px rgba(182, 255, 0, 0.4), 0 0 20px rgba(171, 32, 253, 0.2);
  }
  50% {
    opacity: 1;
    text-shadow: 0 0 15px rgba(182, 255, 0, 0.7), 0 0 30px rgba(171, 32, 253, 0.5);
  }
`;

const borderPulse = keyframes`
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
`;


// --- STYLED COMPONENTS ---

const FooterContainer = styled.footer<{ $showSmoke?: boolean; $themeMode?: string }>`
  position: relative;
  background-color: #000000;
  color: #eeeeee;
  font-family: ${theme.fonts.secondary};
  padding: 80px 24px 30px 24px;
  overflow: hidden;
  border-top: 1px solid rgba(138, 43, 226, 0.15);
  box-sizing: border-top-box;
  width: 100%;

  @media (max-width: 768px) {
    padding: 60px 16px 24px 16px;
  }
`;

// Overlay to maintain perfect contrast over pure black
const FooterOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: transparent;
  z-index: 1;
  pointer-events: none;
`;

const SubtleGridPattern = styled.div`
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(138, 43, 226, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(138, 43, 226, 0.03) 1px, transparent 1px);
  background-size: 40px 40px;
  background-position: center bottom;
  z-index: 1;
  pointer-events: none;
`;

// --- Content Grid ---
const InnerContainer = styled.div`
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 60px;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 2.2fr 1fr 1.2fr 1.5fr;
  gap: 40px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    gap: 32px;
  }

  @media (max-width: 580px) {
    grid-template-columns: 1fr;
    gap: 36px;
  }
`;

// --- Logo and Description Info ---
const ArtistBrandColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const LogoTitle = styled.h2`
  font-family: ${theme.fonts.hero};
  font-size: clamp(32px, 4vw, 42px);
  color: #C7FF1A;
  letter-spacing: 2px;
  margin: 0;
  text-transform: uppercase;
  user-select: none;
  animation: ${pulseGlow} 4s infinite ease-in-out;
  display: inline-flex;
  align-items: center;
  gap: 12px;

  span {
    color: #7B2EFF;
    text-shadow: 0 0 10px rgba(171, 32, 253, 0.6);
  }
`;

const BrandSubtitle = styled.div`
  font-family: ${theme.fonts.secondary};
  font-weight: 800;
  font-size: 13px;
  letter-spacing: 4px;
  color: #7B2EFF;
  text-transform: uppercase;
  margin-top: -10px;
`;

const BrandDescription = styled.p`
  font-family: ${theme.fonts.secondary};
  font-size: 14px;
  line-height: 1.6;
  color: #9c92a6;
  margin: 0;
  max-width: 380px;

  strong {
    color: #eeeeee;
  }
`;

const BadgesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 14px;
`;

const ActionButton = styled.a`
  text-decoration: none;
  font-family: ${theme.fonts.secondary};
  font-weight: 700;
  font-size: 12.5px;
  padding: 12px 18px;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  text-transform: uppercase;
  letter-spacing: 1px;
  width: 100%;
  max-width: 280px;
  box-sizing: border-box;

  background: rgba(182, 255, 0, 0.04);
  border: 1px solid rgba(182, 255, 0, 0.25);
  color: #C7FF1A;

  &:hover {
    background: rgba(182, 255, 0, 0.12);
    border-color: #C7FF1A;
    box-shadow: 0 0 15px rgba(182, 255, 0, 0.3);
    transform: translateX(4px);
  }
`;

const CustomizationButton = styled(ActionButton)`
  background: rgba(171, 32, 253, 0.04);
  border-color: rgba(171, 32, 253, 0.25);
  color: #cc80ff;

  &:hover {
    background: rgba(171, 32, 253, 0.14);
    border-color: #7B2EFF;
    box-shadow: 0 0 15px rgba(171, 32, 253, 0.35);
    color: #ffffff;
    transform: translateX(4px);
  }
`;

const AutoralButton = styled(ActionButton)`
  background: linear-gradient(135deg, rgba(182, 255, 0, 0.04) 0%, rgba(171, 32, 253, 0.04) 100%);
  border-color: rgba(138, 43, 226, 0.25);
  color: #eddcfb;

  &:hover {
    background: linear-gradient(135deg, rgba(182, 255, 0, 0.12) 0%, rgba(171, 32, 253, 0.12) 100%);
    border-color: #ffffff;
    box-shadow: 0 0 20px rgba(182, 255, 0, 0.2), 0 0 20px rgba(171, 32, 253, 0.2);
    transform: translateX(4px);
  }
`;

// --- Column Containers & Headings ---
const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;
`;

const ColumnTitle = styled.h3`
  font-family: ${theme.fonts.secondary};
  font-weight: 700;
  font-size: 15px;
  letter-spacing: 2px;
  color: #ffffff;
  text-transform: uppercase;
  margin: 0;
  position: relative;
  display: inline-block;
  padding-bottom: 8px;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 32px;
    height: 2px;
    background: linear-gradient(90deg, #C7FF1A, #7B2EFF);
  }
`;

const LinkList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const LinkItem = styled.li`
  margin: 0;
`;

const StyledLink = styled.a`
  text-decoration: none;
  color: #a197ad;
  font-size: 14px;
  transition: all 0.2s ease-in-out;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;

  &:hover {
    color: #C7FF1A;
    transform: translateX(3px);
  }
`;

const StyledLinkStatic = styled.div`
  color: #a197ad;
  font-size: 14px;
  display: flex;
  align-items: flex-start;
  gap: 8px;
  line-height: 1.4;
`;

const HarmReductionIcon = styled.div`
  color: #7B2EFF;
  flex-shrink: 0;
  margin-top: 3px;
`;

// --- Socials / Actions ---
const CTAContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ActionText = styled.p`
  font-size: 13px;
  color: #9c92a6;
  margin: 0;
  line-height: 1.5;
`;

const InstagramCTA = styled.a`
  background: linear-gradient(135deg, rgba(182, 255, 0, 0.15) 0%, rgba(171, 32, 253, 0.15) 100%);
  border: 1px solid rgba(182, 255, 0, 0.3);
  color: #eeeeee;
  text-decoration: none;
  padding: 12px 18px;
  border-radius: 8px;
  font-weight: 500;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: translateY(-2px);
    border-color: #C7FF1A;
    box-shadow: 0 0 15px rgba(182, 255, 0, 0.25), 0 0 30px rgba(171, 32, 253, 0.1);
    color: #C7FF1A;
  }

  svg {
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: rotate(5deg) scale(1.1);
  }
`;

const ContactInfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 8px;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  color: #a197ad;

  span {
    color: #eeeeee;
  }
`;

const IconShell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(138, 43, 226, 0.1);
  color: #7B2EFF;
`;

// --- Divider Bar ---
const NeonDividerContainer = styled.div`
  position: relative;
  width: 100%;
  height: 2px;
  margin: 20px 0;
`;

const NeonDivider = styled.div`
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, #7B2EFF 0%, #C7FF1A 50%, #7B2EFF 100%);
  background-size: 200% auto;
  animation: ${borderPulse} 6s linear infinite;
  box-shadow: 0 0 8px rgba(182, 255, 0, 0.4), 0 0 12px rgba(171, 32, 253, 0.3);
`;

// --- Bottom Credits ---
const BottomContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
  flex-wrap: wrap;
  gap: 16px;

  @media (max-width: 640px) {
    flex-direction: column;
    text-align: center;
  }
`;

const CopyrightText = styled.span`
  font-size: 13px;
  color: #6c6276;
  font-weight: 400;

  span {
    color: #9c92a6;
  }
`;

const CreatorCredit = styled.div`
  font-size: 13px;
  color: #8c8296;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const CreatorLink = styled.a`
  color: #ffffff;
  text-decoration: none;
  font-weight: 700;
  letter-spacing: 0.5px;
  transition: all 0.25s ease-in-out;
  display: inline-flex;
  align-items: center;
  gap: 3px;
  border-bottom: 1px dashed rgba(255, 255, 255, 0.3);
  padding-bottom: 1px;

  &:hover {
    color: #C7FF1A;
    border-bottom-color: #C7FF1A;
    text-shadow: 0 0 8px rgba(182, 255, 0, 0.5);
  }

  span {
    color: #7B2EFF;
    font-weight: 900;
  }
`;

// --- INTERACTIVE FOOTER WRAPPER ---
// This ensures that the custom properties injected can control the look perfectly
export interface FooterProps {
  showSmoke?: boolean;
  themeMode?: "green-purple" | "acid" | "deep-dark";
}

export default function Footer({ showSmoke = true, themeMode = "green-purple" }: FooterProps) {


  return (
    <FooterContainer id="jp-glass-footer" $showSmoke={showSmoke} $themeMode={themeMode}>
      <SubtleGridPattern />
      <FooterOverlay />

      <InnerContainer>
        <FooterGrid>
          {/* Section 1: Marca & Descrição */}
          <ArtistBrandColumn>
            <div>
              <LogoTitle>
                JP <span>GLASS</span>
              </LogoTitle>
              <BrandSubtitle>Sopro de Vidro</BrandSubtitle>
            </div>

            <BrandDescription>
              Trabalho alquímico de <strong>borossilicato</strong> diretamente no maçarico.
              Arte nacional, artesanal e funcional que eleva e limpa a sua sessão de forma única.
              Pioneirismo no sopro artesanal de alta performance.
            </BrandDescription>

            <BadgesContainer>
              <ActionButton href="#portfolio">
                <Flame size={14} fill="#C7FF1A" /> Peças Prontas
              </ActionButton>
              <Link  to={"/agendamento"}>

                <CustomizationButton href="#como-adquirir">
                  <Sparkles size={14} /> Customização
                </CustomizationButton>
              </Link>
              <AutoralButton href="https://wa.me/559691564908?text=Ol%C3%A1%21%20%F0%9F%91%8B%20Vim%20pelo%20site%20e%20tenho%20interesse%20em%20desenvolver%20um%20projeto%20autoral.%20Tenho%20uma%20ideia%20para%20uma%20pe%C3%A7a%20personalizada%20e%20gostaria%20de%20conversar%20sobre%20o%20design%2C%20materiais%2C%20prazo%20e%20or%C3%A7amento.%20Quando%20puder%2C%20me%20chame.%20Obrigado%21"
                target="_blank"
                rel="noopener noreferrer">
                <ExternalLink size={14} /> Projeto Autoral
              </AutoralButton>
            </BadgesContainer>
          </ArtistBrandColumn>

          {/* Section 2: Navegação Rápida (Sitemap) */}
          <FooterColumn>
            <ColumnTitle>Navegação</ColumnTitle>
            <LinkList>
              <LinkItem>
                <StyledLink href="#inicio">
                  <ArrowRight size={12} /> Início
                </StyledLink>
              </LinkItem>
              <LinkItem>
                <StyledLink href="#como-adquirir">
                  <ArrowRight size={12} /> Como Adquirir
                </StyledLink>
              </LinkItem>
              <LinkItem>
                <StyledLink href="#sobre">
                  <ArrowRight size={12} /> Sobre o Artista
                </StyledLink>
              </LinkItem>
              <LinkItem>
                <StyledLink href="#portfolio">
                  <ArrowRight size={12} /> Portfólio de Peças
                </StyledLink>
              </LinkItem>
              <LinkItem>
                <StyledLink href="#galeria">
                  <ArrowRight size={12} /> Galeria de Gotas
                </StyledLink>
              </LinkItem>
            </LinkList>
          </FooterColumn>

          {/* Section 3: Redução de Danos & Dicas */}
          <FooterColumn>
            <ColumnTitle>Redução de Danos</ColumnTitle>
            <LinkList>
              <LinkItem>
                <StyledLinkStatic>
                  <HarmReductionIcon>
                    <ShieldAlert size={14} />
                  </HarmReductionIcon>
                  <span>Use piteiras longas e bongs de vidro para resfriar a fumaça de forma ideal.</span>
                </StyledLinkStatic>
              </LinkItem>
              <LinkItem>
                <StyledLinkStatic>
                  <HarmReductionIcon>
                    <Info size={14} />
                  </HarmReductionIcon>
                  <span>Limpeza com álcool isopropílico para retirar impurezas e preservar o sopro.</span>
                </StyledLinkStatic>
              </LinkItem>
              <LinkItem>
                <StyledLinkStatic>
                  <HarmReductionIcon>
                    <CheckCircle2 size={14} />
                  </HarmReductionIcon>
                  <span>O vidro borossilicato não solta toxinas e é neutro de sabor. Puro sabor.</span>
                </StyledLinkStatic>
              </LinkItem>
            </LinkList>
          </FooterColumn>

          {/* Section 4: Pedidos & Contatos */}
          <FooterColumn>
            <ColumnTitle>Encomendas & Drops</ColumnTitle>
            <CTAContainer>
              <ActionText>
                Solicite uma peça customizada ou faça parte no próximo Drop clicando abaixo:
              </ActionText>

              <InstagramCTA href="https://www.instagram.com/jp.__.glass/" target="_blank" rel="noopener noreferrer">

                <span>Seguir @JP.__.GLASS</span>
                <ExternalLink size={12} />
              </InstagramCTA>

              <ContactInfoList>
                <ContactItem>
                  <IconShell>
                    <Flame size={14} />
                  </IconShell>
                  <div>Atelier: <span>Pato Branco - PR</span></div>
                </ContactItem>
                <ContactItem>
                  <IconShell>
                    <Mail size={14} />
                  </IconShell>
                  <div>E-mail: <span>jpglass.26@gmail.com</span></div>
                </ContactItem>
              </ContactInfoList>
            </CTAContainer>
          </FooterColumn>
        </FooterGrid>

        {/* Divider Glow */}
        <NeonDividerContainer>
          <NeonDivider />
        </NeonDividerContainer>

        {/* Bottom Credits */}
        <BottomContainer>
          <CopyrightText>
            © {new Date().getFullYear()} <span>JP Glass</span>. Todos os direitos reservados. Arte em Borossilicato de alta resistência.
          </CopyrightText>

          <CreatorCredit>
            <span>Feito com brisa por </span>
            <CreatorLink href="https://www.instagram.com/patrik.zip" target="_blank" rel="noopener noreferrer">
              patrik<span>.zip</span> <ExternalLink size={11} style={{ marginLeft: "1px" }} />
            </CreatorLink>
          </CreatorCredit>
        </BottomContainer>
      </InnerContainer>
    </FooterContainer>
  );
}
