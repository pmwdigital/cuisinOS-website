"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { cn } from "@/lib";
import { PhoneFrame } from "./phone-frame";

export interface PhoneScreen {
    id: string;
    label: string;
    content: React.ReactNode;
}

const LAYERS = [
    { x: "0%", scale: 1, opacity: 1, zIndex: 30 },
    { x: "72%", scale: 0.8, opacity: 0.55, zIndex: 20 },
    { x: "126%", scale: 0.66, opacity: 0.22, zIndex: 10 },
];

export function PhoneCarousel({
    screens,
    className,
}: {
    screens: PhoneScreen[];
    className?: string;
}) {
    const [active, setActive] = React.useState(0);
    const total = screens.length;

    const offsetOf = (index: number) => {
        const raw = index - active;
        const half = Math.floor(total / 2);
        if (raw > half) return raw - total;
        if (raw < -half) return raw + total;
        return raw;
    };

    const step = (direction: number) =>
        setActive((current) => (current + direction + total) % total);

    return (
        <div className={cn("flex w-full flex-col items-center", className)}>
            <div className="relative h-[26rem] w-full sm:h-[30rem]">
                {screens.map((screen, index) => {
                    const offset = offsetOf(index);
                    const depth = Math.min(Math.abs(offset), LAYERS.length - 1);
                    const layer = LAYERS[depth];
                    const direction = Math.sign(offset);

                    return (
                        <motion.div
                            key={screen.id}
                            aria-hidden={offset !== 0}
                            onClick={() => setActive(index)}
                            className="absolute left-1/2 top-0 h-full w-[11rem] -translate-x-1/2 sm:w-[13rem]"
                            animate={{
                                x: `calc(-50% + ${direction * parseFloat(layer.x)}%)`,
                                scale: layer.scale,
                                opacity: Math.abs(offset) >= LAYERS.length ? 0 : layer.opacity,
                                zIndex: layer.zIndex,
                            }}
                            transition={{ type: "spring", stiffness: 260, damping: 30 }}
                            style={{ pointerEvents: Math.abs(offset) >= LAYERS.length ? "none" : "auto" }}
                        >
                            <PhoneFrame>{screen.content}</PhoneFrame>
                        </motion.div>
                    );
                })}
            </div>

            <div className="mt-8 flex items-center gap-4">
                <button
                    type="button"
                    onClick={() => step(-1)}
                    aria-label="Önceki ekran"
                    className="flex size-9 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:border-grapefruit/50 hover:text-foreground"
                >
                    <ChevronLeftIcon className="size-4" />
                </button>

                <div className="flex items-center gap-2">
                    {screens.map((screen, index) => (
                        <button
                            key={screen.id}
                            type="button"
                            onClick={() => setActive(index)}
                            aria-label={screen.label}
                            aria-current={index === active}
                            className={cn(
                                "h-1.5 rounded-full transition-all duration-300",
                                index === active ? "w-6 bg-grapefruit-dark" : "w-1.5 bg-border"
                            )}
                        />
                    ))}
                </div>

                <button
                    type="button"
                    onClick={() => step(1)}
                    aria-label="Sonraki ekran"
                    className="flex size-9 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:border-grapefruit/50 hover:text-foreground"
                >
                    <ChevronRightIcon className="size-4" />
                </button>
            </div>

            <p className="mt-4 text-sm font-medium text-foreground">{screens[active]?.label}</p>
        </div>
    );
}
