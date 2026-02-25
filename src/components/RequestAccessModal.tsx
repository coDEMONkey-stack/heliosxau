import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import emailjs from '@emailjs/browser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faXmark,
    faSun,
    faShieldHalved,
    faImage,
    faCloudArrowUp
} from '@fortawesome/free-solid-svg-icons';

interface RequestAccessModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const RequestAccessModal = ({ isOpen, onClose }: RequestAccessModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [fileName, setFileName] = useState<string | null>(null);
    const [fileObject, setFileObject] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        instagram: '',
        duration: '0', // 1 Day - Celestial Trial
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFileName(file.name);
            setFileObject(file);
        }
    };

    const resizeImage = (file: File): Promise<string> => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target?.result as string;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const MAX_WIDTH = 800;
                    const MAX_HEIGHT = 800;
                    let width = img.width;
                    let height = img.height;

                    if (width > height) {
                        if (width > MAX_WIDTH) {
                            height *= MAX_WIDTH / width;
                            width = MAX_WIDTH;
                        }
                    } else {
                        if (height > MAX_HEIGHT) {
                            width *= MAX_HEIGHT / height;
                            height = MAX_HEIGHT;
                        }
                    }
                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx?.drawImage(img, 0, 0, width, height);
                    resolve(canvas.toDataURL('image/jpeg', 0.6)); // Compress to JPEG with 0.6 quality
                };
            };
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.fullName || !formData.email || !formData.instagram) {
            alert("Please fill in all required fields.");
            return;
        }

        setIsLoading(true);
        setStatus('idle');

        try {
            const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
            const templateIdAdmin = import.meta.env.VITE_EMAILJS_TEMPLATE_ADMIN;
            const templateIdUser = import.meta.env.VITE_EMAILJS_TEMPLATE_USER;
            const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

            // Convert and compress file to base64 if it exists
            let base64File = '';
            if (fileObject) {
                base64File = await resizeImage(fileObject);
            }

            const adminParams = {
                to_name: formData.fullName || 'No Name',
                user_email: formData.email || 'No Email',
                instagram: formData.instagram || 'No Instagram',
                // Adding aliases just in case
                email: formData.email,
                user_instagram: formData.instagram,
                duration: formData.duration === '0' ? '1 Day - Celestial Trial' : 'Subscription',
                content_screenshot: base64File
            };

            console.log('Sending Admin Email with params:', { ...adminParams, content_screenshot: 'Base64Data...' });

            const userParams = {
                to_name: formData.fullName || 'No Name',
                to_email: formData.email || '',
                user_email: formData.email || 'No Email',
                instagram: formData.instagram || 'No Instagram',
                // Adding aliases for user template too
                email: formData.email,
                user_instagram: formData.instagram,
                duration: formData.duration === '0' ? '1 Day - Celestial Trial' : 'Subscription',
            };

            // Send notification to Admin (with attachment)
            await emailjs.send(serviceId, templateIdAdmin, adminParams, publicKey);

            // Send confirmation to User (no attachment)
            await emailjs.send(serviceId, templateIdUser, userParams, publicKey);

            setStatus('success');
            setFormData({ fullName: '', email: '', instagram: '', duration: '0' });
            setFileName(null);

            setTimeout(() => {
                onClose();
                setStatus('idle');
            }, 3000);
        } catch (error: any) {
            console.error('Email failed to send details:', error);
            setStatus('error');
        } finally {
            setIsLoading(false);
        }
    };

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
                        <form className="space-y-5" onSubmit={handleSubmit}>
                            <div>
                                <label className="block text-xs font-mono text-gold-muted uppercase tracking-[0.2em] mb-2">Full Name</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Ilham"
                                    className="w-full bg-obsidian border border-gold-muted/20 p-3 rounded-sm text-off-white focus:border-gold-bright outline-none transition-all placeholder:text-gray-600 font-sans"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-mono text-gold-muted uppercase tracking-[0.2em] mb-2">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
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
                                        name="instagram"
                                        value={formData.instagram}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="i.zhuo88"
                                        className="w-full bg-obsidian border border-gold-muted/20 py-3 pl-8 pr-3 rounded-sm text-off-white focus:border-gold-bright outline-none transition-all placeholder:text-gray-600 font-sans"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-mono text-gold-muted uppercase tracking-[0.2em] mb-2">Subscription Duration</label>
                                <select
                                    name="duration"
                                    value={formData.duration}
                                    onChange={handleInputChange}
                                    className="w-full bg-obsidian border border-gold-muted/20 p-3 rounded-sm text-off-white focus:border-gold-bright outline-none transition-all font-sans appearance-none"
                                >
                                    <option value="0">1 Day - Celestial Trial</option>
                                    <option value="1" disabled>2 Weeks - Initial Trial</option>
                                    <option value="2" disabled>1 Months - Strategic Growth</option>
                                    <option value="3" disabled>2 Months - Celestial Command</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-mono text-gold-muted uppercase tracking-[0.2em] mb-2">Current Balance (Screenshot)</label>
                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-full bg-obsidian border border-dashed border-gold-muted/30 p-4 rounded-sm hover:border-gold-bright transition-all cursor-pointer group text-center"
                                >
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleFileChange}
                                        className="hidden"
                                        accept="image/*"
                                    />
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="text-gold-muted/50 group-hover:text-gold-bright transition-colors">
                                            <FontAwesomeIcon icon={fileName ? faImage : faCloudArrowUp} size="lg" />
                                        </div>
                                        <span className="text-xs font-sans text-gray-500 group-hover:text-gray-400 transition-colors">
                                            {fileName || "Click to upload screenshot for comparation"}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className={`w-full py-4 bg-gradient-to-r from-gold-muted to-gold-bright text-obsidian font-bold tracking-[0.3em] uppercase hover:shadow-[0_0_30px_rgba(255,215,0,0.3)] transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                                >
                                    {isLoading ? (
                                        <div className="w-5 h-5 border-2 border-obsidian/30 border-t-obsidian rounded-full animate-spin" />
                                    ) : (
                                        <FontAwesomeIcon icon={faShieldHalved} />
                                    )}
                                    {isLoading ? 'Verifying...' : 'Claim Your Seat'}
                                </button>

                                {status === 'success' && (
                                    <p className="mt-4 text-xs text-center text-green-500 font-mono uppercase tracking-wider animate-pulse">
                                        Access Granted. Check your email.
                                    </p>
                                )}
                                {status === 'error' && (
                                    <p className="mt-4 text-xs text-center text-red-500 font-mono uppercase tracking-wider">
                                        Celestial Connection Failed. Try again.
                                    </p>
                                )}

                                <p className="mt-4 text-[10px] text-center text-gold-muted/40 font-mono uppercase tracking-[0.1em]">
                                    Only 6 slots remaining in current celestial cycle
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
