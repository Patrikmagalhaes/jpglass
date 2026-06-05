import React from 'react';
import styled from 'styled-components';
import { BgText } from '../Hero/styles';
import { theme } from '../../styles/theme';
import ModelViewer from './ModelViewer';



const Container = styled.section`
  width: 100%;
  background-color: #000000;
  position: relative;
  overflow: hidden;
  height:100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  color: #fff;

  padding: 4rem 0;
`;





const Content = styled.div`
  width: 100%;
  max-width: 1600px;

  display: grid;
  grid-template-columns: 1fr 2fr 1fr;

  align-items: center;
  padding: 0 4rem;
  z-index: 5;
  position: relative;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;

    justify-content: center;
    gap: 2rem;

    padding: 2rem 1rem;
    height: 100vh;
  }
`;

const LeftSide = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
`;

const GraffitiTitle = styled.h1`
  font-family: ${theme.fonts.hero};
  font-size: clamp(4rem, 5vw, 6rem);
  line-height: 0.85;
  color: #7B2EFF;
  margin: 0;
  display: flex;
  flex-direction: column;

  .mobile {
    display: none;
  }

  .desktop {
    display: block;
  }

  @media (max-width: 1024px) {
    font-size: 5rem;
    align-items: center;
    text-align: center;

    .desktop {
      display: none;
    }

    .mobile {
      display: block;
    }
  }
`;
const CenterSide = styled.div`
  flex: 1;

  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    flex: 1;

    width: 100%;
    min-height: 55vh;
  }
`;

// const ProductWrapper = styled.div`
//   position: relative;
//   cursor: pointer;
//   transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);

//   &:hover {
//     transform: scale(1.05);
//   }
// `;

// const ProductImg = styled.img`
//   width: 100%;
//   max-width: 600px;
//   height: auto;
// `;



const RightSide = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  height: 100%;
`;

const InfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  transform: translateY(40px);

  @media (max-width: 768px) {
    transform: none;
    align-items: center;
    text-align: center;
  }
`;

const SerieTitle = styled.h2`
  font-family: 'Oswald', sans-serif;
  font-size: 1rem;
  color: #FDFD96;
  letter-spacing: 0.15em;
  margin: 0;
  text-transform: uppercase;
  font-weight: 700;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 1.6rem;
  }
`;

const SoldLabel = styled.span`
  font-family: 'Oswald', sans-serif;
  font-size: 0.5rem;
  color: #E60000;
  letter-spacing: 0.25em;
  font-weight: 700;
  text-transform: uppercase;
  opacity: 0.95;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const Showcase: React.FC = () => {

  return (
    <Container id="showcase">



      <Content>
        <LeftSide>
          <GraffitiTitle>
            <span>BONG</span>

            <span className="desktop">COGU</span>
            <span className="desktop">MELO</span>

            <span className="mobile">COGUMELO</span>
          </GraffitiTitle>
        </LeftSide>

        <CenterSide>


          <ModelViewer />
        </CenterSide>

        <RightSide>
          <InfoBlock>
            <SerieTitle>SÉRIE AUTORAL</SerieTitle>
            <SoldLabel>SOLD OUT</SoldLabel>
          </InfoBlock>
        </RightSide>
      </Content>

      <BgText>
        JP GLASS
      </BgText>
    </Container>
  );
};

export default Showcase;
