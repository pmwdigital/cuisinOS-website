"use client";

import * as React from "react";

import { cn } from "@/lib";
import {
    LeaderboardPodium,
    type LeaderboardRanking as LeaderboardPodiumRanking,
} from "./leaderboard-podium";
import {
    LeaderboardRankings,
    type LeaderboardRankingItem,
} from "./leaderboard-rankings";

interface LeaderboardRunOption {
    id: string;
    label: string;
}

interface LeaderboardCardProps extends React.HTMLAttributes<HTMLDivElement> {
    title?: string;
    fromDate: string | Date;
    toDate: string | Date;
    podiumRankings: LeaderboardPodiumRanking[];
    rankings: LeaderboardRankingItem[];
    currentUserId?: string;
    runOptions?: LeaderboardRunOption[];
    selectedRunId?: string;
    onRunChange?: (runId: string) => void;
}

const rangeFormatter = new Intl.DateTimeFormat("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
});

function formatRangeDate(date: string | Date) {
    const parsed = date instanceof Date ? date : new Date(date);
    if (Number.isNaN(parsed.getTime())) return "";
    return rangeFormatter.format(parsed);
}

const LeaderboardCard = React.forwardRef<HTMLDivElement, LeaderboardCardProps>(
    (
        {
            className,
            title = "Sıralama",
            fromDate,
            toDate,
            podiumRankings,
            rankings,
            currentUserId,
            runOptions,
            selectedRunId,
            onRunChange,
            ...props
        },
        ref
    ) => {
        const fromLabel = formatRangeDate(fromDate);
        const toLabel = formatRangeDate(toDate);
        const resolvedRunId = selectedRunId ?? runOptions?.[0]?.id ?? "";
        const hasOnRunChange = Boolean(onRunChange);
        const [localRunId, setLocalRunId] = React.useState(resolvedRunId);

        React.useEffect(() => {
            if (hasOnRunChange) return;
            setLocalRunId(resolvedRunId);
        }, [hasOnRunChange, resolvedRunId]);

        const activeRunId = hasOnRunChange ? resolvedRunId : localRunId;

        return (
            <div
                ref={ref}
                className={cn("rounded-2xl border border-border bg-card p-6 shadow-sm", className)}
                {...props}
            >
                <div className="mb-6 flex items-start justify-between gap-4">
                    <div className="space-y-1">
                        <h3 className="font-heading text-lg font-medium tracking-tight">{title}</h3>
                        <p className="text-sm text-muted-foreground">
                            {fromLabel} ile {toLabel} arası
                        </p>
                    </div>

                    {runOptions && runOptions.length > 0 ? (
                        <select
                            aria-label="Dönem seçin"
                            value={activeRunId}
                            onChange={(event) => {
                                if (onRunChange) {
                                    onRunChange(event.target.value);
                                    return;
                                }
                                setLocalRunId(event.target.value);
                            }}
                            className="rounded-md border border-border bg-background px-3 py-1.5 text-sm text-foreground"
                        >
                            {runOptions.map((option) => (
                                <option key={option.id} value={option.id}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    ) : null}
                </div>

                <LeaderboardPodium rankings={podiumRankings} className="mb-6" />

                <LeaderboardRankings
                    rankings={rankings}
                    currentUserId={currentUserId}
                    showPagination
                    defaultPageSize={5}
                />
            </div>
        );
    }
);

LeaderboardCard.displayName = "LeaderboardCard";

export { LeaderboardCard };
export type { LeaderboardCardProps, LeaderboardRunOption };
