import { useEffect, useRef } from 'react';

const ParticleCanvas = ({ active }: { active: boolean }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resize = () => {
            const rect = canvas.parentElement?.getBoundingClientRect();
            if (rect) {
                canvas.width = rect.width;
                canvas.height = rect.height;
            }
        };

        resize();
        window.addEventListener('resize', resize);

        interface Particle {
            x: number;
            y: number;
            size: number;
            speedY: number;
            opacity: number;
            color: string;
        }

        const particles: Particle[] = [];
        const particleCount = 20;

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2 + 1,
                speedY: -(Math.random() * 0.5 + 0.2),
                opacity: Math.random() * 0.5,
                color: Math.random() > 0.5 ? '#C5A059' : '#F2D06B' // Gold colors
            });
        }

        let animationFrameId: number;

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(p => {
                p.y += p.speedY;
                if (p.y < -10) {
                    p.y = canvas.height + 10;
                    p.x = Math.random() * canvas.width;
                }

                ctx.fillStyle = p.color;
                ctx.globalAlpha = p.opacity;

                // Draw as digital bits (rectangles)
                ctx.fillRect(p.x, p.y, p.size, p.size);

                // Add tiny glow
                if (active) {
                    ctx.shadowBlur = 5;
                    ctx.shadowColor = p.color;
                } else {
                    ctx.shadowBlur = 0;
                }
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [active]);

    return (
        <canvas
            ref={canvasRef}
            className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${active ? 'opacity-100' : 'opacity-0'
                }`}
        />
    );
};

export default ParticleCanvas;
