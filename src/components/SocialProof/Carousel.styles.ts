import styled, { keyframes, css } from 'styled-components';


export const flowGlow = keyframes`
  0% { box-shadow: 0 0 10px rgba(0, 229, 255, 0.2), 0 0 20px rgba(0, 100, 250, 0.1); }
  50% { box-shadow: 0 0 25px rgba(0, 229, 255, 0.6), 0 0 40px rgba(0, 150, 250, 0.3); }
  100% { box-shadow: 0 0 10px rgba(0, 229, 255, 0.2), 0 0 20px rgba(0, 100, 250, 0.1); }
`;

export const trackShift = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

export const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 3rem 1rem;
`;

export const CarouselContainer = styled.div`
  width: 100%;
  max-width: 1400px;
  position: relative;
  overflow: hidden;
  padding: 2rem 0;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: 160px;
    z-index: 10;
    pointer-events: none;
  }

  &::before {
    left: 0;
    background: linear-gradient(to right, #050508 10%, rgba(5, 5, 8, 0) 100%);
  }

  &::after {
    right: 0;
    background: linear-gradient(to left, #050508 10%, rgba(5, 5, 8, 0) 100%);
  }

  @media (max-width: 768px) {
    &::before,
    &::after {
      width: 60px;
    }
  }
`;

export const Track = styled.div<{ $isPaused: boolean; $speedSeconds: number }>`
  display: flex;
  width: max-content;
  gap: 1.5rem;
  animation: ${trackShift} ${props => props.$speedSeconds}s linear infinite;
  animation-play-state: ${props => props.$isPaused ? 'paused' : 'running'};
`;

export const CardWrapper = styled.div<{ $isHighlighted?: boolean }>`
  width: 280px;
  height: 380px;
  position: relative;
  border-radius: 1.25rem;
  overflow: hidden;
  background: #0d0d11;
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);
  flex-shrink: 0;

  ${props => props.$isHighlighted && css`
    border: 2px solid #00e5ff;
    animation: ${flowGlow} 3s infinite ease-in-out;
  `}

  &:hover {
    transform: translateY(-10px) scale(1.02);
    border-color: ${props => props.$isHighlighted ? '#00e5ff' : 'rgba(255, 255, 255, 0.25)'};
    box-shadow: ${props => props.$isHighlighted 
      ? '0 15px 35px rgba(0, 229, 255, 0.4)' 
      : '0 15px 30px rgba(0, 0, 0, 0.5), 0 0 15px rgba(255, 255, 255, 0.05)'};
  }
`;

export const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

export const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.8s ease;

  ${CardWrapper}:hover & {
    transform: scale(1.08);
  }
`;

export const CardVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.8s ease;

  ${CardWrapper}:hover & {
    transform: scale(1.08);
  }
`

export const GlassGleam = styled.div`
  position: absolute;
  top: 0;
  left: -75%;
  width: 50%;
  height: 100%;
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.15) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  transform: skewX(-25deg);
  transition: 0.75s;
  pointer-events: none;

  ${CardWrapper}:hover & {
    left: 125%;
  }
`;

export const DarkOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(10, 10, 14, 0.1) 0%,
    rgba(10, 10, 14, 0.4) 60%,
    rgba(10, 10, 14, 0.95) 100%
  );
  transition: opacity 0.5s ease;

  ${CardWrapper}:hover & {
    background: linear-gradient(
      to bottom,
      rgba(10, 10, 14, 0.0) 0%,
      rgba(10, 10, 14, 0.3) 50%,
      rgba(10, 10, 14, 0.92) 100%
    );
  }
`;

export const BlueGlowRing = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 1.25rem;
  border: 4px solid transparent;
  pointer-events: none;
  transition: border-color 0.4s ease;

  ${CardWrapper}:hover & {
    border-color: rgba(0, 229, 255, 0.15);
  }
`;

export const TagChip = styled.div<{ $isBlue?: boolean }>`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: ${props => props.$isBlue ? 'rgba(0, 229, 255, 0.25)' : 'rgba(255, 255, 255, 0.07)'};
  border: 1px solid ${props => props.$isBlue ? '#00e5ff' : 'rgba(255, 255, 255, 0.1)'};
  backdrop-filter: blur(8px);
  padding: 0.35rem 0.75rem;
  border-radius: 2rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  font-weight: 500;
  color: ${props => props.$isBlue ? '#00e5ff' : '#e4e4e7'};
  display: flex;
  align-items: center;
  gap: 0.35rem;
  z-index: 10;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
`;

export const ContentOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.25rem;
  z-index: 5;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const UserLine = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  color: #a1a1aa;
`;



export const BadgesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
  align-items: center;
  margin-top: 1.5rem;
  width: 100%;
  max-width: 900px;
`;

export const TrustBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(0, 229, 255, 0.04);
  border: 1px solid rgba(0, 229, 255, 0.12);
  border-radius: 1.25rem;
  padding: 0.5rem 1rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.78rem;
  color: #e4e4e7;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: all 0.25s ease;

  &:hover {
    border-color: #00e5ff;
    background: rgba(0, 229, 255, 0.08);
    transform: translateY(-1px);
  }
`;
