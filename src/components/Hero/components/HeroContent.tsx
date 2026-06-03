import {
  MainContent,
  TextSection,
  Title,
  Subtitle,
} from '../styles';

import { HeroButtons } from './HeroButtons';

import { HeroImage } from './HeroImage';

import {
  titleAnimation,
  subtitleAnimation,
} from '../animations';

export function HeroContent() {
  return (
    <MainContent>
      <TextSection>
        <Title {...titleAnimation}>
          ARTE QUE
          <br />
          ELEVA SUA SESSAO.
        </Title>

        <Subtitle {...subtitleAnimation}>
          Design em vidro direto do maçarico.
          garanta peças exclusivas do drop
          atual ou encomende a sua do zero.
        </Subtitle>

        <HeroButtons />
      </TextSection>

      <HeroImage />
    </MainContent>
  );
}