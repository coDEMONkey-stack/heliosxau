import { useState, useEffect, useRef } from 'react';
import { DotLottiePlayer } from '@dotlottie/react-player';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation, faMicrochip, faQuoteLeft, faLockOpen } from '@fortawesome/free-solid-svg-icons';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import iosLottie from '../assets/ios-tab-menu.lottie';

const navigation = [
    { name: 'Problem', href: '#problem', icon: faTriangleExclamation },
    { name: 'Engine', href: '#solution', icon: faMicrochip },
    { name: 'Philosophy', href: '#brand', icon: faQuoteLeft }
];

const Header = ({ onOpenModal }: { onOpenModal: () => void }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [headerVisible, setHeaderVisible] = useState(false);
    const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
    const navRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<(HTMLAnchorElement | HTMLButtonElement | null)[]>([]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPos = window.scrollY;
            const threshold = window.innerHeight * 0.4;
            setHeaderVisible(scrollPos > threshold);

            const sections = navigation.map(item => item.href.substring(1));
            // Add 'who' section for Access if needed, but here we just track scroll for main 3
            for (let i = 0; i < sections.length; i++) {
                const element = document.getElementById(sections[i]);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                        setActiveIndex(i);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const activeItem = itemRefs.current[activeIndex];
        if (activeItem) {
            setIndicatorStyle({
                left: activeItem.offsetLeft,
                width: activeItem.offsetWidth
            });
        }
    }, [activeIndex]);

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string, index: number) => {
        e.preventDefault();
        const element = document.getElementById(href.substring(1));
        if (element) {
            const smoother = ScrollSmoother.get();
            if (smoother) {
                smoother.scrollTo(element, true, "top 120");
            } else {
                window.scrollTo({
                    top: element.offsetTop - 120,
                    behavior: 'smooth'
                });
            }
            setActiveIndex(index);
        }
    };

    return (
        <header className={`fixed bottom-12 left-1/2 -translate-x-1/2 z-[100] transition-all duration-1000 w-full max-w-fit px-6 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12 pointer-events-none'}`}>
            <nav ref={navRef} className="relative bg-obsidian/40 backdrop-blur-[24px] border border-white/10 rounded-[2.5rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.8)] px-5 py-3.5 flex items-center justify-center gap-2 md:gap-4 overflow-visible ring-1 ring-white/5">

                {/* Liquid Glass Indicator */}
                <div
                    className="absolute h-[85%] z-10 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] overflow-hidden rounded-[1.5rem]"
                    style={{
                        left: `${indicatorStyle.left}px`,
                        width: `${indicatorStyle.width}px`,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'linear-gradient(180deg, rgba(212, 175, 55, 0.1) 0%, rgba(212, 175, 55, 0.02) 100%)',
                        boxShadow: 'inset 0 0 20px rgba(212, 175, 55, 0.1), 0 0 1px 1px rgba(255, 255, 255, 0.05)'
                    }}
                >
                    <div className="absolute inset-0 scale-[2] opacity-40 mix-blend-color-dodge">
                        <DotLottiePlayer
                            src={iosLottie}
                            autoplay
                            loop
                            style={{ width: '100%', height: '100%' }}
                        />
                    </div>
                </div>

                {navigation.map((item, index) => (
                    <a
                        key={item.name}
                        href={item.href}
                        ref={el => { itemRefs.current[index] = el; }}
                        onClick={(e) => scrollToSection(e, item.href, index)}
                        className={`relative z-20 flex flex-col items-center justify-center w-[75px] md:w-[95px] py-1 transition-all duration-700 group ${activeIndex === index
                            ? 'text-gold-bright'
                            : 'text-gray-400 hover:text-off-white'
                            }`}
                    >
                        <div className={`text-xl md:text-2xl mb-1 transition-all duration-700 ${activeIndex === index ? 'scale-115 -translate-y-1' : 'group-hover:scale-110'}`}>
                            <FontAwesomeIcon icon={item.icon} className={activeIndex === index ? 'drop-shadow-[0_0_8px_rgba(255,215,0,0.5)]' : ''} />
                        </div>
                        <span className={`text-[9px] md:text-[10px] font-sans font-bold tracking-[0.15em] uppercase transition-all duration-700 ${activeIndex === index ? 'opacity-100 scale-105' : 'opacity-40 group-hover:opacity-100'}`}>
                            {item.name}
                        </span>
                    </a>
                ))}

                <div className="w-[1px] h-6 bg-white/10 mx-1 hidden md:block"></div>

                {/* ACCESS Button styled like a tab */}
                <button
                    onClick={() => {
                        onOpenModal();
                        setActiveIndex(5);
                    }}
                    ref={el => { itemRefs.current[5] = el; }}
                    className={`relative z-20 flex flex-col items-center justify-center w-[75px] md:w-[95px] py-1 transition-all duration-700 group ${activeIndex === 5
                        ? 'text-gold-bright'
                        : 'text-gray-400 hover:text-off-white'
                        }`}
                >
                    <div className={`text-xl md:text-2xl mb-1 transition-all duration-700 ${activeIndex === 5 ? 'scale-115 -translate-y-1' : 'group-hover:scale-110'}`}>
                        <FontAwesomeIcon icon={faLockOpen} className={activeIndex === 5 ? 'drop-shadow-[0_0_8px_rgba(255,215,0,0.5)]' : ''} />
                    </div>
                    <span className={`text-[9px] md:text-[10px] font-sans font-bold tracking-[0.15em] uppercase transition-all duration-700 ${activeIndex === 5 ? 'opacity-100 scale-105' : 'opacity-40 group-hover:opacity-100'}`}>
                        Access
                    </span>
                </button>
            </nav>
        </header>
    );
};

export default Header;
