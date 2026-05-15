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
          DESIGN EM VIDRO DIRETO DO MAÇARICO.
          GARANTA PEÇAS EXCLUSIVAS DO DROP
          ATUAL OU ENCOMENDE A SUA DO ZERO.
        </Subtitle>

        <HeroButtons />
      </TextSection>

      <HeroImage />
    </MainContent>
  );
}