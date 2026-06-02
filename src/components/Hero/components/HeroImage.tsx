import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import {
  ImageSection,
  ProductImage,
} from '../styles';

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
  '/media/hero/images/item-12.png'
];
export function HeroImage() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <ImageSection>
      <AnimatePresence mode="wait">
        <ProductImage
          key={images[currentImage]}
          src={images[currentImage]}
          alt="Custom Glass Piece"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
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