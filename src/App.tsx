import { useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

import Hero from './components/Hero';
import ProblemStatement from './components/ProblemStatement';
import HelionyxSolution from './components/HelionyxSolution';
import CorePrinciples from './components/CorePrinciples';
import SystemOverview from './components/SystemOverview';
import WhoThisIsFor from './components/WhoThisIsFor';
// import Pricing from './components/Pricing';
import BrandStory from './components/BrandStory';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import Header from './components/Header';
import TopLogo from './components/TopLogo';
import TrialCountdown from './components/TrialCountdown';
import RequestAccessModal from './components/RequestAccessModal';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText, useGSAP);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useGSAP(() => {
    if (!isLoading) {
      // Initialize ScrollSmoother
      ScrollSmoother.create({
        wrapper: '#smooth-wrapper',
        content: '#smooth-content',
        smooth: 1.5, // Elite, weighted feel
        effects: true,
        smoothTouch: 0.1,
      });
    }
  }, [isLoading]);

  return (
    <>
      <Preloader onFinish={() => setIsLoading(false)} />

      {/* Fixed Elements (Outside Smooth Content) */}
      {!isLoading && (
        <>
          <TrialCountdown />
          <TopLogo />
          <Header onOpenModal={() => setIsModalOpen(true)} />
        </>
      )}

      {/* Smooth Scroll Container */}
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className={`bg-obsidian min-h-screen text-off-white selection:bg-gold-muted selection:text-obsidian transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
            <Hero onOpenModal={() => setIsModalOpen(true)} />
            <ProblemStatement />
            <HelionyxSolution />
            <CorePrinciples />
            <SystemOverview />
            <WhoThisIsFor />
            {/* <Pricing /> */}
            <BrandStory />
            <Footer />
          </div>
        </div>
      </div>

      {/* Global Modals (Outside Smooth Content) */}
      <RequestAccessModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}

export default App;
