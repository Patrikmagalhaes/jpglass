import { Flame } from "lucide-react";
import styled, { keyframes } from "styled-components";
import { theme } from "../../styles/theme";

export const slideDown = keyframes`
  from { transform: translateY(-20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

export const pulseFlame = keyframes`
  0%, 100% { transform: scale(1); filter: drop-shadow(0 0 2px #ff3d00); }
  50% { transform: scale(1.15); filter: drop-shadow(0 0 10px #ffea00); }
`;

export const PageContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  position: relative;
  overflow: hidden;
  padding-bottom: 5rem;
`;

// Subtle grid background layout


export const HeaderNav = styled.header`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 1.5rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 10;
  animation: ${slideDown} 0.6s cubic-bezier(0.16, 1, 0.3, 1);
`;

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const LogoText = styled.div`
  font-family: 'JetBrains Mono', monospace;
  font-weight: 800;
  font-size: 1.25rem;
  color: #ffffff;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  background: linear-gradient(90deg, #ffffff 0%, #00e5ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const FireIndicator = styled(Flame)`
  color: #ff512f;
  width: 20px;
  height: 20px;
  animation: ${pulseFlame} 1.5s infinite ease-in-out;
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
`;

export const SocialLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #a1a1aa;
  text-decoration: none;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.78rem;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 2rem;
  transition: all 0.25s;

  &:hover {
    color: #00e5ff;
    border-color: #00e5ff;
    background: rgba(0, 229, 255, 0.08);
    transform: translateY(-1px);
  }
`;

export const ShowcaseSection = styled.section`
  width: 100%;
  max-width: 1200px;
  margin: 4.5rem auto 1.5rem auto;
  padding: 0 2rem;
  text-align: center;
  position: relative;
  z-index: 5;
`;

export const HeadBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(0, 229, 255, 0.08);
  border: 1px solid rgba(0, 229, 255, 0.18);
  padding: 0.4rem 1rem;
  border-radius: 2rem;
  scolor: #7B2EFF;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
`;

// graffiti-stylized typography mapping
export const MainHeadline = styled.h2`
  font-family: ${theme.fonts.hero};
  font-size: clamp(4rem, 5vw, 6rem);
  color: #ffffff;
  line-height: 1.15;



  @media (max-width: 768px) {
    font-size: 2.38rem;
  }
`;

// monospace-clean body mapping
export const EditorialSubtext = styled.p`
  font-family: ${theme.fonts.secondary};
  font-size: clamp(0.95rem, 1.1vw, 1.2rem);
  color: #a1a1aa;
  max-width: 720px;
  margin: 0 auto ;
  line-height: 1.7;

  @media (max-width: 768px) {
    font-size: 0.88rem;
  }
`;

// Elegant brand watermark in structural background
export const WatermarkSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  pointer-events: none;
  padding: 1rem 0;
  margin-top: 4rem;
  opacity: 0.03;
`;

export const WatermarkBig = styled.span`
  font-family: 'Permanent Marker', cursive;
  font-size: 10rem;
  color: #ffffff;
  letter-spacing: 0.1em;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 4rem;
  }
`;

export const StyledFooter = styled.footer`
  width: 100%;
  max-width: 1200px;
  margin: 3rem auto 0 auto;
  border-top: 1px solid rgba(255,255,255,0.04);
  padding: 2.5rem 2rem 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #71717a;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  position: relative;
  z-index: 5;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
    text-align: center;
  }
`;

export const RightCredits = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  align-items: flex-end;

  @media (max-width: 768px) {
    align-items: center;
  }
`;
