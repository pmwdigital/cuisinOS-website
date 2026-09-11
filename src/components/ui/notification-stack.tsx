"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Icons from "../global/icons";
import { cn } from "@/lib";

export interface NotificationItem {
    id: string;
    title: string;
    detail: string;
    meta: string;
    tone: "grapefruit" | "mint" | "lemon";
    icon: React.ReactNode;
}

const TONES = {
    grapefruit: "bg-grapefruit-pale text-grapefruit-dark",
    mint: "bg-mint-pale text-mint-dark",
    lemon: "bg-lemon-pale text-chocolate",
} as const;

const OFFSET_FACTOR = 9;
const SCALE_FACTOR = 0.045;
const OPACITY_FACTOR = 0.1;

export function NotificationStack({ items }: { items: NotificationItem[] }) {
    const [dismissed, setDismissed] = React.useState<string[]>([]);
    const cards = items.filter(({ id }) => !dismissed.includes(id));
    const cardCount = cards.length;
    const [showCleared, setShowCleared] = React.useState(true);

    React.useEffect(() => {
        if (cardCount !== 0) return;
        const timeout = setTimeout(() => setShowCleared(false), 4000);
        return () => clearTimeout(timeout);
    }, [cardCount]);

    const reset = () => {
        setDismissed([]);
        setShowCleared(true);
    };

    if (!cardCount && !showCleared) {
        return (
            <div className="flex h-full w-full items-center justify-center">
                <button
                    type="button"
                    onClick={reset}
                    className="rounded-full border border-border bg-background px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-grapefruit/50 hover:text-foreground"
                >
                    Bildirimleri geri getir
                </button>
            </div>
        );
    }

    return (
        <div className="group w-full overflow-hidden px-3 pb-3 pt-8" data-active={cardCount !== 0}>
            <div className="relative size-full">
                {[...cards].reverse().map((item, idx) => (
                    <div
                        key={item.id}
                        className={cn(
                            "absolute left-0 top-0 size-full scale-[var(--scale)] transition-[opacity,transform] duration-200",
                            cardCount - idx > 3
                                ? [
                                    "opacity-0 sm:group-hover:translate-y-[var(--y)] sm:group-hover:opacity-[var(--opacity)]",
                                    "sm:group-has-[*[data-dragging=true]]:translate-y-[var(--y)] sm:group-has-[*[data-dragging=true]]:opacity-[var(--opacity)]",
                                ]
                                : "translate-y-[var(--y)] opacity-[var(--opacity)]"
                        )}
                        style={
                            {
                                "--y": `-${(cardCount - (idx + 1)) * OFFSET_FACTOR}%`,
                                "--scale": 1 - (cardCount - (idx + 1)) * SCALE_FACTOR,
                                "--opacity":
                                    cardCount - (idx + 1) >= 6
                                        ? 0
                                        : 1 - (cardCount - (idx + 1)) * OPACITY_FACTOR,
                            } as React.CSSProperties
                        }
                        aria-hidden={idx !== cardCount - 1}
                    >
                        <NotificationCard
                            item={item}
                            hideContent={cardCount - idx > 2}
                            active={idx === cardCount - 1}
                            onDismiss={() => setDismissed((current) => [item.id, ...current])}
                        />
                    </div>
                ))}

                <div className="pointer-events-none invisible" aria-hidden>
                    <NotificationCard
                        item={{
                            id: "sizer",
                            title: "Başlık",
                            detail: "Açıklama",
                            meta: "Az önce",
                            tone: "grapefruit",
                            icon: null,
                        }}
                    />
                </div>

                {!cardCount && showCleared && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="absolute inset-0 flex size-full flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card"
                    >
                        <Icons.icon className="size-8 text-mint-dark" />
                        <span className="text-xs font-medium text-muted-foreground">
                            Bekleyen bildirim kalmadı
                        </span>
                    </motion.div>
                )}
            </div>
        </div>
    );
}

function NotificationCard({
    item,
    onDismiss,
    hideContent,
    active,
}: {
    item: NotificationItem;
    onDismiss?: () => void;
    hideContent?: boolean;
    active?: boolean;
}) {
    const ref = React.useRef<HTMLDivElement>(null);
    const drag = React.useRef({ start: 0, delta: 0 });
    const animation = React.useRef<Animation | null>(null);
    const [dragging, setDragging] = React.useState(false);

    const onDragMove = React.useCallback((event: PointerEvent) => {
        if (!ref.current) return;
        const dx = event.clientX - drag.current.start;
        drag.current.delta = dx;
        ref.current.style.setProperty("--dx", dx.toString());
    }, []);

    const dismiss = React.useCallback(() => {
        if (!ref.current) return;
        const cardWidth = ref.current.getBoundingClientRect().width;
        const direction = drag.current.delta === 0 ? 1 : Math.sign(drag.current.delta);
        animation.current = ref.current.animate(
            { opacity: 0, transform: `translateX(${direction * cardWidth}px)` },
            { duration: 150, easing: "ease-in-out", fill: "forwards" }
        );
        animation.current.onfinish = () => onDismiss?.();
    }, [onDismiss]);

    const stopDragging = React.useCallback(() => {
        if (!ref.current) return;
        document.removeEventListener("pointermove", onDragMove);
        setDragging(false);

        if (Math.abs(drag.current.delta) > ref.current.clientWidth / 3) {
            dismiss();
            return;
        }

        animation.current = ref.current.animate(
            { transform: "translateX(0)" },
            { duration: 150, easing: "ease-in-out" }
        );
        animation.current.onfinish = () => ref.current?.style.setProperty("--dx", "0");
        drag.current = { start: 0, delta: 0 };
    }, [dismiss, onDragMove]);

    React.useEffect(() => {
        if (!dragging) return;
        const handleUp = () => stopDragging();
        document.addEventListener("pointermove", onDragMove);
        document.addEventListener("pointerup", handleUp);
        document.addEventListener("pointercancel", handleUp);
        return () => {
            document.removeEventListener("pointermove", onDragMove);
            document.removeEventListener("pointerup", handleUp);
            document.removeEventListener("pointercancel", handleUp);
        };
    }, [dragging, onDragMove, stopDragging]);

    const onPointerDown = (event: React.PointerEvent) => {
        if (!active || !ref.current || animation.current?.playState === "running") return;
        setDragging(true);
        drag.current.start = event.clientX;
        drag.current.delta = 0;
        ref.current.style.setProperty("--w", ref.current.clientWidth.toString());
    };

    return (
        <div
            ref={ref}
            className={cn(
                "relative select-none rounded-xl border border-border bg-background p-4 shadow-sm",
                "translate-x-[calc(var(--dx,0)*1px)] rotate-[calc(var(--dx,0)*0.04deg)] opacity-[calc(1-max(var(--dx,0),-1*var(--dx,0))/var(--w,1)/2)]",
                "transition-shadow data-[dragging=true]:shadow-md",
                active && "cursor-grab data-[dragging=true]:cursor-grabbing"
            )}
            data-dragging={dragging}
            onPointerDown={onPointerDown}
        >
            <div className={cn(hideContent && "invisible")}>
                <div className="flex items-start gap-3">
                    <span
                        className={cn(
                            "flex size-8 shrink-0 items-center justify-center rounded-full",
                            TONES[item.tone]
                        )}
                    >
                        {item.icon}
                    </span>
                    <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium leading-none">{item.title}</p>
                        <p className="mt-1.5 line-clamp-2 text-sm leading-5 text-muted-foreground">
                            {item.detail}
                        </p>
                    </div>
                </div>

                <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                    <span className="text-xs text-muted-foreground">{item.meta}</span>
                    <button
                        type="button"
                        onClick={dismiss}
                        className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Kapat
                    </button>
                </div>
            </div>
        </div>
    );
}
