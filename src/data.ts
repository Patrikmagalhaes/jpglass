import type { SocialProofSectionConfig } from "./types";

export const SOCIAL_PROOF_DATA: SocialProofSectionConfig = {
  id: "social-proof-ritual",
  theme: "dark",

  typography: {
    title_font: "graffiti-stylized",
    body_font: "monospace-clean"
  },

  content: {
    title: "Nas mãos de quem entende...",
    subtitle:
      "Registros de quem escolheu a pureza do vidro para a sua sessão."
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
        video_url: "media/social/videos/prova1.webm",
        alt_text: "Vídeo 1"
      },
      {
        id: 2,
        video_url: "media/social/videos/prova2.webm",
        alt_text: "Vídeo 2"
      },
      {
        id: 3,
        video_url: "media/social/videos/prova3.webm",
        alt_text: "Vídeo 3"
      },
      {
        id: 4,
        video_url: "media/social/videos/prova4.webm",
        alt_text: "Vídeo 4"
      }
    ]
  },

  branding: {
    watermark_logo: "JP GLASS"
  }
};