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
