import { useState, useEffect } from 'react';

const TrialCountdown = () => {
    // Target: 2026-02-27 00:30 (GMT+8)
    const TARGET_DATE = new Date('2026-02-27T00:30:00+08:00').getTime();

    const [timeLeft, setTimeLeft] = useState<number>(0);

    useEffect(() => {
        const updateTimer = () => {
            const now = Date.now();
            const diff = Math.max(0, Math.floor((TARGET_DATE - now) / 1000));
            setTimeLeft(diff);
        };

        updateTimer();
        const timer = setInterval(updateTimer, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds: number) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <div className="fixed top-0 left-0 w-full z-[9999] pointer-events-none">
            <div className="bg-obsidian/80 backdrop-blur-md border-b border-gold-muted/20 py-2 px-4 flex items-center justify-center gap-4 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
                <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-bright opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-gold-muted"></span>
                    </span>
                    <p className="text-[10px] md:text-xs font-sans font-bold uppercase tracking-[0.2em] text-gold-muted/80">
                        Limited Trial Access
                    </p>
                </div>

                <div className="h-4 w-[1px] bg-gold-muted/20 hidden md:block" />

                <div className="flex items-center gap-3">
                    <p className="text-[10px] md:text-xs font-sans text-off-white/60 uppercase tracking-widest hidden sm:block">
                        Expires in:
                    </p>
                    <div className="font-mono text-sm md:text-base font-bold text-gold-bright tracking-wider tabular-nums bg-charcoal/50 px-3 py-0.5 rounded border border-white/5">
                        {formatTime(timeLeft)}
                    </div>
                </div>

                {/* <div className="h-4 w-[1px] bg-gold-muted/20 hidden md:block" /> */}

                {/* <p className="text-[9px] md:text-[10px] font-sans font-medium text-gold-muted/40 uppercase tracking-[0.15em] hidden lg:block">
                    Celestial Cycle Alpha-7
                </p> */}
            </div>

            {/* Ambient gold glow under the bar */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-gold-muted/30 to-transparent blur-sm" />
        </div>
    );
};

export default TrialCountdown;
