import { useState, useEffect } from 'react';
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
import Pricing from './components/Pricing';
import BrandStory from './components/BrandStory';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import Header from './components/Header';
import TopLogo from './components/TopLogo';
import RequestAccessModal from './components/RequestAccessModal';
import { getUsdtIdrRate } from './utils/cryptoApi';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText, useGSAP);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('1');
  const [usdtRate, setUsdtRate] = useState<number>(16700);

  useEffect(() => {
    const fetchRate = async () => {
      const rate = await getUsdtIdrRate();
      setUsdtRate(rate);
    };
    fetchRate();
    // Optional: Refresh rate every 5 minutes
    const interval = setInterval(fetchRate, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const handleOpenModal = (planId: string = '1') => {
    setSelectedPlan(planId);
    setIsModalOpen(true);
  };

  useGSAP(() => {
    if (!isLoading) {
      const isMobile = window.innerWidth < 768;

      // Initialize ScrollSmoother
      ScrollSmoother.create({
        wrapper: '#smooth-wrapper',
        content: '#smooth-content',
        smooth: isMobile ? 0.8 : 1.5, // Reduced smooth on mobile for responsiveness
        effects: true,
        smoothTouch: 0.1,
        normalizeScroll: isMobile, // Prevents address bar jitters and scroll lag on mobile
      });
    }
  }, [isLoading]);

  return (
    <>
      <Preloader onFinish={() => setIsLoading(false)} />

      {/* Fixed Elements (Outside Smooth Content) */}
      {!isLoading && (
        <>
          <TopLogo />
          <Header onOpenModal={() => handleOpenModal()} />
        </>
      )}

      {/* Smooth Scroll Container */}
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className={`bg-obsidian min-h-screen text-off-white selection:bg-gold-muted selection:text-obsidian transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
            <Hero onOpenModal={() => handleOpenModal('1')} />
            <ProblemStatement />
            <HelionyxSolution />
            <CorePrinciples />
            <SystemOverview />
            <WhoThisIsFor />
            <Pricing onOpenModal={handleOpenModal} usdtRate={usdtRate} />
            <BrandStory />
            <Footer />
          </div>
        </div>
      </div>

      {/* Global Modals (Outside Smooth Content) */}
      <RequestAccessModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialDuration={selectedPlan}
        usdtRate={usdtRate}
      />
    </>
  );
}

export default App;
