import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/SplitText';
import Section from './Section';

const Principle = ({ title, desc }: { title: string, desc: string }) => {
    const principleRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!principleRef.current) return;

        const h3 = new SplitText(principleRef.current.querySelector('h3'), {
            type: 'lines,words',
            linesClass: 'overflow-hidden'
        });

        const p = new SplitText(principleRef.current.querySelector('p'), {
            type: 'lines',
            linesClass: 'overflow-hidden'
        });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: principleRef.current,
                start: 'top 95%',
            }
        });

        tl.from(h3.words, {
            y: 20,
            opacity: 0,
            duration: 0.6,
            stagger: 0.02,
            ease: 'power2.out'
        })
            .from(p.lines, {
                y: 10,
                opacity: 0,
                filter: 'blur(5px)',
                duration: 0.6,
                stagger: 0.05,
                ease: 'power1.out'
            }, '-=0.3');

        return () => {
            h3.revert();
            p.revert();
        };

    }, { scope: principleRef });

    return (
        <div ref={principleRef} className="border-l-2 border-gold-muted/30 pl-6 py-2 group hover:border-gold-bright transition-colors duration-300" style={{ willChange: 'transform, border-color' }}>
            <h3 className="text-xl font-serif text-white mb-2 group-hover:text-gold-bright transition-colors">{title}</h3>
            <p className="text-gray-400 font-light text-sm">{desc}</p>
        </div>
    );
};

const CorePrinciples = () => {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        if (!containerRef.current) return;

        const span = containerRef.current.querySelector('span');
        const h2 = containerRef.current.querySelector('h2');

        const spanSplit = new SplitText(span, { type: 'chars' });
        const h2Split = new SplitText(h2, { type: 'lines,words', linesClass: 'overflow-hidden' });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 80%',
            }
        });

        tl.from(spanSplit.chars, {
            opacity: 0,
            x: 10,
            stagger: 0.05,
            duration: 0.5,
            ease: 'power2.out'
        })
            .from(h2Split.words, {
                y: 60,
                rotateX: -45,
                opacity: 0,
                duration: 0.8,
                stagger: 0.03,
                ease: 'back.out(1.7)'
            }, '-=0.2');

        return () => {
            spanSplit.revert();
            h2Split.revert();
        };

    }, { scope: containerRef });

    return (
        <Section id="principles" ref={containerRef} className="bg-charcoal/30">
            <div className="max-w-5xl mx-auto" style={{ willChange: 'transform, opacity' }}>
                <div className="text-center mb-16 underline-animation overflow-hidden">
                    <span className="text-xs font-mono text-gold-muted tracking-[0.2em] uppercase">The Philosophy</span>
                    <h2 className="text-3xl md:text-5xl mt-4 font-serif text-white">Engineering The Edge</h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <Principle
                        title="Precision Over Frequency"
                        desc="We trade only highest probability setups. Patience is an edge."
                    />
                    <Principle
                        title="Risk Is Engineered"
                        desc="Drawdown limits are hard-coded. Never assume; calculate."
                    />
                    <Principle
                        title="Time Matters"
                        desc="Execution aligns with institutional liquidity flows."
                    />
                    <Principle
                        title="Zero Emotion"
                        desc="Fear and greed are removed from the equation entirely."
                    />
                </div>
            </div>
        </Section>
    );
};
export default CorePrinciples;
