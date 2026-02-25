import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const MarketStructureVisual = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const pathRef = useRef<SVGPathElement>(null);

    useGSAP(() => {
        if (!pathRef.current) return;

        // Path drawing animation
        const length = pathRef.current.getTotalLength();
        gsap.set(pathRef.current, { strokeDasharray: length, strokeDashoffset: length });

        gsap.to(pathRef.current, {
            strokeDashoffset: 0,
            duration: 3,
            ease: 'none',
            repeat: -1,
            yoyo: true,
            repeatDelay: 1
        });

        // Pulsing Liquidity Zones
        gsap.to('.liquidity-zone', {
            opacity: 0.4,
            duration: 1.5,
            stagger: {
                each: 0.5,
                repeat: -1,
                yoyo: true
            },
            ease: 'sine.inOut'
        });

        // HTF Levels Floating Labels
        gsap.fromTo('.htf-label',
            { x: -5, opacity: 0.5 },
            {
                x: 5,
                opacity: 1,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                stagger: 0.3
            }
        );

        // Execution Bits
        gsap.to('.exec-bit', {
            scale: 1.5,
            opacity: 1,
            duration: 0.4,
            stagger: {
                each: 0.1,
                repeat: -1,
                yoyo: true
            },
            ease: 'power1.inOut'
        });

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="relative w-full h-[320px] md:h-[400px] border border-gold-muted/10 bg-charcoal/30 overflow-hidden flex items-center justify-center p-4">
            {/* Background Grid */}
            <div className="absolute inset-0 opacity-[0.03]" style={{
                backgroundImage: 'radial-gradient(#C5A059 1px, transparent 1px)',
                backgroundSize: '20px 20px'
            }}></div>

            {/* Market Structure SVG */}
            <svg viewBox="0 0 400 300" className="w-full h-full relative z-10 overflow-visible">
                {/* HTF Levels */}
                <g className="opacity-30">
                    <line x1="0" y1="60" x2="400" y2="60" stroke="#C5A059" strokeWidth="0.5" strokeDasharray="4 4" />
                    <text x="405" y="64" fill="#C5A059" fontSize="8" className="font-mono htf-label">HTF_RES_D1</text>

                    <line x1="0" y1="240" x2="400" y2="240" stroke="#C5A059" strokeWidth="0.5" strokeDasharray="4 4" />
                    <text x="405" y="244" fill="#C5A059" fontSize="8" className="font-mono htf-label">HTF_SUP_H4</text>

                    <line x1="0" y1="150" x2="400" y2="150" stroke="#C5A059" strokeWidth="0.5" strokeDasharray="2 2" />
                    <text x="405" y="154" fill="#C5A059" fontSize="8" className="font-mono htf-label">EQUILIBRIUM</text>
                </g>

                {/* Liquidity Zones */}
                <rect x="50" y="40" width="120" height="40" fill="#C5A059" className="liquidity-zone opacity-10" />
                <rect x="230" y="220" width="120" height="40" fill="#C5A059" className="liquidity-zone opacity-10" />

                {/* Structural Path */}
                <path
                    ref={pathRef}
                    d="M 20 200 L 80 140 L 140 180 L 220 80 L 280 120 L 360 40 L 400 80"
                    fill="none"
                    stroke="#C5A059"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                {/* Swept Indicator at Break */}
                <circle cx="220" cy="80" r="4" fill="#C5A059" className="animate-ping" style={{ animationDuration: '3s' }} />
                <circle cx="220" cy="80" r="2" fill="#C5A059" />

                {/* Execution Nodes */}
                <g className="opacity-40">
                    <circle cx="80" cy="140" r="2" fill="#C5A059" className="exec-bit scale-0 opacity-0" />
                    <circle cx="220" cy="80" r="2" fill="#C5A059" className="exec-bit scale-0 opacity-0" />
                    <circle cx="360" cy="40" r="2" fill="#C5A059" className="exec-bit scale-0 opacity-0" />
                </g>
            </svg>

            {/* Technical Overlay */}
            <div className="absolute bottom-4 left-4 font-mono text-[8px] md:text-[10px] text-gold-muted/50 space-y-1 z-20">
                <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                    <span>LATENCY: 12.4ms</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-muted animate-pulse"></span>
                    <span>CORRELATION: 0.982</span>
                </div>
                <div className="flex items-center gap-2 uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-inherit border border-gold-muted"></span>
                    <span>STCT_CONFIRMATION: READY</span>
                </div>
            </div>

            {/* Minimalist Glass Polish */}
            <div className="absolute inset-0 border border-white/5 pointer-events-none rounded-sm"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-transparent pointer-events-none"></div>
        </div>
    );
};

export default MarketStructureVisual;
