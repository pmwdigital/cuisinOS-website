"use client";

import { motion, useMotionValue, useTransform, type MotionValue } from "framer-motion";
import { useId } from "react";

interface ScrollStrokeProps {
    d: string;
    viewBox: string;
    progress: MotionValue<number>;
    className?: string;
    strokeWidth?: number;
    trackWidth?: number;
    headLength?: number;
    stretch?: boolean;
    gradientVector?: [number, number, number, number];
}

const ScrollStroke = ({
    d,
    viewBox,
    progress,
    className,
    strokeWidth = 5,
    trackWidth = 2,
    headLength = 0.045,
    stretch = false,
    gradientVector,
}: ScrollStrokeProps) => {
    const gradientId = useId().replace(/:/g, "");
    const [, , boxWidth, boxHeight] = viewBox.split(/[\s,]+/).map(Number);
    const [x1, y1, x2, y2] = gradientVector ?? [0, boxHeight, boxWidth, 0];
    const headSpan = useMotionValue(headLength);
    const headOffset = useTransform(progress, (value) => Math.max(value - headLength, 0));
    const headOpacity = useTransform(progress, [0, 0.015, 0.985, 1], [0, 1, 1, 0]);

    return (
        <svg
            viewBox={viewBox}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            preserveAspectRatio={stretch ? "none" : "xMidYMid meet"}
            className={className}
        >
            <path
                d={d}
                stroke="currentColor"
                strokeWidth={trackWidth}
                strokeLinecap="round"
                className="text-border"
            />
            <motion.path
                d={d}
                stroke={`url(#${gradientId})`}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                style={{ pathLength: progress }}
            />
            <motion.path
                d={d}
                stroke="#E47D55"
                strokeWidth={strokeWidth + 2.5}
                strokeLinecap="round"
                style={{ pathLength: headSpan, pathOffset: headOffset, opacity: headOpacity }}
            />
            <defs>
                <linearGradient
                    id={gradientId}
                    gradientUnits="userSpaceOnUse"
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                >
                    <stop offset="0%" stopColor="#E4D085" />
                    <stop offset="45%" stopColor="#EB9977" />
                    <stop offset="100%" stopColor="#E47D55" />
                </linearGradient>
            </defs>
        </svg>
    );
};

export default ScrollStroke;
