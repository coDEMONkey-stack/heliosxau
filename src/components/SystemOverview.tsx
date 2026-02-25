import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/SplitText';
import Section from './Section';
import MarketStructureVisual from './MarketStructureVisual';

const SystemOverview = () => {
    const containerRef = useRef<HTMLElement>(null);

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
            }, '-=0.5');

        return () => {
            h2Split.revert();
            pSplit.revert();
        };
    }, { scope: containerRef });

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
        </Section>
    );
};

export default SystemOverview;
