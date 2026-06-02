import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import {
  ImageSection,
  ProductImage,
} from '../styles';
import styled from 'styled-components';


const images = [
  '/media/hero/images/item-1.png',
  '/media/hero/images/item-2.png',
  '/media/hero/images/item-3.png',
  '/media/hero/images/item-4.png',
  '/media/hero/images/item-5.png',
  '/media/hero/images/item-6.png',
  '/media/hero/images/item-7.png',
  '/media/hero/images/item-8.png',
  '/media/hero/images/item-9.png',
  '/media/hero/images/item-10.png',
  '/media/hero/images/item-11.png',
  '/media/hero/images/item-12.png',
];
export const ProductBackdrop = styled.div`
  position: absolute;
  width: 100%;
  aspect-ratio: 1;

  border-radius: 50%;

  background:
    radial-gradient(
      circle,
      rgba(212, 0, 255, 0.15) 0%,
      rgba(174, 0, 255, 0.08) 35%,
      transparent 60%
    );

  filter: blur(30px);

  z-index: 1;
`;

export function HeroImage() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <ImageSection>
      <ProductBackdrop/>
      <AnimatePresence mode="sync">
        <ProductImage
          key={images[currentImage]}
          src={images[currentImage]}
          alt="Custom Glass Piece"
          initial={{
            opacity: 0,
            filter: 'blur(12px)',
            scale: 1.08,
            rotate: -4,
            x: -10,
          }}
          animate={{
            opacity: 1,
            filter: 'blur(0px)',
            scale: 1,
            rotate: 0,
            x: 0,
          }}
          exit={{
            opacity: 0,
            filter: 'blur(12px)',
            scale: 0.95,
            rotate: 4,
            x: 10,
          }}
          transition={{
            duration: 1.5,
            ease: 'easeInOut',
          }}
          whileHover={{
            y: -20,
            rotate: 5,
            transition: {
              duration: 2,
              repeat: Infinity,
              repeatType: 'reverse',
            },
          }}
        />
      </AnimatePresence>
    </ImageSection>
  );
}