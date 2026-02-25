import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/SplitText';
import Section from './Section';

const WhoThisIsFor = () => {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        if (!containerRef.current) return;

        const headers = containerRef.current.querySelectorAll('h3');
        const listItems = containerRef.current.querySelectorAll('li');

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 85%',
            }
        });

        headers.forEach(h => {
            const split = new SplitText(h, { type: 'words', wordsClass: 'overflow-hidden' });
            tl.from(split.words, {
                y: 20,
                opacity: 0,
                duration: 0.8,
                stagger: 0.05,
                ease: 'power2.out'
            }, 0);
        });

        tl.from(listItems, {
            y: 10,
            opacity: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: 'power1.out'
        }, 0.2);

    }, { scope: containerRef });

    return (
        <Section id="who" ref={containerRef} className="bg-charcoal/30 flex justify-center py-20">
            <div className="grid md:grid-cols-2 gap-12 max-w-5xl" style={{ willChange: 'transform, opacity' }}>

                {/* Is For */}
                <div className="space-y-6">
                    <h3 className="text-xl font-serif text-off-white tracking-widest uppercase border-b border-gold-muted/30 pb-4">Is For</h3>
                    <ul className="space-y-4">
                        <li className="flex items-center gap-4 text-gray-300">
                            <span className="w-1.5 h-1.5 bg-gold-muted/50 rounded-full"></span>
                            Traders who understand probabilities.
                        </li>
                        <li className="flex items-center gap-4 text-gray-300">
                            <span className="w-1.5 h-1.5 bg-gold-muted/50 rounded-full"></span>
                            Capital allocators seeking uncorrelated alpha.
                        </li>
                        <li className="flex items-center gap-4 text-gray-300">
                            <span className="w-1.5 h-1.5 bg-gold-muted/50 rounded-full"></span>
                            Those who value long-term compounding over quick flips.
                        </li>
                    </ul>
                </div>

                {/* Not For */}
                <div className="space-y-6 opacity-60">
                    <h3 className="text-xl font-serif text-gray-500 tracking-widest uppercase border-b border-white/5 pb-4">Not For</h3>
                    <ul className="space-y-4">
                        <li className="flex items-center gap-4 text-gray-500">
                            <span className="w-1.5 h-1.5 bg-red-900/50 rounded-full"></span>
                            Get-rich-quick mindsets.
                        </li>
                        <li className="flex items-center gap-4 text-gray-500">
                            <span className="w-1.5 h-1.5 bg-red-900/50 rounded-full"></span>
                            Signal hunters chasing alerts.
                        </li>
                        <li className="flex items-center gap-4 text-gray-500">
                            <span className="w-1.5 h-1.5 bg-red-900/50 rounded-full"></span>
                            Gamblers leveraging 1:500+.
                        </li>
                    </ul>
                </div>

            </div>
        </Section>
    );
};
export default WhoThisIsFor;
