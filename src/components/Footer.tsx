import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/SplitText';
import logo from '../assets/helios-logo.png';

const Footer = () => {
    const footerRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        if (!footerRef.current) return;

        const p = footerRef.current.querySelector('.footer-desc');
        const split = new SplitText(p, { type: 'words,chars', charsClass: 'opacity-0' });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: p,
                start: 'top 90%',
            }
        });

        tl.fromTo(split.chars,
            {
                opacity: 0,
                y: 20,
                rotateX: -90,
                color: '#d4af37'
            },
            {
                opacity: 1,
                y: 0,
                rotateX: 0,
                color: '#ffffff',
                duration: 0.8,
                stagger: 0.02,
                ease: 'back.out(1.7)'
            }
        );

        return () => split.revert();
    }, { scope: footerRef });

    return (
        <footer id="footer" ref={footerRef} className="bg-obsidian py-24 border-t border-gold-muted/10">
            <div className="max-w-4xl mx-auto px-6 flex flex-col items-center text-center mb-16" style={{ willChange: 'transform, opacity' }}>
                <img src={logo} alt="Helios XAU Logo" className="h-48 w-auto object-contain mb-2 opacity-90 drop-shadow-[0_0_20px_rgba(255,215,0,0.3)]" />
                <p className="footer-desc text-white text-xl md:text-2xl leading-relaxed max-w-2xl font-serif tracking-wide px-4 mt-2">
                    Automated precision trading systems for gold markets.
                    <br className="hidden md:block" />
                    Institutional logic engineered for the private investor.
                </p>
            </div>

            <div className="max-w-6xl mx-auto px-6 pt-8 border-t border-white/5 text-[10px] text-gray-600 space-y-4">
                <p>
                    RISK WARNING: Trading foreign exchange and precious metals on margin carries a high level of risk and may not be suitable for all investors. The high degree of leverage can work against you as well as for you. Before deciding to trade, you should carefully consider your investment objectives, level of experience, and risk appetite.
                </p>
                <p>
                    PAST PERFORMANCE IS NOT INDICATIVE OF FUTURE RESULTS. No representation is being made that any account will or is likely to achieve profits or losses similar to those shown.
                </p>
                <div className="flex justify-between pt-4 xs:mb-32 sm:mb-0">
                    © {new Date().getFullYear()} HELIOS XAU. All Rights Reserved.
                </div>
            </div>
        </footer>
    );
};
export default Footer;
