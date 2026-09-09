"use client";

import { cn } from "@/lib";
import { SparklesIcon } from "lucide-react";

export interface DisplayCardProps {
    className?: string;
    icon?: React.ReactNode;
    title?: string;
    description?: string;
    meta?: string;
    tone?: "grapefruit" | "mint" | "lemon";
}

const TONES = {
    grapefruit: { chip: "bg-grapefruit-pale text-grapefruit-dark", title: "text-grapefruit-dark" },
    mint: { chip: "bg-mint-pale text-mint-dark", title: "text-mint-dark" },
    lemon: { chip: "bg-lemon-pale text-lemon-dark", title: "text-lemon-dark" },
} as const;

function DisplayCard({
    className,
    icon = <SparklesIcon className="size-3.5" />,
    title = "Bildirim",
    description = "Serviste yeni bir olay",
    meta = "Az önce",
    tone = "grapefruit",
}: DisplayCardProps) {
    const palette = TONES[tone];
    return (
        <div
            className={cn(
                "relative flex h-36 w-[20rem] -skew-y-[8deg] select-none flex-col justify-between rounded-xl border border-border bg-card/90 px-4 py-3 shadow-sm backdrop-blur-sm transition-all duration-700 after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[18rem] after:bg-gradient-to-l after:from-background after:to-transparent after:content-[''] hover:border-grapefruit/40 hover:bg-card sm:w-[22rem] [&>*]:flex [&>*]:items-center [&>*]:gap-2",
                className
            )}
        >
            <div>
                <span className={cn("relative inline-flex items-center justify-center rounded-full p-1.5", palette.chip)}>
                    {icon}
                </span>
                <p className={cn("text-sm font-medium", palette.title)}>{title}</p>
            </div>
            <p className="whitespace-nowrap text-base font-medium text-foreground">{description}</p>
            <p className="text-xs text-muted-foreground">{meta}</p>
        </div>
    );
}

interface DisplayCardsProps {
    cards: DisplayCardProps[];
}

const STACK_BASE =
    "[grid-area:stack] before:absolute before:left-0 before:top-0 before:h-full before:w-full before:rounded-xl before:bg-background/55 before:content-[''] before:transition-opacity before:duration-700 hover:before:opacity-0 grayscale-[65%] hover:grayscale-0";

export const STACK_POSITIONS = [
    cn(STACK_BASE, "hover:-translate-y-10"),
    cn(STACK_BASE, "translate-x-10 translate-y-10 hover:-translate-y-1"),
    "[grid-area:stack] translate-x-20 translate-y-20 hover:translate-y-10",
];

export default function DisplayCards({ cards }: DisplayCardsProps) {
    return (
        <div className="grid animate-in fade-in-0 place-items-center duration-700 [grid-template-areas:'stack']">
            {cards.map((card, index) => (
                <DisplayCard key={card.title ?? index} {...card} />
            ))}
        </div>
    );
}
