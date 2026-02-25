import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faXmark,
    faSun,
    faShieldHalved
} from '@fortawesome/free-solid-svg-icons';

interface RequestAccessModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const RequestAccessModal = ({ isOpen, onClose }: RequestAccessModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (isOpen) {
            const tl = gsap.timeline();
            tl.to(overlayRef.current, { opacity: 1, duration: 0.4, ease: 'power2.out' });
            tl.fromTo(contentRef.current,
                { y: 50, opacity: 0, scale: 0.9, rotateX: -10 },
                { y: 0, opacity: 1, scale: 1, rotateX: 0, duration: 0.6, ease: 'back.out(1.7)' },
                '-=0.2'
            );
            // Sunburst glow animation
            tl.to('.sunburst-glow', {
                scale: 1.2,
                opacity: 0.6,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            }, 0);
        } else {
            gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, ease: 'power2.in' });
            gsap.to(contentRef.current, { y: 30, opacity: 0, scale: 0.95, duration: 0.3, ease: 'power2.in' });
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div ref={modalRef} className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            {/* Backdrop Overlay */}
            <div
                ref={overlayRef}
                onClick={onClose}
                className="absolute inset-0 bg-obsidian/90 backdrop-blur-md opacity-0"
            />

            {/* Modal Content container */}
            <div
                ref={contentRef}
                className="relative w-full max-w-[95%] sm:max-w-lg bg-charcoal border border-gold-muted/30 rounded-sm shadow-[0_0_50px_rgba(212,175,55,0.15)] overflow-hidden opacity-0 flex flex-col max-h-[90vh]"
            >
                {/* Scrollable Content wrapper */}
                <div className="overflow-y-auto custom-scrollbar">
                    {/* Divine Sunburst Background */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-radial from-gold-muted/20 via-transparent to-transparent opacity-40 sunburst-glow pointer-events-none -z-10 blur-3xl" />

                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gold-muted/50 hover:text-gold-bright transition-colors z-20"
                    >
                        <FontAwesomeIcon icon={faXmark} size="lg" />
                    </button>

                    <div className="p-6 md:p-10">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-gold-muted/30 mb-4 text-gold-bright">
                                <FontAwesomeIcon icon={faSun} size="lg" className="animate-spin-slow" />
                            </div>
                            <h2 className="text-3xl font-bold text-gold-bright tracking-tight mb-2 uppercase">Divine Access</h2>
                            <p className="text-gray-400 font-sans text-sm tracking-wide">Enter the celestial gates of automated precision.</p>
                        </div>

                        {/* Form */}
                        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                            <div>
                                <label className="block text-xs font-mono text-gold-muted uppercase tracking-[0.2em] mb-2">Full Name</label>
                                <input
                                    type="text"
                                    placeholder="Ilham"
                                    className="w-full bg-obsidian border border-gold-muted/20 p-3 rounded-sm text-off-white focus:border-gold-bright outline-none transition-all placeholder:text-gray-600 font-sans"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-mono text-gold-muted uppercase tracking-[0.2em] mb-2">Email Address</label>
                                <input
                                    type="email"
                                    placeholder="your@mail.com"
                                    className="w-full bg-obsidian border border-gold-muted/20 p-3 rounded-sm text-off-white focus:border-gold-bright outline-none transition-all placeholder:text-gray-600 font-sans"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-mono text-gold-muted uppercase tracking-[0.2em] mb-2">Instagram Username</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gold-muted/50 font-mono">@</span>
                                    <input
                                        type="text"
                                        placeholder="i.zhuo88"
                                        className="w-full bg-obsidian border border-gold-muted/20 py-3 pl-8 pr-3 rounded-sm text-off-white focus:border-gold-bright outline-none transition-all placeholder:text-gray-600 font-sans"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-mono text-gold-muted uppercase tracking-[0.2em] mb-2">Subscription Duration</label>
                                <select className="w-full bg-obsidian border border-gold-muted/20 p-3 rounded-sm text-off-white focus:border-gold-bright outline-none transition-all font-sans appearance-none">
                                    <option value="1">1 Month - Initial Trial</option>
                                    <option value="2">2 Months - Strategic Growth</option>
                                    <option value="3">3 Months - Celestial Command</option>
                                </select>
                            </div>

                            <div className="pt-4">
                                <button className="w-full py-4 bg-gradient-to-r from-gold-muted to-gold-bright text-obsidian font-bold tracking-[0.3em] uppercase hover:shadow-[0_0_30px_rgba(255,215,0,0.3)] transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3">
                                    <FontAwesomeIcon icon={faShieldHalved} />
                                    Claim Your Seat
                                </button>
                                <p className="mt-4 text-[10px] text-center text-gold-muted/40 font-mono uppercase tracking-[0.1em]">
                                    Only 12 slots remaining in current celestial cycle
                                </p>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Bottom Decorative Line */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-bright to-transparent opacity-30" />
            </div>
        </div>
    );
};

export default RequestAccessModal;
