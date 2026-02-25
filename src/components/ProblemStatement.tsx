import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/SplitText';
import Section from './Section';

const ProblemStatement = () => {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        if (!containerRef.current) return;

        // Title Animation
        const titleSplit = new SplitText(containerRef.current.querySelector('h2'), {
            type: 'lines,words',
            linesClass: 'overflow-hidden'
        });

        gsap.from(titleSplit.words, {
            y: 100,
            rotateX: -80,
            opacity: 0,
            duration: 1.2,
            stagger: 0.05,
            ease: 'power4.out',
            scrollTrigger: {
                trigger: containerRef.current.querySelector('h2'),
                start: 'top 85%',
            }
        });

        // Paragraphs Animation (Nested tags support)
        const paragraphs = containerRef.current.querySelectorAll('p');
        const pSplits: SplitText[] = [];

        paragraphs.forEach((p) => {
            const split = new SplitText(p, {
                type: 'lines',
                linesClass: 'overflow-hidden'
            });
            pSplits.push(split);

            gsap.from(split.lines, {
                y: 30,
                opacity: 0,
                filter: 'blur(10px)',
                duration: 1,
                stagger: 0.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: p,
                    start: 'top 85%',
                }
            });
        });

        return () => {
            titleSplit.revert();
            pSplits.forEach(s => s.revert());
        };
    }, { scope: containerRef });

    return (
        <Section id="problem" ref={containerRef} className="bg-charcoal/30 flex items-center justify-center min-h-[60vh]">
            <div className="max-w-4xl text-center space-y-12" style={{ willChange: 'transform, opacity' }}>
                <h2 className="text-3xl md:text-4xl text-off-white font-serif tracking-wide border-b border-gold-muted/20 pb-6 inline-block">
                    The Retail Trader's Dilemma
                </h2>

                <div className="space-y-8 text-xl md:text-2xl font-light text-gray-300 leading-relaxed">
                    <p>
                        <span className="text-gold-muted font-normal">Emotional Overtrading</span> erodes capital faster than any strategy can build it.
                    </p>
                    <p>
                        Implementation lag during high volatility leads to <span className="text-alert-red font-mono">slippage</span> and missed entries.
                    </p>
                    <p>
                        Gold markets move with institutional precision—retail inefficiency is simply the <span className="italic">liquidity</span> they feed on.
                    </p>
                </div>
            </div>
        </Section>
    );
};

export default ProblemStatement;
