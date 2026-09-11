"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib";

export interface StackingCardItem {
    id: string;
    title: string;
    description: string;
    bullets: string[];
    tone: string;
    visual: React.ReactNode;
}

const StackingCard = ({
    index,
    item,
    progress,
    range,
    targetScale,
}: {
    index: number;
    item: StackingCardItem;
    progress: MotionValue<number>;
    range: [number, number];
    targetScale: number;
}) => {
    const container = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", "start start"],
    });

    const visualScale = useTransform(scrollYProgress, [0, 1], [1.18, 1]);
    const scale = useTransform(progress, range, [1, targetScale]);

    return (
        <div ref={container} className="sticky top-0 flex h-[72vh] items-center justify-center">
            <motion.div
                style={{ scale, top: `calc(-4vh + ${index * 22}px)` }}
                className={cn(
                    "relative flex w-full max-w-4xl origin-top flex-col overflow-hidden rounded-2xl border border-border p-6 sm:p-8 lg:rounded-3xl lg:p-10",
                    item.tone
                )}
            >
                <div className="flex items-center justify-between gap-4">
                    <h3 className="font-heading text-xl font-normal tracking-tight text-chocolate sm:text-2xl">
                        {item.title}
                    </h3>
                    <span className="shrink-0 rounded-full border border-chocolate/15 bg-background/70 px-2.5 py-1 text-[10px] font-medium text-chocolate/70">
                        Örnek kurulum
                    </span>
                </div>

                <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:gap-10">
                    <div className="lg:w-[42%]">
                        <p className="text-sm leading-relaxed text-chocolate/75">{item.description}</p>
                        <ul className="mt-5 space-y-2">
                            {item.bullets.map((bullet) => (
                                <li key={bullet} className="flex items-start gap-2 text-sm text-chocolate/75">
                                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-chocolate/40" />
                                    {bullet}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="relative min-h-[12rem] flex-1 overflow-hidden rounded-xl border border-chocolate/10 bg-background/70">
                        <motion.div style={{ scale: visualScale }} className="h-full w-full origin-center">
                            {item.visual}
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export function StackingCards({ items }: { items: StackingCardItem[] }) {
    const container = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start start", "end end"],
    });

    return (
        <div ref={container} className="w-full">
            {items.map((item, index) => (
                <StackingCard
                    key={item.id}
                    index={index}
                    item={item}
                    progress={scrollYProgress}
                    range={[index * 0.25, 1]}
                    targetScale={1 - (items.length - index) * 0.04}
                />
            ))}
        </div>
    );
}
