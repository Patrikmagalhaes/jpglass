import { useState, useRef } from 'react';
import type { CarouselItem } from '../../types';
import {
  SectionWrapper,
  CarouselContainer,
  Track,
  CardWrapper,
  ImageContainer,
  GlassGleam,
  DarkOverlay,
  BlueGlowRing,
  ContentOverlay,
  UserLine,
  CardVideo
} from './Carousel.styles';

interface CarouselProps {
  items: CarouselItem[];
  autoplay: boolean;
  pauseOnHover: boolean;
  pauseOnTouch: boolean;
}

export default function Carousel({
  items,
  autoplay,
  pauseOnHover,
  pauseOnTouch,
}: CarouselProps) {
  const [isPaused, setIsPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  // For infinite carousel, duplicate the items so there is a smooth wrapping effect
  const doubleItems = [...items, ...items, ...items];

  const handleMouseEnter = () => {
    if (pauseOnHover) setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  const handleTouchStart = () => {
    if (pauseOnTouch) setIsPaused(true);
  };

  const handleTouchEnd = () => {
    setIsPaused(false);
  };

  return (
    <SectionWrapper id="social-proof-carousel-wrapper">
      <CarouselContainer
        id="social-proof-carousel"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <Track
          id="carousel-track"
          ref={trackRef}
          $isPaused={!autoplay || isPaused}
          $speedSeconds={32}
        >
          {doubleItems.map((item, index) => (
            <CardWrapper
              id={`carousel-item-${item.id}-${index}`}
              key={`${item.id}-${index}`}
              $isHighlighted={item.is_highlighted}
              role="img"
              aria-label={item.alt_text}
            >
              <ImageContainer>


                {/* <CardImage 
                  src={item.thumbnail_url} 
                  alt={item.alt_text} 
                  referrerPolicy="no-referrer"
                /> */}
                <CardVideo autoPlay
                  muted
                  loop controls={false} >
                  <source src={item.video_url} type='video/mp4' />
                </CardVideo>

                <GlassGleam />
                <DarkOverlay />
                <BlueGlowRing />

                <ContentOverlay>
                  <UserLine>

                    <span>@{item.username}</span>
                    <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
                    <span style={{ color: '#00e5ff', fontSize: '10px' }}>{item.tag_product}</span>
                  </UserLine>
                </ContentOverlay>
              </ImageContainer>
            </CardWrapper>
          ))}
        </Track>
      </CarouselContainer>

  
    </SectionWrapper>
  );
}
