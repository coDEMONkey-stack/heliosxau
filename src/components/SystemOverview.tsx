import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/SplitText';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import Section from './Section';
import MarketStructureVisual from './MarketStructureVisual';
import benefit1 from '../assets/benefits/benefit1.jpeg';
import benefit2 from '../assets/benefits/benefit2.jpeg';
import benefit3 from '../assets/benefits/benefit3.jpeg';
import InvestmentCalculator from './InvestmentCalculator';

const SystemOverview = () => {
    const containerRef = useRef<HTMLElement>(null);
    const [selectedImage, setSelectedImage] = useState<{ img: string, label: string } | null>(null);

    useGSAP(() => {
        if (!containerRef.current) return;

        const h2 = containerRef.current.querySelector('h2');
        const p = containerRef.current.querySelector('.main-p');
        const statItems = containerRef.current.querySelectorAll('.stat-item');

        const h2Split = new SplitText(h2, { type: 'lines,words', linesClass: 'overflow-hidden' });
        const pSplit = new SplitText(p, { type: 'lines', linesClass: 'overflow-hidden' });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 80%',
            }
        });

        tl.from(h2Split.words, {
            y: 50,
            rotateX: -45,
            opacity: 0,
            duration: 1,
            stagger: 0.05,
            ease: 'power3.out'
        })
            .from(pSplit.lines, {
                y: 20,
                opacity: 0,
                filter: 'blur(10px)',
                duration: 1,
                stagger: 0.1,
                ease: 'power2.out'
            }, '-=0.5')
            .from(statItems, {
                x: -20,
                opacity: 0,
                stagger: 0.1,
                duration: 0.8,
                ease: 'power2.out'
            }, '-=0.5')
            .from('.backtest-header', {
                y: 30,
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            }, '-=0.3')
            .from('.backtest-frame', {
                y: 50,
                opacity: 0,
                scale: 0.9,
                rotateX: -10,
                stagger: 0.2,
                duration: 1.2,
                ease: 'power4.out'
            }, '-=0.8');

        return () => {
            h2Split.revert();
            pSplit.revert();
        };
    }, { scope: containerRef });

    useGSAP(() => {
        if (selectedImage) {
            gsap.fromTo('.zoom-overlay', { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power2.out' });
            gsap.fromTo('.zoom-content',
                { scale: 0.8, opacity: 0, y: 20 },
                { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.7)' }
            );
        }
    }, [selectedImage]);

    const closeZoom = () => {
        gsap.to('.zoom-content', { scale: 0.9, opacity: 0, y: 20, duration: 0.3, ease: 'power2.in', onComplete: () => setSelectedImage(null) });
        gsap.to('.zoom-overlay', { opacity: 0, duration: 0.3, ease: 'power2.in' });
    };

    return (
        <Section id="system" ref={containerRef} className="bg-obsidian border-y border-gold-muted/10">
            <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-8 order-2 lg:order-1" style={{ willChange: 'transform, opacity' }}>
                    <h2 className="text-3xl md:text-4xl font-serif text-white leading-tight">
                        <span className="block text-gold-muted text-sm font-sans mb-4 font-bold tracking-[0.3em] uppercase opacity-70">The Mechanics</span>
                        Engineered <br /> Execution Precision.
                    </h2>
                    <div className="space-y-6 text-gray-400 font-light leading-relaxed">
                        <p className="main-p">
                            The HELIOS XAU Engine operates on a multi-timeframe correlation model. It does not guess; it reacts to confirmed structural breaks and liquidity sweeps.
                        </p>
                        <div className="grid sm:grid-cols-2 gap-8 pt-4">
                            <div className="space-y-2 border-l border-gold-muted/30 pl-6 stat-item">
                                <span className="text-white font-medium block text-sm tracking-widest uppercase">Session Focus</span>
                                <span className="text-xs text-gray-500 uppercase tracking-tighter">London & New York Overlap</span>
                            </div>
                            <div className="space-y-2 border-l border-gold-muted/30 pl-6 stat-item">
                                <span className="text-white font-medium block text-sm tracking-widest uppercase">Risk Protocol</span>
                                <span className="text-xs text-gray-500 uppercase tracking-tighter">Dynamic ATR Volatility</span>
                            </div>
                            <div className="space-y-2 border-l border-gold-muted/30 pl-6 stat-item">
                                <span className="text-white font-medium block text-sm tracking-widest uppercase">Execution</span>
                                <span className="text-xs text-gray-500 uppercase tracking-tighter">Institutional Liquidity</span>
                            </div>
                            <div className="space-y-2 border-l border-gold-muted/30 pl-6 stat-item">
                                <span className="text-white font-medium block text-sm tracking-widest uppercase">Latency</span>
                                <span className="text-xs text-gray-500 uppercase tracking-tighter">&lt; 15ms Worldwide</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Advanced System Visual */}
                <div className="order-1 lg:order-2 flex items-center justify-center relative py-12" style={{ willChange: 'transform' }}>
                    <MarketStructureVisual />
                </div>
            </div>

            {/* Backtest Results */}
            <div className="mt-24 pt-16 border-t border-gold-muted/10">
                <div className="text-center mb-16 backtest-header">
                    <h3 className="text-2xl md:text-3xl font-serif text-white tracking-widest uppercase mb-4">
                        Proven <span className="text-gold-muted">Execution</span> History
                    </h3>
                    <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-gold-muted to-transparent mx-auto mb-6"></div>
                    <p className="max-w-2xl mx-auto text-sm md:text-base text-gray-500 font-light tracking-wide leading-relaxed">
                        Validation through quantitative persistence. Each backtest represents institutional-grade performance across varying market cycles.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-10">
                    {[
                        { img: benefit1, label: "Structural Validation" },
                        { img: benefit2, label: "Liquidity Correlation" },
                        { img: benefit3, label: "Volatility Calibration" }
                    ].map((item, index) => (
                        <div
                            key={index}
                            className="backtest-frame group relative cursor-zoom-in"
                            onClick={() => setSelectedImage(item)}
                        >
                            {/* Greek God / Temple Frame Aesthetic */}
                            <div className="absolute inset-0 -m-1 border border-gold-muted/20 rounded-sm group-hover:border-gold-bright transition-colors duration-500"></div>

                            {/* Corner Ornaments */}
                            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-gold-muted group-hover:border-gold-bright z-10 pointer-events-none transition-colors"></div>
                            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-gold-muted group-hover:border-gold-bright z-10 pointer-events-none transition-colors"></div>
                            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-gold-muted group-hover:border-gold-bright z-10 pointer-events-none transition-colors"></div>
                            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-gold-muted group-hover:border-gold-bright z-10 pointer-events-none transition-colors"></div>

                            {/* Image Container */}
                            <div className="relative overflow-hidden bg-obsidian aspect-[4/3] rounded-sm">
                                <img
                                    src={item.img}
                                    alt={item.label}
                                    className="w-full h-full object-cover grayscale-[0.4] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out saturate-[0.8]"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent opacity-60"></div>

                                {/* Label Overlay */}
                                <div className="absolute bottom-4 left-4 right-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                    <span className="text-[10px] uppercase tracking-[0.3em] text-gold-bright font-mono bg-charcoal/80 px-3 py-1 backdrop-blur-sm border border-gold-muted/20">
                                        {item.label}
                                    </span>
                                </div>
                            </div>

                            {/* Outer Glow */}
                            <div className="absolute inset-0 shadow-[0_0_40px_rgba(197,160,89,0.05)] group-hover:shadow-[0_0_60px_rgba(197,160,89,0.15)] transition-all duration-700 pointer-events-none"></div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <p className="text-[10px] text-gold-muted/40 font-mono uppercase tracking-[0.4em]">
                        Verified institutional performance metrics
                    </p>
                </div>
            </div>

            {/* Investment Calculator Section with distinct background */}
            <div className="mt-24 py-24 bg-charcoal/80 border-t border-gold-muted/5 relative">
                {/* Decorative Pattern Background (Optional, but adds premium feel) */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:20px_20px]"></div>

                <InvestmentCalculator />
            </div>

            {/* Image Zoom Popup */}
            {selectedImage && createPortal(
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-2 md:p-8 zoom-overlay">
                    <div
                        className="absolute inset-0 bg-obsidian/95 backdrop-blur-xl"
                        onClick={closeZoom}
                    />

                    <div className="relative w-full max-w-5xl zoom-content flex flex-col">
                        {/* Greek God Aesthetic Frame */}
                        <div className="absolute inset-0 -m-2 md:-m-4 border border-gold-muted/30 rounded-sm shadow-[0_0_100px_rgba(197,160,89,0.2)]"></div>

                        {/* Corner Ornaments */}
                        <div className="absolute -top-2 -left-2 md:-top-4 md:-left-4 w-8 h-8 md:w-12 md:h-12 border-t-2 border-l-2 border-gold-bright z-10"></div>
                        <div className="absolute -top-2 -right-2 md:-top-4 md:-right-4 w-8 h-8 md:w-12 md:h-12 border-t-2 border-r-2 border-gold-bright z-10"></div>
                        <div className="absolute -bottom-2 -left-2 md:-bottom-4 md:-left-4 w-8 h-8 md:w-12 md:h-12 border-b-2 border-l-2 border-gold-bright z-10"></div>
                        <div className="absolute -bottom-2 -right-2 md:-bottom-4 md:-right-4 w-8 h-8 md:w-12 md:h-12 border-b-2 border-r-2 border-gold-bright z-10"></div>

                        <button
                            onClick={closeZoom}
                            className="absolute -top-10 md:-top-12 right-0 text-gold-muted hover:text-gold-bright transition-colors duration-300 z-20 flex items-center gap-2 uppercase font-mono text-[10px] md:text-xs tracking-[0.2em]"
                        >
                            Close Entry <FontAwesomeIcon icon={faXmark} className="text-sm md:text-lg" />
                        </button>

                        <div className="relative bg-charcoal border border-gold-muted/20 rounded-sm overflow-hidden">
                            <img
                                src={selectedImage.img}
                                alt={selectedImage.label}
                                className="w-full h-auto max-h-[90vh] md:max-h-[85vh] object-contain"
                            />

                            <div className="absolute bottom-0 left-0 w-full p-3 md:p-6 bg-gradient-to-t from-obsidian via-obsidian/60 to-transparent">
                                <span className="text-gold-bright font-serif text-base md:text-2xl tracking-widest uppercase">
                                    {selectedImage.label}
                                </span>
                                <p className="text-gray-400 text-[9px] md:text-sm font-light mt-1 md:mt-2 tracking-wide uppercase">
                                    Verified Institutional Backtest - Execution Accuracy Confirmé
                                </p>
                            </div>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </Section>
    );
};

export default SystemOverview;
