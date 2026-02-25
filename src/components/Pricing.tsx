import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Section from './Section';

interface PriceCardProps {
    duration: number; // in months
    price: number;
    originalPrice?: number;
    discount?: number;
    isPopular?: boolean;
}

const PriceCard = ({ duration, price, originalPrice, discount, isPopular }: PriceCardProps) => {
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
                <h3 className="text-xl font-serif text-white mb-2">{duration} Month{duration > 1 ? 's' : ''}</h3>
                <div className="h-px w-12 bg-gold-muted/50 mx-auto mb-6"></div>

                {originalPrice && (
                    <div className="text-gray-500 line-through text-sm mb-1">{formatter.format(originalPrice)}</div>
                )}

                <div className="text-3xl md:text-4xl font-bold text-gold-primary mb-2">
                    {formatter.format(price)}
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
                        <span className="text-gold-bright">✓</span> 24/7 Auto-Trading
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

            <button className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${isPopular ? 'bg-gold-bright text-black hover:bg-white hover:shadow-[0_0_20px_rgba(255,215,0,0.3)]' : 'bg-transparent border border-gold-muted text-gold-muted hover:border-gold-bright hover:text-gold-bright'}`}>
                Get Started
            </button>
        </div>
    );
};

const Pricing = () => {
    const containerRef = useRef<HTMLDivElement>(null);

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

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="pricing-card-wrapper">
                        <PriceCard
                            duration={1}
                            price={599000}
                        />
                    </div>
                    <div className="pricing-card-wrapper">
                        <PriceCard
                            duration={2}
                            price={1138100}
                            originalPrice={1198000}
                            discount={5}
                        />
                    </div>
                    <div className="pricing-card-wrapper">
                        <PriceCard
                            duration={3}
                            price={1617300}
                            originalPrice={1797000}
                            discount={10}
                            isPopular={true}
                        />
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default Pricing;
