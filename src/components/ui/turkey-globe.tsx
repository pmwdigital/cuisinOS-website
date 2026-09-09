"use client";

import { useCallback, useEffect, useRef } from "react";
import createGlobe from "cobe";
import { CITIES, HUB_LOCATION } from "@/constants/cities";



interface TurkeyGlobeProps {
    className?: string;
    speed?: number;
}

const TurkeyGlobe = ({ className = "", speed = 0.0022 }: TurkeyGlobeProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const pointerStart = useRef<{ x: number; y: number } | null>(null);
    const dragOffset = useRef({ phi: 0, theta: 0 });
    const phiOffset = useRef(0);
    const thetaOffset = useRef(0);
    const paused = useRef(false);

    const handlePointerDown = useCallback((event: React.PointerEvent) => {
        pointerStart.current = { x: event.clientX, y: event.clientY };
        if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
        paused.current = true;
    }, []);

    const handlePointerUp = useCallback(() => {
        if (pointerStart.current !== null) {
            phiOffset.current += dragOffset.current.phi;
            thetaOffset.current += dragOffset.current.theta;
            dragOffset.current = { phi: 0, theta: 0 };
        }
        pointerStart.current = null;
        if (canvasRef.current) canvasRef.current.style.cursor = "grab";
        paused.current = false;
    }, []);

    useEffect(() => {
        const handlePointerMove = (event: PointerEvent) => {
            if (pointerStart.current === null) return;
            dragOffset.current = {
                phi: (event.clientX - pointerStart.current.x) / 320,
                theta: (event.clientY - pointerStart.current.y) / 900,
            };
        };
        window.addEventListener("pointermove", handlePointerMove, { passive: true });
        window.addEventListener("pointerup", handlePointerUp, { passive: true });
        return () => {
            window.removeEventListener("pointermove", handlePointerMove);
            window.removeEventListener("pointerup", handlePointerUp);
        };
    }, [handlePointerUp]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        let globe: ReturnType<typeof createGlobe> | null = null;
        let frame = 0;
        let phi = 3.05;

        const start = () => {
            const width = canvas.offsetWidth;
            if (width === 0 || globe) return;

            globe = createGlobe(canvas, {
                devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
                width,
                height: width,
                phi: 3.05,
                theta: 0.42,
                dark: 0,
                diffuse: 1.35,
                mapSamples: 17000,
                mapBrightness: 8,
                scale: 1.08,
                baseColor: [0.96, 0.94, 0.92],
                markerColor: [0.894, 0.49, 0.333],
                glowColor: [0.98, 0.97, 0.95],
                markerElevation: 0.02,
                markers: CITIES.map((city) => ({
                    location: city.location,
                    size: city.id === "ist" ? 0.07 : 0.045,
                    id: city.id,
                })),
                arcs: CITIES.filter((city) => city.id !== "ist").map((city) => ({
                    from: HUB_LOCATION,
                    to: city.location,
                    id: `arc-${city.id}`,
                })),
                arcColor: [0.26, 0.17, 0.13],
                arcWidth: 0.45,
                arcHeight: 0.18,
                opacity: 0.92,
            });

            const animate = () => {
                if (!paused.current) phi += speed;
                globe?.update({
                    phi: phi + phiOffset.current + dragOffset.current.phi,
                    theta: 0.42 + thetaOffset.current + dragOffset.current.theta,
                });
                frame = requestAnimationFrame(animate);
            };
            animate();
            window.setTimeout(() => {
                if (canvas) canvas.style.opacity = "1";
            }, 60);
        };

        if (canvas.offsetWidth > 0) {
            start();
        } else {
            const observer = new ResizeObserver((entries) => {
                if ((entries[0]?.contentRect.width ?? 0) > 0) {
                    observer.disconnect();
                    start();
                }
            });
            observer.observe(canvas);
        }

        return () => {
            if (frame) cancelAnimationFrame(frame);
            globe?.destroy();
        };
    }, [speed]);

    return (
        <div className={`relative aspect-square select-none ${className}`}>
            <canvas
                ref={canvasRef}
                onPointerDown={handlePointerDown}
                aria-label="Şube şehirlerinin işaretlendiği döndürülebilir dünya görseli"
                style={{
                    width: "100%",
                    height: "100%",
                    cursor: "grab",
                    opacity: 0,
                    transition: "opacity 1.1s ease",
                    borderRadius: "50%",
                    touchAction: "none",
                }}
            />
        </div>
    );
};

export default TurkeyGlobe;
