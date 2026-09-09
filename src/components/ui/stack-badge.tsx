"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib";

export type StackItem = {
    id: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
};

interface StackBadgeProps {
    items: StackItem[];
    maxVisible?: number;
    label?: string;
    className?: string;
}

const TILE = 40;
const GAP = 10;
const PEEK = 22;
const SPRING = { type: "spring" as const, stiffness: 280, damping: 24 };
const REST_ROTATION = [-12, -6, -1, 5, 10, -8, 3, -4];
const HOVER_ROTATION = [-7, -3, 0, 2, 5, -5, 2, -2];

const arcOffset = (index: number, total: number) => {
    if (total <= 1) return 0;
    const middle = (total - 1) / 2;
    const t = (index - middle) / middle;
    return t * t * (TILE * 0.2);
};

const StackBadge = ({ items, maxVisible = 3, label, className }: StackBadgeProps) => {
    const [hovered, setHovered] = useState(false);
    const reduced = useReducedMotion();
    const total = items.length;

    const collapsedWidth = TILE + (Math.min(maxVisible, total) - 1) * PEEK;
    const spreadWidth = total * TILE + (total - 1) * GAP;
    const spreadX = (index: number) => index * (TILE + GAP);
    const collapsedX = (index: number) =>
        index >= maxVisible ? (maxVisible - 1) * PEEK : index * PEEK;

    return (
        <motion.div
            className={cn(
                "inline-flex h-14 select-none items-center gap-3 rounded-full border border-border bg-background/90 pl-3 pr-5 text-xs backdrop-blur-sm",
                "shadow-[0_2px_14px_rgba(66,43,33,0.08)] transition-shadow duration-300 hover:shadow-[0_8px_26px_rgba(66,43,33,0.14)]",
                className
            )}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            whileHover={reduced ? undefined : { y: -2, scale: 1.012 }}
            transition={SPRING}
        >
            <motion.div
                className="relative shrink-0"
                style={{ height: TILE + 12 }}
                animate={{ width: reduced || !hovered ? collapsedWidth : spreadWidth }}
                transition={SPRING}
            >
                {items.map((item, index) => {
                    const Icon = item.icon;
                    const isHidden = index >= maxVisible;
                    const rotate = reduced
                        ? 0
                        : hovered
                            ? HOVER_ROTATION[index] ?? 0
                            : REST_ROTATION[index] ?? 0;
                    return (
                        <motion.div
                            key={item.id}
                            title={item.label}
                            className="absolute left-0 top-0 flex items-center justify-center rounded-[10px] border-2 border-background bg-beige text-chocolate shadow-[0_2px_10px_rgba(66,43,33,0.18)]"
                            style={{
                                width: TILE,
                                height: TILE,
                                zIndex: hovered ? index + 1 : total - index,
                            }}
                            animate={{
                                x: hovered ? spreadX(index) : collapsedX(index),
                                y: hovered ? arcOffset(index, total) : 0,
                                rotate,
                                opacity: isHidden ? (hovered ? 1 : 0) : 1,
                                scale: isHidden ? (hovered ? 1 : 0.6) : 1,
                            }}
                            transition={{
                                ...SPRING,
                                delay: !reduced && isHidden ? (index - maxVisible) * 0.05 : 0,
                            }}
                        >
                            <Icon className="size-4" />
                        </motion.div>
                    );
                })}
            </motion.div>

            {label ? (
                <span className="whitespace-nowrap font-medium leading-none text-foreground/75">{label}</span>
            ) : null}
        </motion.div>
    );
};

export default StackBadge;
