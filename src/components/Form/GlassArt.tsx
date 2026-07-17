/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import styled from 'styled-components';

interface GlassArtProps {
  type: 'cuia' | 'pote' | 'piteira' | 'implosion' | 'anel' | 'double-reverse' | 'reverse' | 'rewig' | 'base-flor' | 'opala';
  className?: string;
  active?: boolean;
}

interface StyledSvgProps {
  $active: boolean;
}

const StyledSvg = styled.svg<StyledSvgProps>`
  width: 100%;
  height: 100%;
  transition: all 0.3s ease-in-out;
  filter: ${props => props.$active ? 'drop-shadow(0 0 8px rgba(52, 211, 153, 0.5))' : 'none'};

  .main-path {
    stroke: ${props => props.$active ? '#34d399' : '#71717a'};
    fill: ${props => props.$active ? 'rgba(16, 185, 129, 0.1)' : 'rgba(39, 39, 42, 0.2)'};
    stroke-width: 3.5;
    stroke-linecap: round;
  }

  .main-ellipse {
    stroke: ${props => props.$active ? '#34d399' : '#71717a'};
    stroke-width: 2.5;
  }

  .accent-path-1 {
    stroke: ${props => props.$active ? 'rgba(16, 185, 129, 0.4)' : 'rgba(82, 82, 91, 0.3)'};
    stroke-width: 1.5;
    stroke-dasharray: 3 3;
  }

  .accent-path-2 {
    stroke: ${props => props.$active ? 'rgba(16, 185, 129, 0.6)' : 'rgba(82, 82, 91, 0.4)'};
    stroke-width: 1.5;
  }

  .handle-circle {
    fill: ${props => props.$active ? '#34d399' : '#52525b'};
  }

  .jar-rect {
    stroke: ${props => props.$active ? '#34d399' : '#71717a'};
    fill: ${props => props.$active ? 'rgba(16, 185, 129, 0.1)' : 'rgba(39, 39, 42, 0.2)'};
    stroke-width: 2.5;
  }

  .jar-lid {
    stroke: ${props => props.$active ? '#86efac' : '#a1a1aa'};
    stroke-width: 3;
    stroke-linecap: round;
  }

  .jar-reflection-1 {
    stroke: ${props => props.$active ? 'rgba(52, 211, 147, 0.3)' : 'rgba(63, 63, 70, 0.2)'};
    stroke-width: 2;
    stroke-linecap: round;
  }

  .jar-reflection-2 {
    stroke: ${props => props.$active ? 'rgba(52, 211, 147, 0.15)' : 'rgba(63, 63, 70, 0.1)'};
    stroke-width: 1.5;
    stroke-linecap: round;
  }

  .piteira-rect {
    stroke: ${props => props.$active ? '#34d399' : '#71717a'};
    fill: ${props => props.$active ? 'rgba(16, 185, 129, 0.1)' : 'rgba(39, 39, 42, 0.2)'};
    stroke-width: 3.5;
  }

  .piteira-restrictor {
    stroke: ${props => props.$active ? '#34d399' : '#71717a'};
    stroke-width: 2;
  }

  .piteira-spiral {
    stroke: ${props => props.$active ? 'rgba(52, 211, 147, 0.5)' : 'rgba(82, 82, 91, 0.3)'};
    stroke-width: 1.5;
    stroke-linecap: round;
  }

  .implosion-circle {
    stroke: ${props => props.$active ? '#34d399' : '#71717a'};
    fill: ${props => props.$active ? 'rgba(16, 185, 129, 0.1)' : 'rgba(39, 39, 42, 0.2)'};
    stroke-width: 3.5;
  }

  .implosion-stem {
    stroke: ${props => props.$active ? '#34d399' : '#71717a'};
    stroke-width: 2.5;
  }

  .implosion-center {
    fill: ${props => props.$active ? '#34d399' : '#71717a'};
  }

  .implosion-ray {
    stroke: ${props => props.$active ? '#34d399' : '#71717a'};
    stroke-width: 2;
  }

  .implosion-petal {
    stroke: ${props => props.$active ? 'rgba(52, 211, 147, 0.75)' : '#52525b'};
    stroke-width: 1.5;
  }

  .anel-rect {
    stroke: ${props => props.$active ? '#34d399' : '#71717a'};
    stroke-width: 2.5;
  }

  .anel-ring {
    stroke: ${props => props.$active ? '#34d399' : '#71717a'};
    fill: ${props => props.$active ? 'rgba(16, 185, 129, 0.1)' : 'rgba(39, 39, 42, 0.2)'};
    stroke-width: 3.5;
  }

  .anel-bridge {
    stroke: ${props => props.$active ? '#34d399' : '#71717a'};
    stroke-width: 3.5;
  }

  .spiral-circle {
    stroke: ${props => props.$active ? 'rgba(16, 185, 129, 0.3)' : '#3f3f46'};
    stroke-width: 2;
  }

  .spiral-line-1 {
    stroke: ${props => props.$active ? '#34d399' : '#71717a'};
    stroke-width: 3;
    stroke-linecap: round;
  }

  .spiral-line-2 {
    stroke: ${props => props.$active ? '#86efac' : '#52525b'};
    stroke-width: 2;
    stroke-linecap: round;
  }

  .reverse-spiral-1 {
    stroke: ${props => props.$active ? '#34d399' : '#71717a'};
    fill: ${props => props.$active ? 'rgba(16, 185, 129, 0.05)' : 'none'};
    stroke-width: 2.5;
  }

  .reverse-spiral-2 {
    stroke: ${props => props.$active ? '#86efac' : '#52525b'};
    stroke-width: 1.5;
  }

  .rewig-zigzag-1 {
    stroke: ${props => props.$active ? '#34d399' : '#71717a'};
    stroke-width: 3;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .rewig-zigzag-2 {
    stroke: ${props => props.$active ? '#86efac' : '#52525b'};
    stroke-width: 1.5;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .base-flor-ellipse {
    stroke: ${props => props.$active ? '#34d399' : '#71717a'};
    fill: ${props => props.$active ? 'rgba(16, 185, 129, 0.1)' : 'rgba(39, 39, 42, 0.2)'};
    stroke-width: 3;
  }

  .base-flor-stem {
    stroke: ${props => props.$active ? '#34d399' : '#71717a'};
    stroke-width: 2.5;
  }

  .base-flor-center {
    fill: ${props => props.$active ? '#34d399' : '#71717a'};
  }

  .base-flor-petal {
    stroke: ${props => props.$active ? '#34d399' : '#52525b'};
    stroke-width: 1.5;
  }

  .opala-shape {
    stroke: ${props => props.$active ? '#34d399' : '#71717a'};
    fill: ${props => props.$active ? 'rgba(16, 185, 129, 0.1)' : 'rgba(39, 39, 42, 0.2)'};
    stroke-width: 3;
    stroke-linejoin: round;
  }

  .opala-line {
    stroke: ${props => props.$active ? '#86efac' : '#52525b'};
    stroke-width: 1.5;
  }
`;

const SvgWrapper = styled.div`
  width: 96px;
  height: 96px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &.small {
    width: 56px;
    height: 56px;
  }
`;

export const GlassArt: React.FC<GlassArtProps> = ({ type, className = "", active = false }) => {
  const isSmall = className.includes('w-14');
  return (
    <SvgWrapper className={isSmall ? "small" : ""}>
      <StyledSvg $active={active} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {type === 'cuia' && (
          <>
            <path d="M15 45 C15 75, 85 75, 85 45" className="main-path" />
            <ellipse cx="50" cy="45" rx="35" ry="8" className="main-ellipse" />
            <path d="M25 55 C35 70, 65 70, 75 55" className="accent-path-1" />
            <path d="M35 62 C42 72, 58 72, 65 62" className="accent-path-2" />
            <circle cx="50" cy="74" r="3" className="handle-circle" />
          </>
        )}

        {type === 'pote' && (
          <>
            <path d="M30 35 H70 V75 C70 82, 65 85, 50 85 C35 85, 30 82, 30 75 V35 Z" className="jar-rect" />
            <rect x="36" y="25" width="28" height="10" rx="2" className="main-ellipse" />
            <path d="M32 25 C32 20, 68 20, 68 25" className="jar-lid" />
            <path d="M40 45 V75" className="jar-reflection-1" />
            <path d="M60 45 V65" className="jar-reflection-2" />
          </>
        )}

        {type === 'piteira' && (
          <>
            <rect x="20" y="42" width="60" height="16" rx="4" className="piteira-rect" />
            <path d="M45 42 C45 48, 55 48, 55 42" className="piteira-restrictor" />
            <path d="M45 58 C45 52, 55 52, 55 58" className="piteira-restrictor" />
            <path d="M25 50 Q32 46, 38 50 T50 50 T62 50 T74 50" className="piteira-spiral" />
          </>
        )}

        {type === 'implosion' && (
          <>
            <circle cx="50" cy="50" r="30" className="implosion-circle" />
            <path d="M42 78 L45 92 H55 L58 78" className="implosion-stem" />
            <circle cx="50" cy="50" r="4" className="implosion-center" />
            <path d="M50 30 V42" className="implosion-ray" />
            <path d="M50 58 V70" className="implosion-ray" />
            <path d="M30 50 H42" className="implosion-ray" />
            <path d="M58 50 H70" className="implosion-ray" />
            <path d="M36 36 L44 44" className="implosion-petal" />
            <path d="M64 64 L56 56" className="implosion-petal" />
            <path d="M36 64 L44 56" className="implosion-petal" />
            <path d="M64 36 L56 44" className="implosion-petal" />
          </>
        )}

        {type === 'anel' && (
          <>
            <rect x="22" y="15" width="16" height="36" rx="3" className="anel-rect" />
            <circle cx="50" cy="62" r="22" className="anel-ring" />
            <path d="M38 38 Q50 45, 50 50" className="anel-bridge" />
          </>
        )}

        {type === 'double-reverse' && (
          <>
            <circle cx="50" cy="50" r="35" className="spiral-circle" />
            <path d="M20 35 Q40 50, 80 65" className="spiral-line-1" />
            <path d="M20 65 Q40 50, 80 35" className="spiral-line-1" />
            <path d="M35 20 Q50 40, 65 80" className="spiral-line-2" />
            <path d="M65 20 Q50 40, 35 80" className="spiral-line-2" />
          </>
        )}

        {type === 'reverse' && (
          <>
            <circle cx="50" cy="50" r="35" className="spiral-circle" />
            <path d="M15 50 Q50 15, 85 50 T50 85 Z" className="reverse-spiral-1" />
            <path d="M30 50 Q50 30, 70 50 T50 70 Z" className="reverse-spiral-2" />
          </>
        )}

        {type === 'rewig' && (
          <>
            <circle cx="50" cy="50" r="35" className="spiral-circle" />
            <path d="M20 50 L30 35 L45 65 L60 35 L70 65 L80 50" className="rewig-zigzag-1" />
            <path d="M22 58 L32 43 L45 73 L58 43 L68 73 L78 58" className="rewig-zigzag-2" />
          </>
        )}

        {type === 'base-flor' && (
          <>
            <ellipse cx="50" cy="70" rx="35" ry="15" className="base-flor-ellipse" />
            <path d="M50 45 V70" className="base-flor-stem" />
            <circle cx="50" cy="70" r="6" className="base-flor-center" />
            <path d="M25 68 C35 60, 45 75, 50 70" className="base-flor-petal" />
            <path d="M75 68 C65 60, 55 75, 50 70" className="base-flor-petal" />
          </>
        )}

        {type === 'opala' && (
          <>
            <path d="M50 15 L80 40 L50 85 L20 40 Z" className="opala-shape" />
            <path d="M50 15 V85" className="opala-line" />
            <path d="M20 40 H80" className="opala-line" />
            <path d="M20 40 L50 55 L80 40" className="opala-line" />
          </>
        )}
      </StyledSvg>
    </SvgWrapper>
  );
};
