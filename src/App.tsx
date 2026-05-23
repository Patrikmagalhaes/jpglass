
import { Hero } from './components/Hero/Hero';
import JourneyOptions from './components/JourneyOptions/JourneyOptions';
import Showcase from './components/ShowCase/ShowCase';
import TheArtist from './components/TheArtist/TheArtist';

export default function App() {
  return (
    <div id="app-root">
      <Hero />
      <JourneyOptions/>
      <Showcase/>
      <TheArtist/>
    </div>
  );
}
