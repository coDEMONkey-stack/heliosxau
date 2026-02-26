import { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faScaleBalanced, faShieldHalved, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const InvestmentCalculator = () => {
    const [inputValue, setInputValue] = useState<string>("600");
    const [isCent, setIsCent] = useState<boolean>(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Derived values
    const investment = inputValue === "" ? 0 : parseFloat(inputValue);

    // Constant Parameters
    const WIN_RATE = 74.62;
    const EXPECTED_PAYOFF = 0.72;
    const RISK_REWARD = "1 : 1.8";
    const DAILY_PROFIT_MIN = 1.5;
    const DAILY_PROFIT_MAX = 5;
    const AVG_DAILY_PROFIT = (DAILY_PROFIT_MIN + DAILY_PROFIT_MAX) / 2 / 100;

    const minEquity = isCent ? 20000 : 200;
    const recommendedEquity = isCent ? 60000 : 600;

    const dailyProfit = investment * AVG_DAILY_PROFIT;
    const weeklyProfit = dailyProfit * 5; // 5 Trading days
    const monthlyProfit = dailyProfit * 22; // ~22 Trading days

    useGSAP(() => {
        if (!containerRef.current) return;

        gsap.from(containerRef.current.querySelectorAll('.calc-card'), {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 85%',
            }
        });
    }, { scope: containerRef });

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: isCent ? 0 : 2,
        }).format(val).replace('$', isCent ? '' : '$') + (isCent ? ' USC' : '');
    };

    return (
        <div ref={containerRef} className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
            {/* Styles to hide spin buttons */}
            <style dangerouslySetInnerHTML={{
                __html: `
                input::-webkit-outer-spin-button,
                input::-webkit-inner-spin-button {
                    -webkit-appearance: none;
                    margin: 0;
                }
                input[type=number] {
                    -moz-appearance: textfield;
                }
            `}} />
            {/* Header Aesthetic */}
            <div className="text-center mb-12">
                <div className="inline-block relative">
                    <span className="block text-gold-muted text-[10px] uppercase tracking-[0.5em] mb-2 font-bold opacity-60">The Oracle of Wealth</span>
                    <h3 className="text-3xl md:text-4xl font-serif text-white tracking-widest uppercase relative z-10">
                        Investment <span className="text-gold-muted">Calculator</span>
                    </h3>
                    <div className="absolute -top-4 -left-4 -right-4 -bottom-2 border-x border-gold-muted/20 opacity-30"></div>
                </div>
                <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-gold-muted to-transparent mx-auto mt-6"></div>
            </div>

            <div className="grid lg:grid-cols-12 gap-8 items-start">
                {/* Input Section */}
                <div className="lg:col-span-5 space-y-6 calc-card">
                    <div className="bg-charcoal/40 backdrop-blur-md border border-gold-muted/20 p-8 rounded-sm relative overflow-hidden group">
                        {/* Greek Corner Ornaments */}
                        <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-gold-muted/40"></div>
                        <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-gold-muted/40"></div>
                        <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-gold-muted/40"></div>
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-gold-muted/40"></div>

                        <div className="relative z-10">
                            <label className="block text-gold-muted text-xs uppercase tracking-widest mb-4 font-bold">
                                Initial Sacrifice (Amount)
                            </label>

                            <div className="relative">
                                <input
                                    type="number"
                                    value={inputValue}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        // Prevent leading zeros if there's more than one digit
                                        if (val.length > 1 && val.startsWith('0')) {
                                            setInputValue(val.replace(/^0+/, ''));
                                        } else {
                                            setInputValue(val);
                                        }
                                    }}
                                    className="w-full bg-obsidian/60 border border-gold-muted/30 text-white px-5 py-4 text-2xl font-serif focus:outline-none focus:border-gold-bright transition-colors rounded-sm"
                                    placeholder="0"
                                />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-2">
                                    <button
                                        onClick={() => setIsCent(false)}
                                        className={`px-3 py-1 text-[10px] uppercase tracking-tighter border transition-all ${!isCent ? 'bg-gold-muted text-obsidian border-gold-muted' : 'text-gold-muted border-gold-muted/30 hover:border-gold-muted'}`}
                                    >
                                        USD
                                    </button>
                                    <button
                                        onClick={() => setIsCent(true)}
                                        className={`px-3 py-1 text-[10px] uppercase tracking-tighter border transition-all ${isCent ? 'bg-gold-muted text-obsidian border-gold-muted' : 'text-gold-muted border-gold-muted/30 hover:border-gold-muted'}`}
                                    >
                                        CENT
                                    </button>
                                </div>
                            </div>

                            {/* Range display */}
                            <div className="mt-4 flex justify-between text-[10px] uppercase tracking-widest text-gray-500 font-mono">
                                <span>Profit Range: {DAILY_PROFIT_MIN}% - {DAILY_PROFIT_MAX}% / Day</span>
                            </div>

                            {/* Warnings */}
                            <div className="mt-8 space-y-3">
                                {investment < minEquity && (
                                    <div className="flex items-center gap-3 text-alert-red bg-alert-red/5 p-3 border border-alert-red/20 text-[11px] uppercase tracking-wider animate-pulse-slow">
                                        <FontAwesomeIcon icon={faShieldHalved} />
                                        <span>Minimum Equity: {formatCurrency(minEquity)} required</span>
                                    </div>
                                )}

                                {investment >= minEquity && investment < recommendedEquity && (
                                    <div className="flex items-center gap-3 text-gold-bright bg-gold-bright/5 p-3 border border-gold-bright/20 text-[11px] uppercase tracking-wider">
                                        <FontAwesomeIcon icon={faCircleInfo} />
                                        <span>Recommended: {formatCurrency(recommendedEquity)} for stability</span>
                                    </div>
                                )}

                                {investment >= recommendedEquity && (
                                    <div className="flex items-center gap-3 text-alert-green bg-alert-green/5 p-3 border border-alert-green/20 text-[11px] uppercase tracking-wider">
                                        <FontAwesomeIcon icon={faShieldHalved} />
                                        <span>Fortified Equity Level reached</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Technical Parameters */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-charcoal/20 border border-gold-muted/10 p-4 rounded-sm">
                            <span className="block text-[10px] text-gray-500 uppercase tracking-tighter mb-1 font-mono">Win Rate</span>
                            <span className="text-white font-serif text-lg tracking-wider">{WIN_RATE}%</span>
                        </div>
                        <div className="bg-charcoal/20 border border-gold-muted/10 p-4 rounded-sm">
                            <span className="block text-[10px] text-gray-500 uppercase tracking-tighter mb-1 font-mono">Risk : Reward</span>
                            <span className="text-white font-serif text-lg tracking-wider">{RISK_REWARD}</span>
                        </div>
                    </div>
                </div>

                {/* Output Section */}
                <div className="lg:col-span-7 calc-card">
                    <div className="bg-gradient-to-br from-charcoal/60 to-obsidian border border-gold-muted/30 p-8 rounded-sm relative">
                        {/* Column Decorative Element */}
                        <div className="absolute top-0 bottom-0 left-0 w-[2px] bg-gradient-to-b from-transparent via-gold-muted/40 to-transparent"></div>
                        <div className="absolute top-0 bottom-0 right-0 w-[2px] bg-gradient-to-b from-transparent via-gold-muted/40 to-transparent"></div>

                        <h4 className="text-gold-bright text-xs uppercase tracking-[0.4em] mb-10 font-bold border-b border-gold-muted/10 pb-4 flex items-center gap-3">
                            <FontAwesomeIcon icon={faChartLine} className="opacity-70" />
                            Projected Harvest
                        </h4>

                        <div className="space-y-8">
                            {/* Projections */}
                            <div className="flex items-end justify-between group">
                                <div className="space-y-1">
                                    <span className="block text-gray-500 text-[10px] uppercase tracking-[0.2em] font-mono">Daily Dividends (Avg)</span>
                                    <span className="block text-white text-xl md:text-2xl font-serif tracking-widest group-hover:text-gold-bright transition-colors">
                                        {investment < minEquity ? "—" : formatCurrency(dailyProfit)}
                                    </span>
                                </div>
                                <div className="text-right">
                                    <span className="text-[10px] text-gold-muted/40 font-mono uppercase tracking-widest">Growth: ~1.5% - 5.0%</span>
                                </div>
                            </div>

                            <div className="flex items-end justify-between group">
                                <div className="space-y-1">
                                    <span className="block text-gray-500 text-[10px] uppercase tracking-[0.2em] font-mono">Weekly Accumulation</span>
                                    <span className="block text-white text-xl md:text-2xl font-serif tracking-widest group-hover:text-gold-bright transition-colors">
                                        {investment < minEquity ? "—" : formatCurrency(weeklyProfit)}
                                    </span>
                                </div>
                                <div className="text-right">
                                    <span className="text-[10px] text-gold-muted/40 font-mono uppercase tracking-widest">5 Trading Days</span>
                                </div>
                            </div>

                            <div className="flex items-end justify-between group">
                                <div className="space-y-1">
                                    <span className="block text-gold-muted/80 text-[10px] uppercase tracking-[0.3em] font-bold">Monthly Institutional Goal</span>
                                    <span className="block text-gold-bright text-3xl md:text-4xl font-serif tracking-[0.1em] drop-shadow-[0_0_15px_rgba(242,208,107,0.2)]">
                                        {investment < minEquity ? "—" : formatCurrency(monthlyProfit)}
                                    </span>
                                </div>
                                <div className="text-right">
                                    <span className="text-[10px] text-alert-green/60 font-mono uppercase tracking-widest">Compounding potential</span>
                                </div>
                            </div>
                        </div>

                        {/* Expected Payoff small box */}
                        <div className="mt-12 bg-obsidian/40 border border-gold-muted/20 p-5 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full border border-gold-muted/30 flex items-center justify-center text-gold-muted text-sm anim-spin-slow">
                                    <FontAwesomeIcon icon={faScaleBalanced} />
                                </div>
                                <div>
                                    <span className="block text-[9px] text-gray-500 uppercase tracking-widest mb-0.5">Expected Payoff</span>
                                    <span className="block text-white text-xs font-mono uppercase tracking-widest font-bold">{EXPECTED_PAYOFF} <span className="text-gold-muted/40">Per Trade</span></span>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="text-[8px] text-gray-600 uppercase tracking-[0.2em] leading-tight block">Quantitative<br />Persistence</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Disclaimer & Policy Notes */}
            <div className="mt-12 text-center">
                <p className="text-[9px] text-gray-600 uppercase tracking-[0.3em] leading-relaxed max-w-3xl mx-auto">
                    Note: Projections are based on historical persistence and institutional execution algorithms. Past performance does not guarantee the favor of the gods in future market cycles. <span className="text-gold-muted/50">We provide automated execution for rental durations only; we do not offer fund management or investment custody services.</span>
                </p>
            </div>
        </div>
    );
};

export default InvestmentCalculator;
