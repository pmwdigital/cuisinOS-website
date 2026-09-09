"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib";

export type TrendPoint = {
    label: string;
    value: number;
};

interface TrendCardProps {
    title: string;
    subtitle: string;
    unit?: string;
    data: TrendPoint[];
    footer: { label: string; value: string }[];
    className?: string;
    accent?: "grapefruit" | "mint" | "lemon";
}

const ACCENTS = {
    grapefruit: { active: "#E47D55", near: "#F2B599", idle: "#F0E9E3" },
    mint: { active: "#8FB092", near: "#C5DCC7", idle: "#F0E9E3" },
    lemon: { active: "#D9C063", near: "#EFE0A7", idle: "#F0E9E3" },
} as const;

const TrendCard = ({
    title,
    subtitle,
    unit = "",
    data,
    footer,
    className,
    accent = "grapefruit",
}: TrendCardProps) => {
    const [hovered, setHovered] = useState<number | null>(null);
    const palette = ACCENTS[accent];
    const max = useMemo(() => Math.max(...data.map((point) => point.value)), [data]);

    return (
        <div className={cn("flex h-full flex-col rounded-2xl border border-border bg-card p-6", className)}>
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h3 className="font-heading text-lg font-medium tracking-tight">{title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
                </div>
                <span className="shrink-0 rounded-full border border-border bg-secondary px-2.5 py-1 text-[10px] font-medium text-muted-foreground">
                    Örnek ekran
                </span>
            </div>

            <div
                className="relative mt-10 h-36 min-h-[9rem] shrink-0"
                onMouseLeave={() => setHovered(null)}
                role="figure"
                aria-label={`${title}, ${data.length} noktalı dağılım`}
            >
                <AnimatePresence>
                    {hovered !== null && (
                        <motion.div
                            initial={{ opacity: 0, y: -8, scale: 0.94 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -8, scale: 0.94 }}
                            transition={{ duration: 0.18, ease: "easeOut" }}
                            className="pointer-events-none absolute -top-8 left-0 w-0"
                            style={{
                                transform: `translateX(${(hovered / Math.max(1, data.length - 1)) * 100}%)`,
                            }}
                        >
                            <div className="-translate-x-1/2 whitespace-nowrap rounded-md bg-chocolate px-2 py-1 text-xs font-medium text-cream shadow-lg">
                                {data[hovered].value.toLocaleString("tr-TR")}
                                {unit}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="flex h-full w-full items-end justify-between gap-1">
                    {data.map((point, index) => {
                        const isHovered = hovered === index;
                        const isNear = hovered !== null && Math.abs(hovered - index) === 1;
                        const isPeak = point.value >= max * 0.7;
                        const restColor = isPeak ? palette.near : palette.idle;
                        return (
                            <div key={point.label} className="flex h-full flex-1 flex-col items-center justify-end">
                                <div
                                    className="flex h-full w-full items-end"
                                    onMouseEnter={() => setHovered(index)}
                                    role="img"
                                    aria-label={`${point.label}: ${point.value}${unit}`}
                                >
                                    <motion.div
                                        className="w-full rounded-t-[3px]"
                                        initial={{ height: "0%", backgroundColor: restColor }}
                                        animate={{
                                            height: `${(point.value / max) * 100}%`,
                                            backgroundColor: isHovered
                                                ? palette.active
                                                : isNear
                                                    ? palette.near
                                                    : restColor,
                                        }}
                                        transition={{ duration: 0.45, delay: index * 0.03, ease: "easeOut" }}
                                    />
                                </div>
                                <span className="mt-2 text-[10px] text-muted-foreground">{point.label}</span>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="mt-6 flex justify-between gap-4 border-t border-border pt-4">
                {footer.map((item) => (
                    <div key={item.label}>
                        <p className="text-xs font-medium text-muted-foreground">{item.label}</p>
                        <p className="mt-0.5 font-heading text-2xl font-normal tracking-tight">{item.value}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrendCard;
