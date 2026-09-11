"use client";

import * as React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { cn } from "@/lib";
import { formatLeaderboardValue, initialsOf } from "./leaderboard-podium";

export interface LeaderboardRankingItem {
    userId: string;
    rank: number;
    userName: string;
    byline?: string;
    value: number;
    displayed?: boolean;
}

export function LeaderboardRankings({
    rankings,
    currentUserId,
    showPagination = false,
    defaultPageSize = 10,
    className,
}: {
    rankings: LeaderboardRankingItem[];
    currentUserId?: string;
    showPagination?: boolean;
    defaultPageSize?: number;
    className?: string;
}) {
    const visible = rankings.filter((entry) => entry.displayed !== false);
    const [page, setPage] = React.useState(0);
    const pageCount = showPagination ? Math.max(1, Math.ceil(visible.length / defaultPageSize)) : 1;
    const current = Math.min(page, pageCount - 1);
    const rows = showPagination
        ? visible.slice(current * defaultPageSize, (current + 1) * defaultPageSize)
        : visible;

    return (
        <div className={cn("w-full", className)}>
            <ul className="divide-y divide-border">
                {rows.map((entry) => {
                    const isCurrent = entry.userId === currentUserId;
                    return (
                        <li
                            key={entry.userId}
                            className={cn(
                                "flex items-center gap-3 rounded-lg px-2 py-2.5 sm:gap-4 sm:px-3",
                                isCurrent && "bg-grapefruit-pale/60"
                            )}
                        >
                            <span className="w-5 shrink-0 text-sm tabular-nums text-muted-foreground">
                                {entry.rank}
                            </span>
                            <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border bg-secondary text-xs font-medium">
                                {initialsOf(entry.userName)}
                            </span>
                            <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-medium leading-none">{entry.userName}</p>
                                {entry.byline && (
                                    <p className="mt-1 truncate text-xs text-muted-foreground">{entry.byline}</p>
                                )}
                            </div>
                            <span className="shrink-0 text-sm font-medium tabular-nums">
                                {formatLeaderboardValue(entry.value)}
                            </span>
                        </li>
                    );
                })}
            </ul>

            {showPagination && pageCount > 1 && (
                <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                    <button
                        type="button"
                        onClick={() => setPage((value) => Math.max(0, value - 1))}
                        disabled={current === 0}
                        className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
                    >
                        <ChevronLeftIcon className="size-3.5" />
                        Önceki
                    </button>
                    <span className="text-xs tabular-nums text-muted-foreground">
                        {current + 1} / {pageCount}
                    </span>
                    <button
                        type="button"
                        onClick={() => setPage((value) => Math.min(pageCount - 1, value + 1))}
                        disabled={current === pageCount - 1}
                        className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
                    >
                        Sonraki
                        <ChevronRightIcon className="size-3.5" />
                    </button>
                </div>
            )}
        </div>
    );
}
