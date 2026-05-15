
import { Hero } from './components/Hero/Hero';
import JourneyOptions from './components/JourneyOptions/JourneyOptions';
import Showcase from './components/ShowCase/ShowCase';

export default function App() {
  return (
    <div id="app-root">
      <Hero />
      <JourneyOptions/>
      <Showcase/>
    </div>
  );
}
