"use client";

import * as React from "react";
import { CrownIcon } from "lucide-react";
import { cn } from "@/lib";

export interface LeaderboardRanking {
    userId: string;
    userName: string;
    rank: number;
    value: number;
}

const currency = new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
});

export const formatLeaderboardValue = (value: number) => currency.format(value);

export const initialsOf = (name: string) =>
    name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0])
        .join("")
        .toLocaleUpperCase("tr-TR");

const STEPS = {
    1: {
        order: "order-2",
        bar: "h-24 bg-grapefruit",
        avatar: "size-16 border-grapefruit bg-grapefruit-pale text-grapefruit-dark",
        label: "text-base",
    },
    2: {
        order: "order-1",
        bar: "h-16 bg-mint",
        avatar: "size-12 border-mint bg-mint-pale text-mint-dark",
        label: "text-sm",
    },
    3: {
        order: "order-3",
        bar: "h-12 bg-lemon",
        avatar: "size-12 border-lemon bg-lemon-pale text-chocolate",
        label: "text-sm",
    },
} as const;

export function LeaderboardPodium({
    rankings,
    className,
}: {
    rankings: LeaderboardRanking[];
    className?: string;
}) {
    const top = [...rankings].sort((a, b) => a.rank - b.rank).slice(0, 3);

    return (
        <div className={cn("flex items-end justify-center gap-3 sm:gap-5", className)}>
            {top.map((entry) => {
                const step = STEPS[entry.rank as 1 | 2 | 3] ?? STEPS[3];
                return (
                    <div
                        key={entry.userId}
                        className={cn("flex w-1/3 max-w-[10rem] flex-col items-center", step.order)}
                    >
                        {entry.rank === 1 && <CrownIcon className="mb-1.5 size-4 text-grapefruit-dark" />}
                        <span
                            className={cn(
                                "flex items-center justify-center rounded-full border-2 font-medium",
                                step.avatar
                            )}
                        >
                            {initialsOf(entry.userName)}
                        </span>
                        <p
                            className={cn(
                                "mt-2.5 line-clamp-1 text-center font-medium leading-none",
                                step.label
                            )}
                        >
                            {entry.userName}
                        </p>
                        <p className="mt-1.5 text-xs tabular-nums text-muted-foreground">
                            {formatLeaderboardValue(entry.value)}
                        </p>
                        <div
                            className={cn(
                                "mt-3 flex w-full items-start justify-center rounded-t-lg pt-2 text-sm font-medium text-chocolate",
                                step.bar
                            )}
                        >
                            {entry.rank}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
