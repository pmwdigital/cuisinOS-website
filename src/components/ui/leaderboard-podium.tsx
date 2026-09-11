"use client";

import * as React from "react";
import Image from "next/image";
import { CrownIcon } from "lucide-react";
import { cn } from "@/lib";

export interface LeaderboardRanking {
    userId: string;
    userName: string;
    rank: number;
    value: number;
    avatar?: string;
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
        bar: "h-12 bg-grapefruit",
        avatar: "size-12 border-grapefruit bg-grapefruit-pale text-grapefruit-dark",
        label: "text-sm",
    },
    2: {
        order: "order-1",
        bar: "h-9 bg-mint",
        avatar: "size-10 border-mint bg-mint-pale text-mint-dark",
        label: "text-xs",
    },
    3: {
        order: "order-3",
        bar: "h-7 bg-lemon",
        avatar: "size-10 border-lemon bg-lemon-pale text-chocolate",
        label: "text-xs",
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
        <div className={cn("flex items-end justify-center gap-3 sm:gap-4", className)}>
            {top.map((entry) => {
                const step = STEPS[entry.rank as 1 | 2 | 3] ?? STEPS[3];
                return (
                    <div
                        key={entry.userId}
                        className={cn("flex w-1/3 max-w-[10rem] flex-col items-center", step.order)}
                    >
                        {entry.rank === 1 && <CrownIcon className="mb-1 size-3.5 text-grapefruit-dark" />}
                        {entry.avatar ? (
                            <Image
                                src={entry.avatar}
                                alt=""
                                width={96}
                                height={96}
                                className={cn("rounded-full border-2 object-cover", step.avatar)}
                            />
                        ) : (
                            <span
                                className={cn(
                                    "flex items-center justify-center rounded-full border-2 text-xs font-medium",
                                    step.avatar
                                )}
                            >
                                {initialsOf(entry.userName)}
                            </span>
                        )}
                        <p
                            className={cn(
                                "mt-2 line-clamp-1 text-center font-medium leading-none",
                                step.label
                            )}
                        >
                            {entry.userName}
                        </p>
                        <p className="mt-1 text-[11px] tabular-nums text-muted-foreground">
                            {formatLeaderboardValue(entry.value)}
                        </p>
                        <div
                            className={cn(
                                "mt-2 flex w-full items-start justify-center rounded-t-lg pt-1.5 text-xs font-medium text-chocolate",
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
