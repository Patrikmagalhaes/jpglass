import {
  MarqueeWrapper,
  MarqueeContent,
  MarqueeItem,
} from '../styles';

import { marqueeItems } from '../constants';

export function HeroMarquee() {
  return (
    <MarqueeWrapper>
      <MarqueeContent>
        {[...marqueeItems, ...marqueeItems].map(
          (item, index) => (
            <MarqueeItem key={index}>
              {item}
            </MarqueeItem>
          )
        )}
      </MarqueeContent>
    </MarqueeWrapper>
  );
}