import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import CandlestickChart from './CandlestickChart';
import ThreeBackground from './ThreeBackground';

const Hero = ({ onOpenModal }: { onOpenModal: () => void }) => {
    const textRef = useRef<HTMLDivElement>(null);
    const chartRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const subtextRef = useRef<HTMLParagraphElement>(null);

    useGSAP(() => {
        console.log("HELIOS: Hero animation triggered");
        const tl = gsap.timeline({ delay: 3.5 }); // Wait for Preloader + Fade

        // Reveal Chart
        tl.fromTo(chartRef.current,
            { opacity: 0, scale: 0.95 },
            { opacity: 1, scale: 1, duration: 1.5, ease: 'power4.out' }
        );

        // Animate Headline Words (Official Parameters)
        const headingWords = headingRef.current?.querySelectorAll('.word-inner');
        if (headingWords && headingWords.length > 0) {
            tl.fromTo(headingWords,
                {
                    y: -100,
                    opacity: 0,
                    rotation: "random(-80, 80)",
                    z: -100
                },
                {
                    y: 0,
                    opacity: 1,
                    rotation: 0,
                    z: 0,
                    duration: 0.7,
                    ease: 'back.out(1.7)',
                    stagger: 0.15
                },
                '-=1.2'
            );
        }

        // Animate Paragraph Words
        const subtextWords = subtextRef.current?.querySelectorAll('.word-inner');
        if (subtextWords && subtextWords.length > 0) {
            tl.fromTo(subtextWords,
                {
                    y: -50,
                    opacity: 0,
                    rotation: "random(-40, 40)"
                },
                {
                    y: 0,
                    opacity: 1,
                    rotation: 0,
                    duration: 0.6,
                    ease: 'back.out(1.2)',
                    stagger: 0.05
                },
                '-=0.8'
            );
        }
    }, []);

    const splitToWords = (text: string, wordClassName?: string) => {
        return text.split(' ').map((word, i) => (
            <span key={i} className="inline-block overflow-visible align-bottom">
                <span className={`inline-block word-inner relative transform-gpu backface-hidden ${wordClassName || ''}`} style={{ opacity: 0 }}>
                    {word}
                </span>
                <span className="inline-block">&nbsp;</span>
            </span>
        ));
    };

    return (
        <div id="hero" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-obsidian pt-36 pb-24 lg:py-24">
            {/* 3D Background */}
            <ThreeBackground />

            <div className="relative z-10 w-full max-w-7xl px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                {/* Text Content */}
                <div ref={textRef} className="text-center lg:text-left space-y-8 order-2 lg:order-1">
                    <h1 ref={headingRef} className="text-4xl md:text-7xl font-bold tracking-tight perspective-[500px]">
                        <div className="leading-tight">
                            {splitToWords("Precision Engineered", "text-transparent bg-clip-text bg-gradient-to-r from-off-white to-gold-muted")}
                        </div>
                        <div className="text-gold-bright leading-tight">
                            {splitToWords("Gold Automation")}
                        </div>
                    </h1>

                    <p ref={subtextRef} className="text-lg md:text-xl text-gray-400 font-light max-w-md mx-auto lg:mx-0 leading-relaxed font-sans perspective-[500px]">
                        {splitToWords("Institutional-grade execution for XAUUSD. Balance between light and shadow. Logic over emotion.")}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start pt-1">
                        <button
                            onClick={onOpenModal}
                            className="px-8 py-4 bg-gold-muted text-obsidian font-bold tracking-wider hover:bg-gold-bright transition-all duration-300 transform hover:scale-105 rounded-sm"
                        >
                            REQUEST ACCESS
                        </button>
                        <button className="px-8 py-4 border border-gold-muted/30 text-gold-muted font-medium tracking-wide hover:border-gold-bright hover:text-gold-bright transition-all duration-300 rounded-sm">
                            VIEW SYSTEM LOGIC
                        </button>
                    </div>
                </div>

                {/* Chart Frame */}
                <div ref={chartRef} className="relative order-1 lg:order-2 w-full h-[40vh] lg:h-[60vh] mt-0 lg:mt-0 border border-gold-muted/20 bg-charcoal/50 backdrop-blur-sm rounded-sm shadow-2xl shadow-gold-muted/5 overflow-hidden group">

                    {/* Frame Decorations */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-muted/50 to-transparent opacity-50"></div>
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-muted/50 to-transparent opacity-50"></div>

                    <div className="absolute top-4 left-4 text-xs font-mono text-gold-muted/70 tracking-widest">
                        XAUUSD [H1] // HELIOS ENGINE ACTIVE
                    </div>
                    <div className="absolute bottom-4 left-4 md:top-4 md:right-4 md:bottom-auto md:left-auto text-xs font-mono text-alert-green tracking-widest flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-alert-green animate-pulse"></span>
                        LIVE EXECUTION
                    </div>

                    {/* Chart Canvas */}
                    <div className="absolute inset-0 top-12 bottom-12 left-4 right-12 opacity-80 group-hover:opacity-100 transition-opacity duration-700">
                        <CandlestickChart width={800} height={500} />
                    </div>

                    {/* Vignette Overlay */}
                    <div className="absolute inset-0 bg-gradient-radial from-transparent to-black/40 pointer-events-none"></div>
                </div>

            </div>
        </div>
    );
};

export default Hero;
