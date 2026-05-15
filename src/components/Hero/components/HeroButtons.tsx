import {
  ShoppingBag,
  Hammer,
} from 'lucide-react';

import {
  ButtonGroup,
  PrimaryButton,
  SecondaryButton,
} from '../styles';

export function HeroButtons() {
  return (
    <ButtonGroup>
      <PrimaryButton
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Peças Disponíveis

        <ShoppingBag size={18} />
      </PrimaryButton>

      <SecondaryButton
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Customizar Peça

        <Hammer size={18} />
      </SecondaryButton>
    </ButtonGroup>
  );
}