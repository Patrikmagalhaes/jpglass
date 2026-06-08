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
          Drops limitados e peças customizadas feitas à mão para acompanhar suas melhores sessões.
        </Subtitle>

        <HeroButtons />
      </TextSection>

      <HeroImage />
    </MainContent>
  );
}