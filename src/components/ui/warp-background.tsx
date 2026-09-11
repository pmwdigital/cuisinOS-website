"use client";

import { cn } from "@/lib";
import { motion, useReducedMotion } from "framer-motion";
import React, { useCallback, useEffect, useMemo, useState, type HTMLAttributes } from "react";

const BRAND_BEAMS = [
    "rgba(235, 153, 119, 0.62)",
    "rgba(228, 208, 133, 0.62)",
    "rgba(170, 198, 173, 0.62)",
];

interface WarpBackgroundProps extends HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    perspective?: number;
    beamsPerSide?: number;
    beamSize?: number;
    beamDelayMax?: number;
    beamDelayMin?: number;
    beamDuration?: number;
    beamColors?: string[];
    gridColor?: string;
}

interface BeamConfig {
    x: number;
    delay: number;
    color: string;
    aspectRatio: number;
}

const Beam = ({
    width,
    x,
    delay,
    duration,
    color,
    aspectRatio,
}: {
    width: string | number;
    x: string | number;
    delay: number;
    duration: number;
    color: string;
    aspectRatio: number;
}) => {
    return (
        <motion.div
            style={
                {
                    "--x": `${x}`,
                    "--width": `${width}`,
                    "--aspect-ratio": `${aspectRatio}`,
                    "--background": `linear-gradient(${color}, transparent)`,
                } as React.CSSProperties
            }
            className="absolute left-[var(--x)] top-0 [aspect-ratio:1/var(--aspect-ratio)] [background:var(--background)] [width:var(--width)]"
            initial={{ y: "100cqmax", x: "-50%" }}
            animate={{ y: "-100%", x: "-50%" }}
            transition={{ duration, delay, repeat: Infinity, ease: "linear" }}
        />
    );
};

export const WarpBackground: React.FC<WarpBackgroundProps> = ({
    children,
    perspective = 100,
    className,
    beamsPerSide = 3,
    beamSize = 5,
    beamDelayMax = 3,
    beamDelayMin = 0,
    beamDuration = 3,
    beamColors = BRAND_BEAMS,
    gridColor = "hsl(var(--border))",
    ...props
}) => {
    const shouldReduceMotion = useReducedMotion();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const generateBeams = useCallback(
        (seed: number): BeamConfig[] => {
            const beams: BeamConfig[] = [];
            const cellsPerSide = Math.floor(100 / beamSize);
            const step = cellsPerSide / beamsPerSide;

            for (let i = 0; i < beamsPerSide; i++) {
                const x = Math.floor(i * step);
                const noise = ((i + 1) * 0.618 + seed * 0.27) % 1;
                beams.push({
                    x,
                    delay: noise * (beamDelayMax - beamDelayMin) + beamDelayMin,
                    color: beamColors[(i + seed) % beamColors.length],
                    aspectRatio: 3 + Math.floor(noise * 8),
                });
            }
            return beams;
        },
        [beamsPerSide, beamSize, beamDelayMax, beamDelayMin, beamColors]
    );

    const topBeams = useMemo(() => generateBeams(0), [generateBeams]);
    const rightBeams = useMemo(() => generateBeams(1), [generateBeams]);
    const bottomBeams = useMemo(() => generateBeams(2), [generateBeams]);
    const leftBeams = useMemo(() => generateBeams(3), [generateBeams]);

    const beamsVisible = mounted && !shouldReduceMotion;

    const renderBeams = (beams: BeamConfig[], side: string) =>
        beamsVisible
            ? beams.map((beam, index) => (
                <Beam
                    key={`${side}-${index}`}
                    width={`${beamSize}%`}
                    x={`${beam.x * beamSize}%`}
                    delay={beam.delay}
                    duration={beamDuration}
                    color={beam.color}
                    aspectRatio={beam.aspectRatio}
                />
            ))
            : null;

    return (
        <div className={cn("relative rounded border p-20", className)} {...props}>
            <div
                style={
                    {
                        "--perspective": `${perspective}px`,
                        "--grid-color": gridColor,
                        "--beam-size": `${beamSize}%`,
                    } as React.CSSProperties
                }
                className="pointer-events-none absolute left-0 top-0 size-full overflow-hidden [clip-path:inset(0)] [container-type:size] [perspective:var(--perspective)] [transform-style:preserve-3d]"
            >
                <div className="absolute [background-size:var(--beam-size)_var(--beam-size)] [background:linear-gradient(var(--grid-color)_0_1px,_transparent_1px_var(--beam-size))_50%_-0.5px_/var(--beam-size)_var(--beam-size),linear-gradient(90deg,_var(--grid-color)_0_1px,_transparent_1px_var(--beam-size))_50%_50%_/var(--beam-size)_var(--beam-size)] [container-type:inline-size] [height:100cqmax] [transform-origin:50%_0%] [transform-style:preserve-3d] [transform:rotateX(-90deg)] [width:100cqi]">
                    {renderBeams(topBeams, "top")}
                </div>

                <div className="absolute top-full [background-size:var(--beam-size)_var(--beam-size)] [background:linear-gradient(var(--grid-color)_0_1px,_transparent_1px_var(--beam-size))_50%_-0.5px_/var(--beam-size)_var(--beam-size),linear-gradient(90deg,_var(--grid-color)_0_1px,_transparent_1px_var(--beam-size))_50%_50%_/var(--beam-size)_var(--beam-size)] [container-type:inline-size] [height:100cqmax] [transform-origin:50%_0%] [transform-style:preserve-3d] [transform:rotateX(-90deg)] [width:100cqi]">
                    {renderBeams(bottomBeams, "bottom")}
                </div>

                <div className="absolute left-0 top-0 [background-size:var(--beam-size)_var(--beam-size)] [background:linear-gradient(var(--grid-color)_0_1px,_transparent_1px_var(--beam-size))_50%_-0.5px_/var(--beam-size)_var(--beam-size),linear-gradient(90deg,_var(--grid-color)_0_1px,_transparent_1px_var(--beam-size))_50%_50%_/var(--beam-size)_var(--beam-size)] [container-type:inline-size] [height:100cqmax] [transform-origin:0%_0%] [transform-style:preserve-3d] [transform:rotate(90deg)_rotateX(-90deg)] [width:100cqh]">
                    {renderBeams(leftBeams, "left")}
                </div>

                <div className="absolute right-0 top-0 [background-size:var(--beam-size)_var(--beam-size)] [background:linear-gradient(var(--grid-color)_0_1px,_transparent_1px_var(--beam-size))_50%_-0.5px_/var(--beam-size)_var(--beam-size),linear-gradient(90deg,_var(--grid-color)_0_1px,_transparent_1px_var(--beam-size))_50%_50%_/var(--beam-size)_var(--beam-size)] [container-type:inline-size] [height:100cqmax] [transform-origin:100%_0%] [transform-style:preserve-3d] [transform:rotate(-90deg)_rotateX(-90deg)] [width:100cqh]">
                    {renderBeams(rightBeams, "right")}
                </div>
            </div>

            <div className="relative">{children}</div>
        </div>
    );
};
