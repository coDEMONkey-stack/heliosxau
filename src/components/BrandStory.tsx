import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/SplitText';
import Section from './Section';

const BrandStory = () => {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        if (!containerRef.current) return;

        const h2 = containerRef.current.querySelector('h2');
        const p = containerRef.current.querySelector('p');

        const h2Split = new SplitText(h2, { type: 'lines,words', linesClass: 'overflow-hidden' });
        const pSplit = new SplitText(p, { type: 'lines', linesClass: 'overflow-hidden' });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 80%',
            }
        });

        tl.from(h2Split.words, {
            y: 80,
            rotateX: -30,
            opacity: 0,
            duration: 1.2,
            stagger: 0.05,
            ease: 'power4.out'
        })
            .from(pSplit.lines, {
                y: 20,
                opacity: 0,
                filter: 'blur(10px)',
                duration: 1,
                stagger: 0.2,
                ease: 'power2.out'
            }, '-=0.6');

        return () => {
            h2Split.revert();
            pSplit.revert();
        };
    }, { scope: containerRef });

    return (
        <Section id="brand" ref={containerRef} className="text-center py-32 bg-black border-t border-gold-muted/10">
            <div className="max-w-3xl mx-auto space-y-8" style={{ willChange: 'transform, opacity' }}>
                <h2 className="text-4xl md:text-6xl font-serif text-white tracking-tight">
                    Balance in Chaos. <br />
                    <span className="text-gold-muted italic px-2">Discipline</span> in Freedom.
                </h2>
                <p className="text-xl text-gray-400 font-light leading-relaxed">
                    HELIOS XAU is not just bot. It is an extension of logic into the market.
                    Where others see noise, we see structure. Where others feel fear, we Execute.
                </p>
                <div className="w-24 h-[1px] bg-gold-muted mx-auto mt-12 opacity-50"></div>
            </div>
        </Section>
    );
};
export default BrandStory;
