import { useEffect, useState } from 'react';
import { DotLottiePlayer } from '@dotlottie/react-player';
import loaderUrl from '../assets/loader.lottie';

const Preloader = ({ onFinish }: { onFinish: () => void }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Show loader for at least 2 seconds for premium feel
        const timer = setTimeout(() => {
            setIsVisible(false);
            // Wait for fade out animation before calling onFinish
            setTimeout(onFinish, 500);
        }, 2500);

        return () => clearTimeout(timer);
    }, [onFinish]);

    return (
        <div
            className={`fixed inset-0 z-[9999] flex items-center justify-center bg-obsidian transition-opacity duration-500 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
        >
            <div className="w-64 h-64 md:w-96 md:h-96">
                <DotLottiePlayer
                    src={loaderUrl}
                    autoplay
                    loop
                    style={{ width: '100%', height: '100%' }}
                />
                <div className="mt-8 text-center">
                    <h2 className="text-gold-muted tracking-[0.3em] text-sm md:text-base font-sans animate-pulse">
                        INITIALIZING HELIOS ENGINE
                    </h2>
                </div>
            </div>
        </div>
    );
};

export default Preloader;
