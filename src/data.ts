import type { SocialProofSectionConfig } from './types';

export const SOCIAL_PROOF_DATA: SocialProofSectionConfig = {
  id: "social-proof-ritual",
  theme: "dark",
  typography: {
    title_font: "graffiti-stylized",
    body_font: "monospace-clean"
  },
  content: {
    title: "Nas mãos de quem entende...",
    subtitle: "Registros de quem escolheu a pureza do vidro para o seu ritual com ervas e tabacos selecionados."
  },
  component: {
    type: "carousel",
    behavior: {
      autoplay: true,
      loop: true,
      controls: false,
      muted: true,
      pause_on_hover: true,
      pause_on_touch: true
    },
    items: [
      {
        id: 1,
        username: "fidesindeum1",
        tag_product: "@jp._glass",
        media_type: "video",
        video_url: "/images/cannabis.mp4",
        thumbnail_url: "/images/you-open.png",
        alt_text: "Mão segurando um cachimbo de vidro em formato de cogumelo colorido com fumaça ao fundo."
      },
      {
        id: 2,
        username: "fidesindeum1",
        tag_product: "@jp._glass",
        media_type: "video",
        video_url: "/images/cannabis.mp4",
        thumbnail_url: "/images/you-open.png",
        alt_text: "Mão segurando um baseado com piteira de vidro exalando fumaça branca."
      },
      {
        id: 3,
        username: "fidesindeum1",
        tag_product: "@jp._glass",
        media_type: "video",
        video_url: "/images/cannabis.mp4",
        thumbnail_url: "/images/you-open.png",
        alt_text: "Close-up detalhado do cachimbo de vidro artesanal de cogumelo."
      },
      {
        id: 4,
        username: "fidesindeum1",
        tag_product: "@jp._glass",
        media_type: "video",
        video_url: "/images/cannabis.mp4",
        thumbnail_url: "/images/you-open.png",
        alt_text: "Outro ângulo do cachimbo de vidro focado na fumaça densa circundando a peça."
      },
      {
        id: 5,
        username: "fidesindeum1",
        tag_product: "@jp._glass",
        media_type: "video",
        video_url: "/images/cannabis.mp4",
        thumbnail_url: "/images/you-open.png",
        is_highlighted: true,
        alt_text: "Cena destacada em azul mostrando o uso da piteira de vidro com fumaça densa."
      }
    ]
  },
  branding: {
    watermark_logo: "JP GLASS"
  }
};
