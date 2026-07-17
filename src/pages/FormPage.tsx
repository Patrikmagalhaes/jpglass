/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useReducer, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import styled from 'styled-components';
import {
  TIPOS,
  MODELOS,
  TECNICAS,
  TAMANHOS,
  ESPESSURAS,
  ADICIONAIS,
  type PedidoState,
  type TipoPeca,
  type Modelo,
  type Tecnica,
  type Tamanho,
  type Espessura,
  type Contato
} from '../types';
import { GlassArt } from '../components/Form/GlassArt';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  MessageSquare,
  Edit2,
  Sparkles,
  Info
} from 'lucide-react';

// Form actions
type CustomizerAction =
  | { type: 'SET_TIPO'; payload: TipoPeca }
  | { type: 'SET_MODELO'; payload: Modelo }
  | { type: 'SET_TECNICA'; payload: Tecnica }
  | { type: 'SET_TAMANHO'; payload: Tamanho }
  | { type: 'SET_ESPESSURA'; payload: Espessura }
  | { type: 'TOGGLE_ADICIONAL'; payload: { adicionalId: string; variacaoId?: string } }
  | { type: 'SET_OBSERVACOES'; payload: string }
  | { type: 'SET_CONTATO'; payload: Partial<Contato> }
  | { type: 'PREV_STEP' }
  | { type: 'NEXT_STEP' }
  | { type: 'GO_TO_STEP'; payload: number }
  | { type: 'LOAD_QUERY'; payload: TipoPeca }
  | { type: 'RESET' };

const initialState: PedidoState = {
  stepIndex: 0,
  tipo: undefined,
  modelo: undefined,
  tecnica: undefined,
  tamanho: undefined,
  espessura: undefined,
  adicionaisSelecionados: [],
  extras: { observacoes: '' },
  contato: { nome: '', whatsapp: '', cidade: '' },
};

function customizerReducer(state: PedidoState, action: CustomizerAction): PedidoState {
  switch (action.type) {
    case 'LOAD_QUERY': {
      if (state.tipo?.id === action.payload.id) return state;
      return {
        ...initialState,
        tipo: action.payload,
        stepIndex: 1,
      };
    }
    case 'SET_TIPO': {
      if (state.tipo?.id === action.payload.id) {
        return {
          ...state,
          stepIndex: 1,
        };
      }
      return {
        ...state,
        tipo: action.payload,
        modelo: undefined,
        tecnica: undefined,
        tamanho: undefined,
        espessura: undefined,
        adicionaisSelecionados: [],
        stepIndex: 1,
      };
    }
    case 'SET_MODELO':
      return {
        ...state,
        modelo: action.payload,
        stepIndex: state.stepIndex + 1,
      };
    case 'SET_TECNICA':
      return {
        ...state,
        tecnica: action.payload,
        stepIndex: state.stepIndex + 1,
      };
    case 'SET_TAMANHO':
      return {
        ...state,
        tamanho: action.payload,
        stepIndex: state.tipo?.id === 'piteira' ? state.stepIndex : state.stepIndex + 1,
      };
    case 'SET_ESPESSURA':
      return {
        ...state,
        espessura: action.payload,
      };
    case 'TOGGLE_ADICIONAL': {
      const { adicionalId, variacaoId } = action.payload;
      const index = state.adicionaisSelecionados.findIndex(a => a.adicionalId === adicionalId);
      
      let updated = [...state.adicionaisSelecionados];
      if (index > -1) {
        if (updated[index].variacaoId === variacaoId) {
          updated.splice(index, 1);
        } else {
          updated[index] = { adicionalId, variacaoId };
        }
      } else {
        updated.push({ adicionalId, variacaoId });
      }
      return {
        ...state,
        adicionaisSelecionados: updated,
      };
    }
    case 'SET_OBSERVACOES':
      return {
        ...state,
        extras: { ...state.extras, observacoes: action.payload },
      };
    case 'SET_CONTATO':
      return {
        ...state,
        contato: { ...state.contato, ...action.payload },
      };
    case 'PREV_STEP':
      return {
        ...state,
        stepIndex: Math.max(0, state.stepIndex - 1),
      };
    case 'NEXT_STEP':
      return {
        ...state,
        stepIndex: state.stepIndex + 1,
      };
    case 'GO_TO_STEP':
      return {
        ...state,
        stepIndex: action.payload,
      };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

function formatBrazilianPhone(value: string): string {
  const digits = value.replace(/\D/g, '');
  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
}

// Styled Components
const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #09090b;
  color: #f4f4f5;
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
  }

  &::selection {
    background-color: #10b981;
    color: #000000;
  }
`;

const Sidebar = styled.div`
  width: 100%;
  background-color: #18181b;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 24px;
  flex-shrink: 0;

  @media (min-width: 768px) {
    width: 320px;
    border-right: 1px solid #27272a;
  }
`;

const BrandContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 32px;
`;

const BrandIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background-color: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #34d399;
  font-weight: 700;
`;

const BrandTitle = styled.h2`
  font-size: 14px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin: 0;
`;

const BrandSubtitle = styled.p`
  font-size: 10px;
  color: #71717a;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin: 0;
`;

const ProgressContainer = styled.div`
  margin-bottom: 24px;
`;

const ProgressInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  color: #a1a1aa;
  margin-bottom: 8px;
`;

const ProgressLabel = styled.span`
  font-weight: 600;
  text-transform: uppercase;
  color: #34d399;
  letter-spacing: 0.05em;
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 6px;
  background-color: #27272a;
  border-radius: 9999px;
  overflow: hidden;
`;

const ProgressBarFill = styled.div<{ $width: number }>`
  height: 100%;
  background: linear-gradient(to right, #10b981, #2dd4bf);
  border-radius: 9999px;
  width: ${props => props.$width}%;
  transition: width 0.3s ease-in-out;
`;

const RoadmapsContainer = styled.div`
  display: none;

  @media (min-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 32px;
  }
`;

interface RoadmapItemProps {
  $active: boolean;
  $completed: boolean;
}

const RoadmapItem = styled.div<RoadmapItemProps>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 6px 10px;
  border-radius: 8px;
  font-size: 12px;
  transition: all 0.25s ease-in-out;
  border: 1px solid transparent;

  ${props => props.$active && `
    background-color: rgba(16, 185, 129, 0.1);
    border-color: rgba(16, 185, 129, 0.2);
    color: #34d399;
    font-weight: 700;
  `}

  ${props => props.$completed && `
    color: #a1a1aa;
    cursor: pointer;
    &:hover {
      color: #86efac;
    }
  `}

  ${props => !props.$active && !props.$completed && `
    color: #52525b;
    pointer-events: none;
  `}
`;

const StepBadge = styled.div<RoadmapItemProps>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 10px;
  border: 1px solid;
  transition: all 0.25s ease-in-out;

  ${props => props.$active && `
    border-color: #34d399;
    background-color: #10b981;
    color: #09090b;
  `}

  ${props => props.$completed && `
    border-color: rgba(16, 185, 129, 0.3);
    background-color: rgba(9, 9, 11, 0.4);
    color: #34d399;
  `}

  ${props => !props.$active && !props.$completed && `
    border-color: #27272a;
    background-color: #09090b;
    color: #52525b;
  `}
`;

const InfoNote = styled.div`
  margin-top: 32px;
  padding: 14px;
  background-color: rgba(9, 9, 11, 0.4);
  border-radius: 12px;
  border: 1px solid rgba(39, 39, 42, 0.6);
  font-size: 11px;
  color: #71717a;
  line-height: 1.6;
  display: flex;
  gap: 10px;
  align-items: start;
`;

const ContentPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const HeaderContainer = styled.div`
  padding: 24px;
  border-bottom: 1px solid #18181b;
  background-color: rgba(9, 9, 11, 0.3);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HeaderTitle = styled.h1`
  font-size: 20px;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: -0.025em;
  margin: 0;

  @media (min-width: 768px) {
    font-size: 24px;
  }
`;

const HeaderDescription = styled.p`
  font-size: 12px;
  color: #71717a;
  margin-top: 4px;
  margin-bottom: 0;
`;

const CenterContainer = styled.div`
  flex: 1;
  padding: 24px;
  max-width: 896px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: 768px) {
    padding: 40px;
  }
`;

const SelectionContainer = styled.div`
  width: 100%;
`;

const TipoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

interface CardProps {
  $selected: boolean;
}

const SelectionCard = styled.div<CardProps>`
  border-radius: 16px;
  border: 1px solid;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;

  ${props => props.$selected ? `
    background-color: rgba(16, 185, 129, 0.05);
    border-color: #34d399;
    box-shadow: 0 0 15px rgba(52, 211, 153, 0.1);
  ` : `
    background-color: #18181b;
    border-color: #27272a;
    
    &:hover {
      border-color: #3f3f46;
      background-color: rgba(24, 24, 27, 0.8);
    }
  `}
`;

const ArtPreviewWrapper = styled.div`
  padding: 16px;
  background-color: #09090b;
  border-radius: 12px;
  border: 1px solid #27272a;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  transition: border-color 0.25s ease-in-out;

  ${SelectionCard}:hover & {
    border-color: #3f3f46;
  }
`;

const CardTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: #ffffff;
  margin-top: 0;
  margin-bottom: 8px;
`;

const CardTitleLarge = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #ffffff;
  margin-top: 0;
  margin-bottom: 8px;
`;

const CardDescription = styled.p`
  color: #a1a1aa;
  font-size: 12px;
  line-height: 1.625;
  margin: 0;
`;

const CardFooter = styled.div`
  margin-top: 20px;
  width: 100%;
`;

const CardButton = styled.div<CardProps>`
  width: 100%;
  padding: 8px 12px;
  border-radius: 12px;
  border: 1px solid;
  font-size: 12px;
  font-weight: 700;
  transition: all 0.25s ease-in-out;
  text-align: center;

  ${props => props.$selected ? `
    background-color: #10b981;
    color: #09090b;
    border-color: #34d399;
  ` : `
    background-color: transparent;
    color: #a1a1aa;
    border-color: #27272a;

    ${SelectionCard}:hover & {
      border-color: #3f3f46;
      color: #e4e4e7;
    }
  `}
`;

const ModeloGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const TecnicaList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  max-width: 672px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
`;

const TecnicaListItem = styled.div<CardProps>`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px;
  border-radius: 16px;
  border: 1px solid;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  ${props => props.$selected ? `
    background-color: rgba(16, 185, 129, 0.05);
    border-color: #34d399;
    box-shadow: 0 0 15px rgba(52, 211, 153, 0.1);
  ` : `
    background-color: #18181b;
    border-color: #27272a;

    &:hover {
      border-color: #3f3f46;
      background-color: rgba(24, 24, 27, 0.8);
    }
  `}
`;

const TecnicaPreview = styled.div`
  padding: 8px;
  background-color: #09090b;
  border-radius: 12px;
  border: 1px solid #27272a;
  flex-shrink: 0;
`;

const CheckBadge = styled.div<CardProps>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.25s ease-in-out;

  ${props => props.$selected ? `
    background-color: #10b981;
    border-color: #34d399;
    color: #09090b;
  ` : `
    border-color: #27272a;
    color: #52525b;

    ${TecnicaListItem}:hover & {
      color: #d4d4d8;
    }
  `}
`;

const TecnicaContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const TecnicaTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: #ffffff;
  margin-top: 0;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ActiveIndicatorGlow = styled.span`
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #34d399;
`;

const TamanhoContainer = styled.div`
  max-width: 576px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
`;

const SectionHeader = styled.h3`
  font-size: 14px;
  font-weight: 700;
  color: #34d399;
  margin-top: 0;
  margin-bottom: 16px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  display: flex;
  align-items: center;
  gap: 8px;

  &::after {
    content: '';
    height: 1px;
    background-color: #27272a;
    flex: 1;
  }
`;

const TamanhoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-bottom: 32px;
`;

const TamanhoItem = styled.div<CardProps>`
  padding: 16px;
  border-radius: 12px;
  border: 1px solid;
  cursor: pointer;
  transition: all 0.25s ease-in-out;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${props => props.$selected ? `
    background-color: rgba(16, 185, 129, 0.05);
    border-color: #34d399;
    box-shadow: 0 0 10px rgba(52, 211, 153, 0.05);
    color: #ffffff;
  ` : `
    background-color: #18181b;
    border-color: #27272a;
    color: #d4d4d8;

    &:hover {
      border-color: #3f3f46;
    }
  `}
`;

const SmallRadioCircle = styled.div<CardProps>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.25s ease-in-out;

  ${props => props.$selected ? `
    background-color: #10b981;
    border-color: #34d399;
    color: #09090b;
  ` : `
    border-color: #27272a;
  `}
`;

const EspessuraGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
`;

const EspessuraCard = styled.div<CardProps>`
  padding: 16px;
  border-radius: 12px;
  border: 1px solid;
  cursor: pointer;
  text-align: center;
  transition: all 0.25s ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${props => props.$selected ? `
    background-color: rgba(16, 185, 129, 0.05);
    border-color: #34d399;
    box-shadow: 0 0 10px rgba(52, 211, 153, 0.05);
  ` : `
    background-color: #18181b;
    border-color: #27272a;

    &:hover {
      border-color: #3f3f46;
    }
  `}
`;

const EspessuraLabelText = styled.span<{ $selected: boolean }>`
  font-size: 12px;
  font-weight: 700;
  display: block;
  margin-bottom: 4px;
  color: ${props => props.$selected ? '#34d399' : '#d4d4d8'};
`;

const EspessuraSubtext = styled.span`
  font-size: 10px;
  color: #71717a;
  display: block;
`;

const SmallCheckCircle = styled.div<CardProps>`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 1px solid;
  margin-top: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.25s ease-in-out;

  ${props => props.$selected ? `
    background-color: #10b981;
    border-color: #34d399;
    color: #09090b;
  ` : `
    border-color: #27272a;
  `}
`;

const AdicionaisContainer = styled.div`
  max-width: 672px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const AdicionalCard = styled.div<CardProps>`
  padding: 20px;
  border-radius: 16px;
  border: 1px solid;
  transition: all 0.3s ease-in-out;

  ${props => props.$selected ? `
    background-color: rgba(16, 185, 129, 0.05);
    border-color: rgba(16, 185, 129, 0.4);
    box-shadow: 0 0 15px rgba(52, 211, 153, 0.05);
  ` : `
    background-color: #18181b;
    border-color: #27272a;
  `}
`;

const AdicionalBody = styled.div`
  display: flex;
  gap: 16px;
  align-items: start;
`;

const AdicionalContent = styled.div`
  flex: 1;
`;

const SubtitleTextSmall = styled.span`
  font-size: 10px;
  color: #71717a;
  text-transform: uppercase;
  font-weight: 600;
  display: block;
  margin-bottom: 8px;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const VarToggleButton = styled.button<CardProps>`
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  border: 1px solid;
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  ${props => props.$selected ? `
    background-color: #10b981;
    border-color: #34d399;
    color: #09090b;
  ` : `
    background-color: #09090b;
    color: #a1a1aa;
    border-color: #27272a;

    &:hover {
      background-color: rgba(39, 39, 42, 0.5);
    }
  `}
`;

const AddToggleButton = styled.button<CardProps>`
  padding: 8px 16px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 700;
  border: 1px solid;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;

  ${props => props.$selected ? `
    background-color: #10b981;
    border-color: #34d399;
    color: #09090b;
  ` : `
    background-color: #09090b;
    color: #d4d4d8;
    border-color: #1f1f22;

    &:hover {
      background-color: rgba(39, 39, 42, 0.5);
    }
  `}
`;

const ObservacoesContainer = styled.div`
  max-width: 576px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
`;

const FormCard = styled.div`
  padding: 24px;
  border-radius: 16px;
  background-color: #18181b;
  border: 1px solid #27272a;
`;

const FormLabel = styled.label`
  display: block;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #34d399;
  margin-bottom: 12px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 16px;
  border-radius: 12px;
  background-color: #09090b;
  border: 1px solid #27272a;
  font-size: 14px;
  color: #e4e4e7;
  resize: none;
  transition: all 0.25s ease-in-out;

  &:focus {
    border-color: #10b981;
    outline: none;
  }

  &::placeholder {
    color: #3f3f46;
  }
`;

const FieldHelperText = styled.div`
  margin-top: 16px;
  display: flex;
  gap: 10px;
  align-items: start;
  font-size: 12px;
  color: #71717a;
  line-height: 1.5;
`;

const ResumoGrid = styled.div`
  max-width: 768px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const SummaryCard = styled.div`
  padding: 24px;
  border-radius: 16px;
  background-color: #18181b;
  border: 1px solid rgba(39, 39, 42, 0.8);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const SummaryHeader = styled.h3`
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #34d399;
  margin-top: 0;
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid #27272a;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SummaryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SummaryRow = styled.div`
  display: flex;
  align-items: start;
  justify-content: space-between;
  font-size: 12px;
`;

const SummaryRowValue = styled.div`
  max-width: 85%;
`;

const SummaryRowLabel = styled.span`
  color: #71717a;
  display: block;
  margin-bottom: 2px;
`;

const SummaryRowContent = styled.span`
  color: #ffffff;
  font-weight: 700;
  font-size: 14px;
`;

const SummaryRowNotes = styled.p`
  color: #ffffff;
  font-size: 12px;
  margin-top: 4px;
  font-style: italic;
  word-break: break-word;
  line-height: 1.625;
  margin-bottom: 0;
`;

const EditLinkButton = styled.button`
  padding: 4px;
  background: none;
  border: none;
  color: #71717a;
  cursor: pointer;
  transition: color 0.2s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #34d399;
  }
`;

const SummaryReminder = styled.div`
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid #27272a;
  font-size: 11px;
  color: #71717a;
  line-height: 1.5;
`;

const ContactForm = styled.form`
  padding: 24px;
  border-radius: 16px;
  background-color: #18181b;
  border: 1px solid #27272a;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const FormFieldsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const InputLabel = styled.label`
  display: block;
  font-size: 10px;
  font-weight: 700;
  color: #71717a;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 6px;
`;

const InputField = styled.input`
  width: 100%;
  padding: 12px;
  border-radius: 12px;
  background-color: #09090b;
  border: 1px solid #27272a;
  font-size: 12px;
  color: #ffffff;
  transition: all 0.25s ease-in-out;

  &:focus {
    border-color: #10b981;
    outline: none;
  }
`;

const SubmitButtonContainer = styled.div`
  margin-top: 32px;
`;

interface ButtonProps {
  $enabled: boolean;
}

const SubmitButton = styled.button<ButtonProps>`
  width: 100%;
  padding: 16px 20px;
  border-radius: 12px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.3s ease-in-out;
  border: none;

  ${props => props.$enabled ? `
    background-color: #10b981;
    color: #09090b;
    cursor: pointer;

    &:hover {
      background-color: #34d399;
      box-shadow: 0 0 20px rgba(52, 211, 153, 0.3);
    }
  ` : `
    background-color: #27272a;
    color: #52525b;
    border: 1px solid rgba(31, 31, 34, 0.6);
    cursor: not-allowed;
  `}
`;

const ButtonSubtext = styled.p`
  font-size: 10px;
  text-align: center;
  color: #52525b;
  margin-top: 10px;
  margin-bottom: 0;
`;

const FooterContainer = styled.div`
  padding: 24px;
  border-top: 1px solid #18181b;
  background-color: rgba(9, 9, 11, 0.4);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const BackButton = styled.button`
  padding: 12px 20px;
  border-radius: 12px;
  background-color: #18181b;
  border: 1px solid #27272a;
  color: #d4d4d8;
  font-size: 12px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: #27272a;
  }
`;

const NextButton = styled.button<ButtonProps>`
  padding: 12px 24px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease-in-out;
  border: none;

  ${props => props.$enabled ? `
    background-color: #10b981;
    color: #09090b;
    cursor: pointer;
    font-weight: 800;

    &:hover {
      background-color: #34d399;
    }
  ` : `
    background-color: rgba(39, 39, 42, 0.8);
    color: #52525b;
    border: 1px solid rgba(31, 31, 34, 0.6);
    cursor: not-allowed;
  `}
`;

export default function CustomizerPage() {
  const [searchParams] = useSearchParams();
  const [state, dispatch] = useReducer(customizerReducer, initialState);

  // Check URL query parameters on load to pre-select item type
  useEffect(() => {
    const queryTipo = searchParams.get('tipo');
    if (queryTipo) {
      const found = TIPOS.find(t => t.id === queryTipo);
      if (found) {
        dispatch({ type: 'LOAD_QUERY', payload: found });
      }
    }
  }, [searchParams]);

  // Compute steps list dynamically depending on selected piece type
  const activeSteps = useMemo(() => {
    const list = ['tipo'];
    if (!state.tipo) {
      list.push('resumo');
      return list;
    }

    if (state.tipo.id === 'piteira') {
      list.push('modelo');
    } else {
      list.push('tecnica');
    }

    list.push('tamanho');

    if (state.tipo.id === 'pote') {
      list.push('adicionais');
    }

    list.push('observacoes');
    list.push('resumo');
    return list;
  }, [state.tipo]);

  // Map step name to human-readable titles and descriptions
  const stepMeta = useMemo(() => {
    const currentStepName = activeSteps[state.stepIndex] || 'tipo';
    
    switch (currentStepName) {
      case 'tipo':
        return {
          title: 'Tipo de Peça',
          description: 'Selecione o tipo de vidro artesanal que deseja criar.'
        };
      case 'modelo':
        return {
          title: 'Modelo da Piteira',
          description: 'Escolha a estrutura ergonômica ideal para o seu bocal.'
        };
      case 'tecnica':
        return {
          title: 'Técnica de Sopro',
          description: 'Selecione o padrão estético e artístico de modelagem.'
        };
      case 'tamanho':
        return {
          title: state.tipo?.id === 'piteira' ? 'Tamanho & Espessura' : 'Tamanho da Peça',
          description: state.tipo?.id === 'piteira' 
            ? 'Defina o comprimento do corpo e a espessura da parede do vidro.' 
            : 'Selecione a dimensão física para sua peça de vidro.'
        };
      case 'adicionais':
        return {
          title: 'Acessórios Adicionais',
          description: 'Incremente o seu pote com aplicações fundidas exclusivas (opcional).'
        };
      case 'observacoes':
        return {
          title: 'Observações Finais',
          description: 'Adicione notas livres, referências ou detalhes extras sobre a estrutura (opcional).'
        };
      case 'resumo':
        return {
          title: 'Resumo & Contato',
          description: 'Confirme as especificações do seu pedido e preencha seus dados para conversarmos no WhatsApp.'
        };
      default:
        return { title: '', description: '' };
    }
  }, [activeSteps, state.stepIndex, state.tipo]);

  const currentStepName = activeSteps[state.stepIndex] || 'tipo';

  // Action helpers
  const handleSelectTipo = (tipo: TipoPeca) => {
    dispatch({ type: 'SET_TIPO', payload: tipo });
  };

  const handleSelectModelo = (modelo: Modelo) => {
    dispatch({ type: 'SET_MODELO', payload: modelo });
  };

  const handleSelectTecnica = (tecnica: Tecnica) => {
    dispatch({ type: 'SET_TECNICA', payload: tecnica });
  };

  const handleSelectTamanho = (tamanho: Tamanho) => {
    dispatch({ type: 'SET_TAMANHO', payload: tamanho });
  };

  const handleSelectEspessura = (espessura: Espessura) => {
    dispatch({ type: 'SET_ESPESSURA', payload: espessura });
  };

  const handleToggleAdicional = (adicionalId: string, variacaoId?: string) => {
    dispatch({ type: 'TOGGLE_ADICIONAL', payload: { adicionalId, variacaoId } });
  };

  const handleObservacoesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({ type: 'SET_OBSERVACOES', payload: e.target.value });
  };

  const handleContatoChange = (field: keyof Contato, value: string) => {
    let formattedValue = value;
    if (field === 'whatsapp') {
      formattedValue = formatBrazilianPhone(value);
    }
    dispatch({ type: 'SET_CONTATO', payload: { [field]: formattedValue } });
  };

  // Check if current step is fully validated to allow next step
  const isCurrentStepValid = useMemo(() => {
    switch (currentStepName) {
      case 'tipo':
        return !!state.tipo;
      case 'modelo':
        return !!state.modelo;
      case 'tecnica':
        return !!state.tecnica;
      case 'tamanho':
        if (state.tipo?.id === 'piteira') {
          return !!state.tamanho && !!state.espessura;
        }
        return !!state.tamanho;
      case 'adicionais':
        return true;
      case 'observacoes':
        return true;
      case 'resumo':
        return state.contato.nome.trim().length >= 3 && state.contato.whatsapp.replace(/\D/g, '').length >= 10;
      default:
        return true;
    }
  }, [currentStepName, state.tipo, state.modelo, state.tecnica, state.tamanho, state.espessura, state.contato]);

  // Calculate percentage of progress
  const progressPercent = useMemo(() => {
    if (activeSteps.length <= 1) return 0;
    return Math.round((state.stepIndex / (activeSteps.length - 1)) * 100);
  }, [activeSteps, state.stepIndex]);

  // Assemble and trigger WhatsApp message redirection
  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!state.tipo) return;

    if (!state.contato.nome.trim() || state.contato.nome.trim().length < 3) {
      alert('Por favor, insira seu nome completo (mínimo 3 letras).');
      return;
    }
    const cleanPhone = state.contato.whatsapp.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      alert('Por favor, insira um número de WhatsApp válido com DDD.');
      return;
    }

    const linhas: string[] = [
      "🔥 *NOVO PEDIDO DE VIDRO CUSTOMIZADO* 🔥",
      "",
      `*Peça:* ${state.tipo.nome}`,
    ];

    if (state.modelo) {
      linhas.push(`*Modelo:* ${state.modelo.nome}`);
    }
    if (state.tecnica) {
      linhas.push(`*Técnica de Sopro:* ${state.tecnica.nome}`);
    }
    if (state.tamanho) {
      linhas.push(`*Tamanho:* ${state.tamanho.label}`);
    }
    if (state.espessura) {
      linhas.push(`*Espessura:* ${state.espessura.label}`);
    }

    if (state.tipo.id === 'pote' && state.adicionaisSelecionados.length > 0) {
      const adicText = state.adicionaisSelecionados.map(sel => {
        const item = ADICIONAIS.find(a => a.id === sel.adicionalId);
        if (!item) return '';
        if (sel.variacaoId && item.variacoes) {
          const v = item.variacoes.find(varObj => varObj.id === sel.variacaoId);
          return `${item.nome} (${v?.label || ''})`;
        }
        return item.nome;
      }).filter(Boolean).join(", ");
      
      linhas.push(`*Adicionais:* ${adicText}`);
    }

    if (state.extras.observacoes?.trim()) {
      linhas.push(`*Observações:* _${state.extras.observacoes.trim()}_`);
    }

    linhas.push(
      "",
      "👤 *DADOS DO CLIENTE*",
      `*Nome:* ${state.contato.nome.trim()}`,
      `*WhatsApp:* ${state.contato.whatsapp}`,
      `*Cidade:* ${state.contato.cidade?.trim() || "Não informada"}`
    );

    linhas.push(
      "",
      "💬 _Olá! Acabei de estruturar minha peça no site. Vamos fechar a escolha de cores, confirmar o estoque e combinar a entrega?_"
    );

    const textoFormatado = linhas.join("\n");
    const numeroProdutor = "5511999999999"; 
    const waUrl = `https://wa.me/${numeroProdutor}?text=${encodeURIComponent(textoFormatado)}`;
    window.open(waUrl, '_blank');
  };

  const handleEditField = (stepName: string) => {
    const idx = activeSteps.indexOf(stepName);
    if (idx > -1) {
      dispatch({ type: 'GO_TO_STEP', payload: idx });
    }
  };

  return (
    <PageContainer>
      {/* LEFT PANEL: Stepper status & Summary Sidebar */}
      <Sidebar id="sidebar-panel">
        <div>
          {/* Logo Brand Link */}
          <BrandContainer id="brand-logo">
            <BrandIcon>S</BrandIcon>
            <div>
              <BrandTitle>SOPRO GLASS</BrandTitle>
              <BrandSubtitle>Ateliê de Sopro</BrandSubtitle>
            </div>
          </BrandContainer>
 
          {/* Stepper progress indicator */}
          <ProgressContainer>
            <ProgressInfo>
              <ProgressLabel>Progresso</ProgressLabel>
              <span>
                Passo {state.stepIndex + 1} de {activeSteps.length}
              </span>
            </ProgressInfo>
            <ProgressBarContainer>
              <ProgressBarFill $width={progressPercent} />
            </ProgressBarContainer>
          </ProgressContainer>
 
          {/* Stepper Roadmap */}
          <RoadmapsContainer>
            {activeSteps.map((stepKey, idx) => {
              const isCompleted = idx < state.stepIndex;
              const isActive = idx === state.stepIndex;
              
              let stepLabel = '';
              if (stepKey === 'tipo') stepLabel = 'Tipo de Peça';
              else if (stepKey === 'modelo') stepLabel = 'Modelo';
              else if (stepKey === 'tecnica') stepLabel = 'Técnica Sopro';
              else if (stepKey === 'tamanho') stepLabel = state.tipo?.id === 'piteira' ? 'Tamanho & Espessura' : 'Tamanho';
              else if (stepKey === 'adicionais') stepLabel = 'Adicionais';
              else if (stepKey === 'observacoes') stepLabel = 'Observações';
              else if (stepKey === 'resumo') stepLabel = 'Resumo & Contato';

              return (
                <RoadmapItem 
                  key={stepKey} 
                  $active={isActive}
                  $completed={isCompleted}
                  onClick={() => {
                    if (isCompleted) {
                      dispatch({ type: 'GO_TO_STEP', payload: idx });
                    }
                  }}
                >
                  <StepBadge $active={isActive} $completed={isCompleted}>
                    {isCompleted ? <Check size={10} strokeWidth={3} /> : idx + 1}
                  </StepBadge>
                  <span>{stepLabel}</span>
                </RoadmapItem>
              );
            })}
          </RoadmapsContainer>
        </div>
 
        {/* Short info note on no-prices, no colors */}
        {state.stepIndex === 0 && (
          <InfoNote>
            <Info size={14} style={{ color: '#10b981', flexShrink: 0, marginTop: '2px' }} />
            <p style={{ margin: 0 }}>
              Esta etapa define apenas os aspectos estruturais e técnicos. Preços e paletas de cores dependem do nosso estoque de vidro do dia e são combinados livremente via WhatsApp.
            </p>
          </InfoNote>
        )}
      </Sidebar>
 
      {/* RIGHT PANEL: Dynamic view transitions & Form Selection Cards */}
      <ContentPanel id="form-content-panel">
        {/* Header */}
        <HeaderContainer>
          <div>
            <HeaderTitle>{stepMeta.title}</HeaderTitle>
            <HeaderDescription>{stepMeta.description}</HeaderDescription>
          </div>
        </HeaderContainer>
 
        {/* Center Canvas with Selections */}
        <CenterContainer>
          <SelectionContainer>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStepName}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.25 }}
                style={{ width: '100%' }}
              >
                
                {/* STEP 1: TIPO DE PEÇA */}
                {currentStepName === 'tipo' && (
                  <TipoGrid id="step-tipo-selection">
                    {TIPOS.map(item => {
                      const isSelected = state.tipo?.id === item.id;
                      return (
                        <SelectionCard
                          key={item.id}
                          $selected={isSelected}
                          onClick={() => handleSelectTipo(item)}
                        >
                          <ArtPreviewWrapper>
                            <GlassArt type={item.svgType} active={isSelected} className="w-24 h-24" />
                          </ArtPreviewWrapper>
                          <div>
                            <CardTitle>{item.nome}</CardTitle>
                            <CardDescription>{item.descricao}</CardDescription>
                          </div>
                          <CardFooter>
                            <CardButton $selected={isSelected}>
                              {isSelected ? 'Selecionado' : 'Selecionar'}
                            </CardButton>
                          </CardFooter>
                        </SelectionCard>
                      );
                    })}
                  </TipoGrid>
                )}
 
                {/* STEP 2: MODELO (SÓ PITEIRA) */}
                {currentStepName === 'modelo' && (
                  <ModeloGrid id="step-modelo-selection">
                    {MODELOS.map(item => {
                      const isSelected = state.modelo?.id === item.id;
                      return (
                        <SelectionCard
                          key={item.id}
                          $selected={isSelected}
                          onClick={() => handleSelectModelo(item)}
                        >
                          <ArtPreviewWrapper>
                            <GlassArt type={item.svgType} active={isSelected} className="w-24 h-24" />
                          </ArtPreviewWrapper>
                          <div>
                            <CardTitleLarge>{item.nome}</CardTitleLarge>
                            {item.descricaoCurta && (
                              <CardDescription style={{ maxWidth: '384px', marginLeft: 'auto', marginRight: 'auto' }}>
                                {item.descricaoCurta}
                              </CardDescription>
                            )}
                          </div>
                          <CardFooter>
                            <CardButton $selected={isSelected}>
                              {isSelected ? 'Selecionado' : 'Escolher este Modelo'}
                            </CardButton>
                          </CardFooter>
                        </SelectionCard>
                      );
                    })}
                  </ModeloGrid>
                )}
 
                {/* STEP 3: TÉCNICA (CUIAS E POTES) */}
                {currentStepName === 'tecnica' && (
                  <TecnicaList id="step-tecnica-selection">
                    {TECNICAS.filter(t => t.tipoId === state.tipo?.id).map(item => {
                      const isSelected = state.tecnica?.id === item.id;
                      
                      let artType: 'double-reverse' | 'reverse' | 'rewig' | 'cuia' = 'double-reverse';
                      if (item.id.includes('reverse') && !item.id.includes('double-reverse')) artType = 'reverse';
                      else if (item.id.includes('double-reverse')) artType = 'double-reverse';
                      else if (item.id.includes('rewig')) artType = 'rewig';
                      else if (state.tipo?.id === 'cuia') artType = 'cuia';
 
                      return (
                        <TecnicaListItem
                          key={item.id}
                          $selected={isSelected}
                          onClick={() => handleSelectTecnica(item)}
                        >
                          <TecnicaPreview>
                            <GlassArt type={artType} active={isSelected} className="w-14 h-14" />
                          </TecnicaPreview>
                          <TecnicaContent>
                            <TecnicaTitle>
                              {item.nome}
                              {isSelected && <ActiveIndicatorGlow />}
                            </TecnicaTitle>
                            <CardDescription style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                              {item.descricao}
                            </CardDescription>
                          </TecnicaContent>
                          <CheckBadge $selected={isSelected}>
                            <Check size={16} strokeWidth={isSelected ? 3 : 2} />
                          </CheckBadge>
                        </TecnicaListItem>
                      );
                    })}
                  </TecnicaList>
                )}
 
                {/* STEP 4: TAMANHO (+ ESPESSURA SE FOR PITEIRA) */}
                {currentStepName === 'tamanho' && (
                  <TamanhoContainer id="step-tamanho-selection">
                    {/* Size Selector */}
                    <div>
                      <SectionHeader>
                        <span>1. Selecione o Comprimento / Tamanho</span>
                      </SectionHeader>
                      <TamanhoList>
                        {TAMANHOS.filter(t => t.tipoId === state.tipo?.id).map(item => {
                          const isSelected = state.tamanho?.id === item.id;
                          return (
                            <TamanhoItem
                              key={item.id}
                              $selected={isSelected}
                              onClick={() => handleSelectTamanho(item)}
                            >
                              <div>
                                <span style={{ fontWeight: 700, fontSize: '14px', display: 'block' }}>{item.label}</span>
                                {item.descricao && (
                                  <span style={{ fontSize: '12px', color: '#71717a', marginTop: '4px', display: 'block' }}>
                                    {item.descricao}
                                  </span>
                                )}
                              </div>
                              <SmallRadioCircle $selected={isSelected}>
                                {isSelected && <Check size={12} strokeWidth={3} />}
                              </SmallRadioCircle>
                            </TamanhoItem>
                          );
                        })}
                      </TamanhoList>
                    </div>
 
                    {/* Thickness Selector (Piteira Only) */}
                    {state.tipo?.id === 'piteira' && (
                      <div style={{ marginTop: '32px' }}>
                        <SectionHeader>
                          <span>2. Selecione a Espessura da Parede</span>
                        </SectionHeader>
                        <EspessuraGrid>
                          {ESPESSURAS.map(item => {
                            const isSelected = state.espessura?.id === item.id;
                            return (
                              <EspessuraCard
                                key={item.id}
                                $selected={isSelected}
                                onClick={() => handleSelectEspessura(item)}
                              >
                                <EspessuraLabelText $selected={isSelected}>
                                  {item.label.split(' ')[0]}
                                </EspessuraLabelText>
                                <EspessuraSubtext>
                                  {item.label.includes('(') ? item.label.slice(item.label.indexOf('(')) : ''}
                                </EspessuraSubtext>
                                <SmallCheckCircle $selected={isSelected}>
                                  {isSelected && <Check size={8} strokeWidth={3} />}
                                </SmallCheckCircle>
                              </EspessuraCard>
                            );
                          })}
                        </EspessuraGrid>
                      </div>
                    )}
                  </TamanhoContainer>
                )}
 
                {/* STEP 5: ADICIONAIS (SÓ POTE) */}
                {currentStepName === 'adicionais' && (
                  <AdicionaisContainer id="step-adicionais-selection">
                    {ADICIONAIS.filter(a => a.tipoId === state.tipo?.id).map(item => {
                      const selection = state.adicionaisSelecionados.find(s => s.adicionalId === item.id);
                      const isSelected = !!selection;
                      
                      let artType: 'base-flor' | 'opala' = 'base-flor';
                      if (item.id === 'opala-lateral') artType = 'opala';
 
                      return (
                        <AdicionalCard
                          key={item.id}
                          $selected={isSelected}
                        >
                          <AdicionalBody>
                            <div style={{ padding: '8px', backgroundColor: '#09090b', borderRadius: '12px', border: '1px solid #27272a', flexShrink: 0 }}>
                              <GlassArt type={artType} active={isSelected} className="w-14 h-14" />
                            </div>
                            <AdicionalContent>
                              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff', marginTop: 0, marginBottom: '4px' }}>
                                {item.nome}
                              </h3>
                              <CardDescription style={{ marginBottom: '16px' }}>{item.descricao}</CardDescription>
 
                              {/* Variation Sub-selection if present */}
                              {item.variacoes && (
                                <div style={{ marginTop: '14px' }}>
                                  <SubtitleTextSmall>Opção de diâmetro:</SubtitleTextSmall>
                                  <ButtonGroup>
                                    {item.variacoes.map(v => {
                                      const isVarSelected = selection?.variacaoId === v.id;
                                      return (
                                        <VarToggleButton
                                          key={v.id}
                                          $selected={isVarSelected}
                                          onClick={() => handleToggleAdicional(item.id, v.id)}
                                        >
                                          {v.label}
                                        </VarToggleButton>
                                      );
                                    })}
                                  </ButtonGroup>
                                </div>
                              )}
 
                              {!item.variacoes && (
                                <AddToggleButton
                                  $selected={isSelected}
                                  onClick={() => handleToggleAdicional(item.id)}
                                >
                                  {isSelected ? <Check size={12} strokeWidth={3} /> : null}
                                  <span>{isSelected ? 'Adicionado' : 'Adicionar ao Pote'}</span>
                                </AddToggleButton>
                              )}
                            </AdicionalContent>
                          </AdicionalBody>
                        </AdicionalCard>
                      );
                    })}
                  </AdicionaisContainer>
                )}
 
                {/* STEP 6: OBSERVAÇÕES */}
                {currentStepName === 'observacoes' && (
                  <ObservacoesContainer id="step-observacoes-field">
                    <FormCard>
                      <FormLabel htmlFor="input-observacoes">
                        Escreva suas orientações estruturais
                      </FormLabel>
                      <TextArea
                        id="input-observacoes"
                        rows={6}
                        placeholder="Ex: Gostaria que a piteira ficasse com o bocal levemente achatado, ou gostaria de combinar um diâmetro de base de pote específico..."
                        value={state.extras.observacoes}
                        onChange={handleObservacoesChange}
                      />
                      <FieldHelperText>
                        <Info size={16} style={{ color: '#10b981', flexShrink: 0, marginTop: '2px' }} />
                        <p style={{ margin: 0 }}>
                          Qualquer dúvida de espessura, formato de encaixe ou detalhes estruturais avançados que não estão no formulário podem ser digitados aqui!
                        </p>
                      </FieldHelperText>
                    </FormCard>
                  </ObservacoesContainer>
                )}
 
                {/* STEP 7: RESUMO + CONTATO */}
                {currentStepName === 'resumo' && (
                  <ResumoGrid id="step-resumo-form">
                    
                    {/* Item customization summary list */}
                    <SummaryCard>
                      <div>
                        <SummaryHeader>
                          <span>Resumo da Estrutura</span>
                          <Sparkles size={14} style={{ color: '#34d399' }} />
                        </SummaryHeader>
 
                        <SummaryList>
                          {/* Tipo */}
                          <SummaryRow id="summary-tipo">
                            <SummaryRowValue>
                              <SummaryRowLabel>Tipo de Peça</SummaryRowLabel>
                              <SummaryRowContent>{state.tipo?.nome}</SummaryRowContent>
                            </SummaryRowValue>
                            <EditLinkButton onClick={() => handleEditField('tipo')} title="Editar">
                              <Edit2 size={13} />
                            </EditLinkButton>
                          </SummaryRow>
 
                          {/* Modelo (piteira) */}
                          {state.tipo?.id === 'piteira' && state.modelo && (
                            <SummaryRow id="summary-modelo">
                              <SummaryRowValue>
                                <SummaryRowLabel>Modelo</SummaryRowLabel>
                                <SummaryRowContent>{state.modelo.nome}</SummaryRowContent>
                              </SummaryRowValue>
                              <EditLinkButton onClick={() => handleEditField('modelo')} title="Editar">
                                <Edit2 size={13} />
                              </EditLinkButton>
                            </SummaryRow>
                          )}
 
                          {/* Técnica (cuia, pote) */}
                          {state.tipo?.id !== 'piteira' && state.tecnica && (
                            <SummaryRow id="summary-tecnica">
                              <SummaryRowValue>
                                <SummaryRowLabel>Técnica de Sopro</SummaryRowLabel>
                                <SummaryRowContent>{state.tecnica.nome}</SummaryRowContent>
                              </SummaryRowValue>
                              <EditLinkButton onClick={() => handleEditField('tecnica')} title="Editar">
                                <Edit2 size={13} />
                              </EditLinkButton>
                            </SummaryRow>
                          )}
 
                          {/* Tamanho */}
                          {state.tamanho && (
                            <SummaryRow id="summary-tamanho">
                              <SummaryRowValue>
                                <SummaryRowLabel>Tamanho/Comprimento</SummaryRowLabel>
                                <SummaryRowContent>{state.tamanho.label}</SummaryRowContent>
                              </SummaryRowValue>
                              <EditLinkButton onClick={() => handleEditField('tamanho')} title="Editar">
                                <Edit2 size={13} />
                              </EditLinkButton>
                            </SummaryRow>
                          )}
 
                          {/* Espessura (piteira) */}
                          {state.tipo?.id === 'piteira' && state.espessura && (
                            <SummaryRow id="summary-espessura">
                              <SummaryRowValue>
                                <SummaryRowLabel>Espessura do Vidro</SummaryRowLabel>
                                <SummaryRowContent>{state.espessura.label}</SummaryRowContent>
                              </SummaryRowValue>
                              <EditLinkButton onClick={() => handleEditField('tamanho')} title="Editar">
                                <Edit2 size={13} />
                              </EditLinkButton>
                            </SummaryRow>
                          )}
 
                          {/* Adicionais (pote) */}
                          {state.tipo?.id === 'pote' && (
                            <SummaryRow id="summary-adicionais">
                              <SummaryRowValue>
                                <SummaryRowLabel>Adicionais</SummaryRowLabel>
                                <SummaryRowContent>
                                  {state.adicionaisSelecionados.length > 0 ? (
                                    state.adicionaisSelecionados.map(sel => {
                                      const item = ADICIONAIS.find(a => a.id === sel.adicionalId);
                                      if (!item) return '';
                                      if (sel.variacaoId && item.variacoes) {
                                        const v = item.variacoes.find(varObj => varObj.id === sel.variacaoId);
                                        return `${item.nome} (${v?.label || ''})`;
                                      }
                                      return item.nome;
                                    }).filter(Boolean).join(", ")
                                  ) : (
                                    <span style={{ color: '#52525b', fontWeight: 'normal', fontStyle: 'italic' }}>
                                      Nenhum acessório adicional
                                    </span>
                                  )}
                                </SummaryRowContent>
                              </SummaryRowValue>
                              <EditLinkButton onClick={() => handleEditField('adicionais')} title="Editar">
                                <Edit2 size={13} />
                              </EditLinkButton>
                            </SummaryRow>
                          )}
 
                          {/* Observações */}
                          <SummaryRow id="summary-observacoes">
                            <SummaryRowValue>
                              <SummaryRowLabel>Observações</SummaryRowLabel>
                              <SummaryRowNotes>
                                {state.extras.observacoes?.trim() ? `"${state.extras.observacoes.trim()}"` : (
                                  <span style={{ color: '#52525b', fontWeight: 'normal', fontStyle: 'normal' }}>
                                    Nenhuma observação informada
                                  </span>
                                )}
                              </SummaryRowNotes>
                            </SummaryRowValue>
                            <EditLinkButton onClick={() => handleEditField('observacoes')} title="Editar">
                              <Edit2 size={13} />
                            </EditLinkButton>
                          </SummaryRow>
                        </SummaryList>
                      </div>
 
                      {/* Reminder of whatsapp color deal */}
                      <SummaryReminder>
                        🚨 <strong style={{ color: '#a1a1aa', fontWeight: 600 }}>Sem cores ou preços fixos:</strong> Após clicar no envio, iremos conferir e indicar quais as cores mais bonitas de tubos que temos prontas para o seu sopro de vidro!
                      </SummaryReminder>
                    </SummaryCard>
 
                    {/* Contact detail fields form */}
                    <ContactForm onSubmit={handleSendWhatsApp}>
                      <div>
                        <h3 style={{ fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#34d399', marginTop: 0, marginBottom: '20px', paddingBottom: '8px', borderBottom: '1px solid #27272a' }}>
                          Seus Dados de Contato
                        </h3>
 
                        <FormFieldsWrapper>
                          {/* Nome */}
                          <div>
                            <InputLabel htmlFor="contato-nome">
                              Seu Nome Completo <span style={{ color: '#34d399' }}>*</span>
                            </InputLabel>
                            <InputField
                              type="text"
                              id="contato-nome"
                              required
                              minLength={3}
                              placeholder="Como quer ser chamado(a)?"
                              value={state.contato.nome}
                              onChange={e => handleContatoChange('nome', e.target.value)}
                            />
                          </div>
 
                          {/* WhatsApp */}
                          <div>
                            <InputLabel htmlFor="contato-whatsapp">
                              Seu WhatsApp <span style={{ color: '#34d399' }}>*</span>
                            </InputLabel>
                            <InputField
                              type="text"
                              id="contato-whatsapp"
                              required
                              placeholder="(99) 99999-9999"
                              value={state.contato.whatsapp}
                              onChange={e => handleContatoChange('whatsapp', e.target.value)}
                            />
                          </div>
 
                          {/* Cidade */}
                          <div>
                            <InputLabel htmlFor="contato-cidade">
                              Cidade / UF (Opcional)
                            </InputLabel>
                            <InputField
                              type="text"
                              id="contato-cidade"
                              placeholder="Ex: Florianópolis - SC"
                              value={state.contato.cidade || ''}
                              onChange={e => handleContatoChange('cidade', e.target.value)}
                            />
                          </div>
                        </FormFieldsWrapper>
                      </div>
 
                      {/* Send button */}
                      <SubmitButtonContainer>
                        <SubmitButton
                          type="submit"
                          $enabled={isCurrentStepValid}
                          id="btn-enviar-whatsapp"
                        >
                          <MessageSquare size={18} />
                          <span>Enviar no WhatsApp</span>
                        </SubmitButton>
                        <ButtonSubtext>
                          Iniciaremos nossa conversa com todas as suas escolhas estruturadas!
                        </ButtonSubtext>
                      </SubmitButtonContainer>
                    </ContactForm>
 
                  </ResumoGrid>
                )}
 
              </motion.div>
            </AnimatePresence>
          </SelectionContainer>
        </CenterContainer>
 
        {/* Navigation Action Footer buttons */}
        <FooterContainer>
          <div>
            {state.stepIndex > 0 ? (
              <BackButton
                onClick={() => dispatch({ type: 'PREV_STEP' })}
                id="btn-voltar-step"
              >
                <ArrowLeft size={14} />
                <span>Voltar</span>
              </BackButton>
            ) : (
              <div />
            )}
          </div>
 
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {currentStepName !== 'resumo' && (
              <NextButton
                onClick={() => dispatch({ type: 'NEXT_STEP' })}
                $enabled={isCurrentStepValid}
                id="btn-avancar-step"
              >
                <span>Avançar</span>
                <ArrowRight size={14} />
              </NextButton>
            )}
          </div>
        </FooterContainer>
      </ContentPanel>
    </PageContainer>
  );
}
