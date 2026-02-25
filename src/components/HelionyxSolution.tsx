import { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/SplitText';
import Section from './Section';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrochip, faShieldHalved, faWaveSquare, faClock } from '@fortawesome/free-solid-svg-icons';
import ParticleCanvas from './ParticleCanvas';

const SolutionCard = ({ icon, title, text }: { icon: any, title: string, text: string }) => {
    const [isHovered, setIsHovered] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!cardRef.current) return;

        const titleSplit = new SplitText(cardRef.current.querySelector('h3'), {
            type: 'lines,words',
            linesClass: 'overflow-hidden'
        });

        const textSplit = new SplitText(cardRef.current.querySelector('p'), {
            type: 'lines',
            linesClass: 'overflow-hidden'
        });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: cardRef.current,
                start: 'top 90%',
            }
        });

        tl.from(titleSplit.words, {
            y: 20,
            opacity: 0,
            duration: 0.8,
            stagger: 0.02,
            ease: 'power3.out'
        })
            .from(textSplit.lines, {
                y: 15,
                opacity: 0,
                filter: 'blur(8px)',
                duration: 0.8,
                stagger: 0.1,
                ease: 'power2.out'
            }, '-=0.4');

        return () => {
            titleSplit.revert();
            textSplit.revert();
        };

    }, { scope: cardRef });

    return (
        <div
            ref={cardRef}
            className="relative bg-charcoal/50 border border-gold-muted/10 p-8 rounded-sm hover:border-gold-muted/40 transition-all duration-300 group overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ willChange: 'transform, border-color' }}
        >
            <ParticleCanvas active={isHovered} />

            <div className="relative z-10">
                <div className="mb-6 text-gold-muted text-3xl group-hover:scale-110 transition-transform duration-300">
                    <FontAwesomeIcon icon={icon} />
                </div>
                <h3 className="text-xl font-serif text-off-white mb-3">{title}</h3>
                <p className="text-gray-400 font-light text-sm leading-relaxed tracking-wider">{text}</p>
            </div>
        </div>
    );
};

const HelionyxSolution = () => {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        if (!containerRef.current) return;

        const h2 = containerRef.current.querySelector('h2');
        const p = containerRef.current.querySelector('.main-desc');

        const titleSplit = new SplitText(h2, {
            type: 'lines,words',
            linesClass: 'overflow-hidden'
        });

        const pSplit = new SplitText(p, {
            type: 'lines',
            linesClass: 'overflow-hidden'
        });

        gsap.from(titleSplit.words, {
            y: 50,
            rotateX: -45,
            opacity: 0,
            duration: 1,
            stagger: 0.05,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: h2,
                start: 'top 85%',
            }
        });

        gsap.from(pSplit.lines, {
            y: 20,
            opacity: 0,
            filter: 'blur(10px)',
            duration: 1,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: p,
                start: 'top 85%',
            }
        });

        return () => {
            titleSplit.revert();
            pSplit.revert();
        };

    }, { scope: containerRef });

    return (
        <Section id="solution" ref={containerRef} className="grid lg:grid-cols-12 gap-12 bg-obsidian">
            {/* Title Block */}
            <div className="lg:col-span-4 space-y-6 self-start lg:sticky lg:top-24" style={{ willChange: 'transform, opacity' }}>
                <div className="w-12 h-[1px] bg-gold-muted/50 mb-4"></div>
                <h2 className="text-4xl text-off-white font-bold font-serif leading-tight">
                    The <br /> <span className="text-gold-muted">HELIOS XAU</span> <br /> Engine
                </h2>
                <p className="text-gray-400 max-w-sm leading-relaxed font-light main-desc">
                    A multi-layered execution system designed to navigate XAUUSD market structure. Not a simple signal provider, but a comprehensive risk framework.
                </p>
            </div>

            {/* Grid of Solutions */}
            <div className="lg:col-span-8 grid md:grid-cols-2 gap-6">
                <SolutionCard
                    icon={faMicrochip}
                    title="Algorithmic Discipline"
                    text="Removing human cognitive bias. The engine executes based on strict rule sets, eliminating hesitation and FOMO."
                />
                <SolutionCard
                    icon={faClock}
                    title="Session-Specific Timing"
                    text="Targeting high-volume liquidity windows. The system remains dormant during low-probability consolidation phases."
                />
                <SolutionCard
                    icon={faShieldHalved}
                    title="Dynamic Risk Allocation"
                    text="Adjusting position sizing based on volatility index measurements. Preservation of capital is the primary directive."
                />
                <SolutionCard
                    icon={faWaveSquare}
                    title="Volatility Filtering"
                    text="Distinguishing between noise and trend. Advanced fractal analysis to confirm market direction before entry."
                />
            </div>
        </Section>
    );
};

export default HelionyxSolution;
