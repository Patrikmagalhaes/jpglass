export interface CarouselItem {
  id: number;
  username: string;
  tag_product: string;
  media_type: 'video' | 'image';
  video_url: string;
  thumbnail_url: string;
  alt_text: string;
  is_highlighted?: boolean;
}

export interface SocialProofSectionConfig {
  id: string;
  theme: 'dark' | 'light';
  typography: {
    title_font: string;
    body_font: string;
  };
  content: {
    title: string;
    subtitle: string;
  };
  component: {
    type: string;
    behavior: {
      autoplay: boolean;
      loop: boolean;
      controls: boolean;
      muted: boolean;
      pause_on_hover: boolean;
      pause_on_touch: boolean;
    };
    items: CarouselItem[];
  };
  branding: {
    watermark_logo: string;
  };
}



//types referentes ao form custom
/////////////////////////////////

export interface TipoPeca {
  id: string;
  nome: string;
  descricao: string;
  svgType: 'cuia' | 'pote' | 'piteira';
}

export interface Modelo {
  id: string;
  tipoId: string;
  nome: string;
  descricaoCurta?: string;
  svgType: 'implosion' | 'anel';
}

export interface Tecnica {
  id: string;
  tipoId: string;
  nome: string;
  descricao: string;
}

export interface Tamanho {
  id: string;
  tipoId: string;
  label: string;
  descricao?: string;
}

export interface Espessura {
  id: string;
  label: string;
}

export interface Adicional {
  id: string;
  tipoId: string;
  nome: string;
  descricao: string;
  variacoes?: { id: string; label: string }[];
}

export interface Extras {
  observacoes?: string;
}

export interface Contato {
  nome: string;
  whatsapp: string;
  cidade?: string;
}

export interface PedidoState {
  stepIndex: number;
  tipo?: TipoPeca;
  modelo?: Modelo;
  tecnica?: Tecnica;
  tamanho?: Tamanho;
  espessura?: Espessura; // only for piteira
  adicionaisSelecionados: {
    adicionalId: string;
    variacaoId?: string;
  }[]; // only for pote
  extras: Extras;
  contato: Contato;
}

// Static Data
export const TIPOS: TipoPeca[] = [
  {
    id: 'cuia',
    nome: 'Cuia de Vidro',
    descricao: 'Peça ergonômica ideal para preparar e misturar seu ritual com praticidade.',
    svgType: 'cuia',
  },
  {
    id: 'pote',
    nome: 'Pote Personalizado',
    descricao: 'Recipiente hermético soprado para conservar suas flores com o máximo de estilo.',
    svgType: 'pote',
  },
  {
    id: 'piteira',
    nome: 'Piteira de Vidro',
    descricao: 'Redução de danos com resfriamento ideal e fluxo perfeito, lavável e reutilizável.',
    svgType: 'piteira',
  },
];

export const MODELOS: Modelo[] = [
  {
    id: 'piteira-implosion',
    tipoId: 'piteira',
    nome: 'Implosion',
    descricaoCurta: 'Piteira com técnica de implosão de flores de vidro em sua extremidade.',
    svgType: 'implosion',
  },
  {
    id: 'piteira-anel',
    tipoId: 'piteira',
    nome: 'Anel (encaixa no dedo)',
    descricaoCurta: 'Piteira em formato de anel, encaixa direto no dedo para máxima ergonomia.',
    svgType: 'anel',
  },
];

export const TECNICAS: Tecnica[] = [
  // Pote
  {
    id: 'double-reverse',
    tipoId: 'pote',
    nome: 'Double Reverse',
    descricao: 'Técnica avançada de linhas espiraladas reversas duplas para um visual hipnótico.',
  },
  {
    id: 'reverse',
    tipoId: 'pote',
    nome: 'Reverse',
    descricao: 'Padrão clássico de linhas coloridas reversas com excelente definição de contraste.',
  },
  {
    id: 'rewig',
    tipoId: 'pote',
    nome: 'Rewig',
    descricao: 'Padrão dinâmico com alternância de sentidos nas linhas, criando um efeito zigue-zague.',
  },

  // Cuia
  {
    id: 'cuia-double-reverse',
    tipoId: 'cuia',
    nome: 'Double Reverse',
    descricao: 'Linhas espiraladas reversas duplas cruzando o corpo da cuia com efeito hipnótico.',
  },
  {
    id: 'cuia-reverse',
    tipoId: 'cuia',
    nome: 'Reverse',
    descricao: 'Padrão clássico de linhas em espiral reversa com excelente contraste de cor.',
  },
  {
    id: 'cuia-rewig',
    tipoId: 'cuia',
    nome: 'Rewig',
    descricao: 'Efeito zigue-zague dinâmico soprando alternância de sentidos nas linhas de vidro.',
  },
  {
    id: 'cuia-clear',
    tipoId: 'cuia',
    nome: 'Vidro Transparente Puro',
    descricao: 'Estilo clean clássico sem decoração, destacando a pureza e espessura do borossilicato.',
  },
];

export const TAMANHOS: Tamanho[] = [
  // Pote
  {
    id: 'pote-35mm',
    tipoId: 'pote',
    label: '35 mm',
    descricao: 'Tamanho compacto, perfeito para transporte diário.',
  },
  {
    id: 'pote-40mm',
    tipoId: 'pote',
    label: '40 mm',
    descricao: 'Tamanho médio, ideal para armazenamento residencial.',
  },

  // Piteira (comprimento)
  {
    id: 'piteira-comprimento-curta',
    tipoId: 'piteira',
    label: 'Curta (approx. 5cm)',
    descricao: 'Mais discreta e rápida de higienizar.',
  },
  {
    id: 'piteira-comprimento-media',
    tipoId: 'piteira',
    label: 'Média (approx. 7cm)',
    descricao: 'O equilíbrio perfeito entre resfriamento e tamanho.',
  },
  {
    id: 'piteira-comprimento-longa',
    tipoId: 'piteira',
    label: 'Longa (approx. 9cm)',
    descricao: 'Máximo resfriamento da fumaça e retenção de resíduos.',
  },

  // Cuia
  {
    id: 'cuia-pequena',
    tipoId: 'cuia',
    label: 'Pequena (Ø 40mm - 45mm)',
    descricao: 'Ideal para preparações rápidas e transporte facilitado.',
  },
  {
    id: 'cuia-media',
    tipoId: 'cuia',
    label: 'Média (Ø 50mm - 55mm)',
    descricao: 'O tamanho padrão clássico mais confortável para o uso cotidiano.',
  },
  {
    id: 'cuia-grande',
    tipoId: 'cuia',
    label: 'Grande (Ø 60mm - 65mm)',
    descricao: 'Espaço amplo ideal para rituais maiores ou sessões compartilhadas.',
  },
];

export const ESPESSURAS: Espessura[] = [
  { id: 'fina', label: 'Fina (4mm a 5mm)' },
  { id: 'media', label: 'Média (6mm a 7mm)' },
  { id: 'grossa', label: 'Grossa (8mm ou mais)' },
];

export const ADICIONAIS: Adicional[] = [
  {
    id: 'base-flor-implosion',
    tipoId: 'pote',
    nome: 'Base Flor Implosion',
    descricao: 'Uma flor de vidro implodida aplicada na base do pote, servindo como apoio e ornamento.',
    variacoes: [
      { id: 'base-flor-35mm', label: 'Diâmetro de 35 mm' },
      { id: 'base-flor-45mm', label: 'Diâmetro de 45 mm' },
    ],
  },
  {
    id: 'opala-lateral',
    tipoId: 'pote',
    nome: 'Opala Sintética Lateral',
    descricao: 'Inserção de uma pedra de opala resistente ao calor fundida na parede lateral do vidro.',
  },
];
