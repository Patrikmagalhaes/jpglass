import {
  ImageSection,
  ProductImage,
} from '../styles';

import { imageAnimation } from '../animations';

export function HeroImage() {
  return (
    <ImageSection>
      <ProductImage
        src="/images/bong.png"
        alt="Custom Glass Piece"
        {...imageAnimation}
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
    </ImageSection>
  );
}