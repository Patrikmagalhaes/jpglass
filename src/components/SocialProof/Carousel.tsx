import { useState, useRef } from 'react';
import type { CarouselItem } from '../../types';
import {
  SectionWrapper,
  CarouselContainer,
  Track,
  CardWrapper,
  ImageContainer,
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
              role="img"
              aria-label={item.alt_text}
            >
              <ImageContainer>
                <CardVideo
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls={false}
                >
                  <source src={item.video_url} type="video/mp4" />
                </CardVideo>
              </ImageContainer>
            </CardWrapper>
          ))}
        </Track>
      </CarouselContainer>
    </SectionWrapper>
  );
}