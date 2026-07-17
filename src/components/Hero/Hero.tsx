import {
  HeroContainer,
  BgText,
  BgTextMobile,
} from './styles';

import { HeroNavbar } from './components/HeroNavBar';

import { HeroContent } from './components/HeroContent';

import { HeroMarquee } from './components/HeroMarquee';

export function Hero() {
  return (
    <HeroContainer id="home">
      <HeroNavbar />

      <HeroContent />

      <HeroMarquee />

      <BgText>
        JP GLASS
      </BgText>

      <BgTextMobile>
        JP
        <br />
        GLA
        <br />
        SS
      </BgTextMobile>
    </HeroContainer>
  );
}