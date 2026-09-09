"use client";

import { useId, useMemo } from "react";
import { motion } from "framer-motion";

interface AreaSparkProps {
    values: number[];
    labels?: string[];
    stroke?: string;
    fillFrom?: string;
    height?: number;
}

const buildPath = (values: number[], width: number, height: number, padding: number) => {
    const max = Math.max(...values);
    const min = Math.min(...values);
    const span = max - min || 1;
    const step = (width - padding * 2) / Math.max(1, values.length - 1);

    const points = values.map((value, index) => ({
        x: padding + index * step,
        y: padding + (1 - (value - min) / span) * (height - padding * 2),
    }));

    let line = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i += 1) {
        const current = points[i];
        const next = points[i + 1];
        const controlX = (current.x + next.x) / 2;
        line += ` C ${controlX} ${current.y}, ${controlX} ${next.y}, ${next.x} ${next.y}`;
    }

    const area = `${line} L ${points[points.length - 1].x} ${height} L ${points[0].x} ${height} Z`;
    return { line, area, points };
};

const AreaSpark = ({
    values,
    labels,
    stroke = "#E47D55",
    fillFrom = "rgba(235,153,119,0.28)",
    height = 132,
}: AreaSparkProps) => {
    const gradientId = useId().replace(/:/g, "");
    const width = 360;
    const { line, area, points } = useMemo(
        () => buildPath(values, width, height, 10),
        [values, height]
    );

    return (
        <div className="w-full">
            <svg
                viewBox={`0 0 ${width} ${height}`}
                className="h-auto w-full overflow-visible"
                fill="none"
                preserveAspectRatio="none"
            >
                <defs>
                    <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={fillFrom} />
                        <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                    </linearGradient>
                </defs>
                <motion.path
                    d={area}
                    fill={`url(#${gradientId})`}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.25 }}
                />
                <motion.path
                    d={line}
                    stroke={stroke}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.1, ease: "easeInOut" }}
                />
                <motion.circle
                    cx={points[points.length - 1].x}
                    cy={points[points.length - 1].y}
                    r="4"
                    fill={stroke}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.1 }}
                />
            </svg>
            {labels ? (
                <div className="mt-2 flex justify-between text-[10px] text-muted-foreground">
                    {labels.map((label) => (
                        <span key={label}>{label}</span>
                    ))}
                </div>
            ) : null}
        </div>
    );
};

export default AreaSpark;
