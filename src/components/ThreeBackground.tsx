import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
// @ts-ignore
import * as random from 'maath/random/dist/maath-random.esm';

const Stars = (props: any) => {
    const ref = useRef<any>(null);
    const isMobile = window.innerWidth < 768;
    const [sphere] = useState(() => {
        const positions = random.inSphere(new Float32Array(isMobile ? 1500 : 5000), { radius: 1.5 });
        // Sanity check for NaN values which cause Three.js to lag/error
        for (let i = 0; i < positions.length; i++) {
            if (isNaN(positions[i])) positions[i] = 0;
        }
        return positions;
    });

    useFrame((_state, delta) => {
        if (!ref.current) return;
        ref.current.rotation.x -= delta / 15;
        ref.current.rotation.y -= delta / 20;
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color="#C5A059" // Muted Gold
                    size={0.002}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    );
};

const ThreeBackground = () => {
    return (
        <div className="absolute inset-0 -z-10 pointer-events-none">
            <Canvas
                camera={{ position: [0, 0, 1] }}
                dpr={[1, 1.5]} // Limit pixel ratio for performance
                gl={{ antialias: false, powerPreference: "high-performance" }} // Favor performance over quality
            >
                <Stars />
            </Canvas>
        </div>
    );
};

export default ThreeBackground;
