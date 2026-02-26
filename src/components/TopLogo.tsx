import { useState, useEffect } from 'react';
import logo from '../assets/helios-logo.png';

const TopLogo = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isAtFooter, setIsAtFooter] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPos = window.scrollY;
            setIsScrolled(scrollPos > 100);

            // Hide when footer is reached
            const footer = document.getElementById('footer');
            if (footer) {
                const footerTop = footer.offsetTop;
                const windowHeight = window.innerHeight;
                setIsAtFooter(scrollPos + windowHeight > footerTop + 100);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className={`fixed top-20 left-1/2 -translate-x-1/2 z-[110] transition-all duration-1000 ${isAtFooter ? 'opacity-0 -translate-y-12 pointer-events-none' : isScrolled ? 'opacity-40 scale-75 blur-[1px]' : 'opacity-100 scale-100'}`}>
            <div className="relative group cursor-pointer flex flex-col items-center" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                {/* Subtle Glow Backdrop */}
                <div className="absolute inset-x-[-100%] inset-y-[-50%] bg-gold-muted/5 blur-3xl -z-10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

                {/* Logo Image */}
                <img
                    src={logo}
                    alt="Helios XAU Logo"
                    className="h-24 md:h-32 w-auto object-contain transition-all duration-500 drop-shadow-[0_0_15px_rgba(255,215,0,0.2)] group-hover:drop-shadow-[0_0_30px_rgba(255,215,0,0.5)]"
                />

                {/* Brand Name Text */}
                <div className="mt-2 flex flex-col items-center opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-2 group-hover:translate-y-0">
                    {/* <span className="text-[10px] font-sans font-bold tracking-[0.4em] uppercase text-gold-muted">HELIOS XAU</span> */}
                    {/* <div className="h-[1px] w-8 bg-gold-muted/50 mt-1"></div> */}
                    <span className="text-[7px] font-mono tracking-[0.2em] uppercase text-gray-500 -mt-1">Institutional Precision</span>
                </div>
            </div>
        </div>
    );
};

export default TopLogo;
