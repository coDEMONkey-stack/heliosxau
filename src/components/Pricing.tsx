import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Section from './Section';

interface PriceCardProps {
    durationLabel: string;
    price: number;
    originalPrice?: number;
    discount?: number;
    isPopular?: boolean;
    onOpenModal: (duration: string) => void;
    usdtRate: number;
}

const PriceCard = ({ durationLabel, price, originalPrice, discount, isPopular, onOpenModal, usdtRate }: PriceCardProps) => {
    const cardRef = useRef<HTMLDivElement>(null);

    const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    });

    return (
        <div ref={cardRef} className={`relative p-8 rounded-2xl border ${isPopular ? 'border-gold-bright bg-charcoal/80' : 'border-gold-muted/30 bg-charcoal/40'} flex flex-col items-center justify-between h-full transition-transform hover:scale-105 duration-300 group`}>
            {isPopular && (
                <div className="absolute -top-4 bg-gold-bright text-black font-bold px-4 py-1 rounded-full text-xs tracking-wider uppercase shadow-[0_0_15px_rgba(255,215,0,0.4)]">
                    Best Value
                </div>
            )}

            <div className="text-center w-full">
                <h3 className="text-xl font-serif text-white mb-2">{durationLabel}</h3>
                <div className="h-px w-12 bg-gold-muted/50 mx-auto mb-6"></div>

                {originalPrice && (
                    <div className="text-gray-500 line-through text-sm mb-1">{formatter.format(originalPrice)}</div>
                )}

                <div className="text-3xl md:text-4xl font-bold text-gold-primary mb-1">
                    {formatter.format(price)}
                </div>

                <div className="text-sm font-mono text-gold-muted/60 mb-6 uppercase tracking-wider flex items-center justify-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    ≈ {(price / usdtRate).toFixed(2)} USDT
                </div>

                {discount && (
                    <div className="text-green-400 text-sm font-medium mb-6 bg-green-400/10 px-3 py-1 rounded-full inline-block">
                        Save {discount}%
                    </div>
                )}

                {!discount && <div className="h-14"></div>} {/* Spacer for alignment */}

                <ul className="text-left text-gray-300 text-sm space-y-3 mb-8 w-full border-t border-white/5 pt-6">
                    <li className="flex items-center gap-2">
                        <span className="text-gold-bright">✓</span> Fully Managed on VPS
                    </li>
                    <li className="flex items-center gap-2">
                        <span className="text-gold-bright">✓</span> 12/7 Auto Algo-Trading
                    </li>
                    <li className="flex items-center gap-2">
                        <span className="text-gold-bright">✓</span> Priority Support
                    </li>
                    {/* {duration >= 3 && (
                        // <li className="flex items-center gap-2">
                        //     <span className="text-gold-bright">✓</span> 1-on-1 Consultation
                        // </li>
                    )} */}
                </ul>
            </div>

            <button
                onClick={() => onOpenModal(durationLabel === '2 Weeks' ? '1' : durationLabel === '1 Month' ? '2' : '3')}
                className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${isPopular ? 'bg-gold-bright text-black hover:bg-white hover:shadow-[0_0_20px_rgba(255,215,0,0.3)]' : 'bg-transparent border border-gold-muted text-gold-muted hover:border-gold-bright hover:text-gold-bright'}`}
            >
                Get Started
            </button>
        </div>
    );
};

interface PricingProps {
    onOpenModal: (duration: string) => void;
    usdtRate: number;
}

const Pricing = ({ onOpenModal, usdtRate }: PricingProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    // Secure Observer to prevent tampering with the blur lock
    /*
    useEffect(() => {
        const targetNode = containerRef.current;
        if (!targetNode) return;

        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                // If classes are changed or elements removed, enforce the lock
                if (mutation.type === 'attributes' || mutation.type === 'childList') {
                    const overlay = document.getElementById('pricing-lock-overlay');
                    const grid = targetNode.querySelector('.grid');

                    if (!overlay || !grid?.classList.contains('blur-2xl')) {
                        console.warn("Tampering detected. Re-enforcing security protocols.");
                        // Force refresh/restore or re-apply styles
                        window.location.reload();
                    }
                }
            });
        });

        observer.observe(targetNode, {
            attributes: true,
            childList: true,
            subtree: true
        });

        return () => observer.disconnect();
    }, []);
    */

    useGSAP(() => {
        if (!containerRef.current) return;

        const cards = containerRef.current.querySelectorAll('.pricing-card-wrapper');

        gsap.from(cards, {
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 75%',
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.out'
        });

    }, { scope: containerRef });

    return (
        <Section id="pricing" className="relative z-10">
            <div ref={containerRef} className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <span className="text-xs font-mono text-gold-muted tracking-[0.2em] uppercase">Invest Your Time</span>
                    <h2 className="text-3xl md:text-5xl mt-4 font-serif text-white">Subscription Plans</h2>
                </div>

                <div className="relative group">
                    <div className="grid md:grid-cols-3 gap-8 transition-all duration-700">
                        <div className="pricing-card-wrapper">
                            <PriceCard
                                durationLabel="2 Weeks"
                                price={599000}
                                onOpenModal={onOpenModal}
                                usdtRate={usdtRate}
                            />
                        </div>
                        <div className="pricing-card-wrapper">
                            <PriceCard
                                durationLabel="1 Month"
                                price={1078200}
                                originalPrice={1198000}
                                discount={10}
                                onOpenModal={onOpenModal}
                                usdtRate={usdtRate}
                            />
                        </div>
                        <div className="pricing-card-wrapper">
                            <PriceCard
                                durationLabel="2 Months"
                                price={1617300}
                                originalPrice={2156400}
                                discount={25}
                                isPopular={true}
                                onOpenModal={onOpenModal}
                                usdtRate={usdtRate}
                            />
                        </div>
                    </div>

                    {/* Highly Secure Blur Overlay (Commented out as trial ended) */}
                    {/*
                    <div
                        id="pricing-lock-overlay"
                        className="absolute inset-0 z-[50] flex flex-col items-center justify-center bg-obsidian/40 backdrop-blur-3xl rounded-3xl border border-white/5 shadow-2xl"
                    >
                        <div className="text-center p-8 max-w-md">
                            <div className="w-16 h-16 bg-gold-muted/10 border border-gold-muted/30 rounded-full flex items-center justify-center mx-auto mb-6 text-gold-bright shadow-[0_0_30px_rgba(212,175,55,0.2)]">
                                <FontAwesomeIcon icon={faLock} size="xl" className="animate-pulse" />
                            </div>
                            <h3 className="text-2xl font-serif text-white mb-4 uppercase tracking-widest">Plans Restricted</h3>
                            <p className="text-gray-400 text-sm leading-relaxed mb-8">
                                Subscription plans are currently locked during your trial period. Enter the celestial gates via the Free Trial to unlock institutional precision.
                            </p>
                            <button
                                onClick={() => onOpenModal()}
                                className="px-8 py-3 bg-gold-bright text-black font-bold rounded-sm uppercase tracking-widest hover:bg-white transition-all transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,215,0,0.3)]"
                            >
                                Start 1 Day Trial
                            </button>
                        </div>
                    </div>
                    */}
                </div>
            </div>
        </Section>
    );
};

export default Pricing;
