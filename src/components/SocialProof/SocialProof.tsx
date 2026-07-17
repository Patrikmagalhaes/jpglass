import Carousel from './Carousel';
import { SOCIAL_PROOF_DATA } from '../../data';
import {
  PageContainer,
  ShowcaseSection,
  MainHeadline,
  EditorialSubtext
} from './app.styles';
import { BgText, BgTextMobile } from '../Hero/styles';

export default function SocialProof() {
  const { autoplay, pause_on_hover, pause_on_touch } =
    SOCIAL_PROOF_DATA.component.behavior;

  const items = SOCIAL_PROOF_DATA.component.items;

  return (
    <>
      <PageContainer id="social">
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

        <ShowcaseSection id="app-hero">
          <MainHeadline>
            {SOCIAL_PROOF_DATA.content.title}
          </MainHeadline>

          <EditorialSubtext>
            {SOCIAL_PROOF_DATA.content.subtitle}
          </EditorialSubtext>
        </ShowcaseSection>

        <Carousel
          items={items}
          autoplay={autoplay}
          pauseOnHover={pause_on_hover}
          pauseOnTouch={pause_on_touch}
        />
      </PageContainer>
    </>
  );
}