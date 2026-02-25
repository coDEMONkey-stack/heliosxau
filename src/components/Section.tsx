import { useRef, useEffect, forwardRef, useImperativeHandle, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SectionProps {
    children: ReactNode;
    className?: string;
    id?: string;
}

const Section = forwardRef<HTMLElement, SectionProps>(({ children, className = '', id }, ref) => {
    const internalRef = useRef<HTMLElement>(null);

    // Allow the parent to use the ref, while still having an internal one for the default animation
    useImperativeHandle(ref, () => internalRef.current!);

    useEffect(() => {
        const el = internalRef.current;
        if (!el) return;

        gsap.fromTo(
            el,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                },
            }
        );
    }, []);

    return (
        <section ref={internalRef} id={id} className={`py-20 px-6 md:px-12 lg:px-24 ${className}`}>
            {children}
        </section>
    );
});

Section.displayName = 'Section';

export default Section;
