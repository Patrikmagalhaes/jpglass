
import FAQ from './components/FAQ/Faq';
import Footer from './components/Footer/Footer';
import { Hero } from './components/Hero/Hero';
import JourneyOptions from './components/JourneyOptions/JourneyOptions';
import Portfolio from './components/Portfolio/Portfolio';
import Showcase from './components/ShowCase/ShowCase';
import SocialProof from './components/SocialProof/SocialProof';
import TheArtist from './components/TheArtist/TheArtist';

export default function App() {
  return (
    <div id="app-root">
      <Hero />
      <Portfolio />
      <JourneyOptions />
      <Showcase />
      <TheArtist />
      <SocialProof />
      <FAQ/>
      <Footer/>

    </div>
  );
}
