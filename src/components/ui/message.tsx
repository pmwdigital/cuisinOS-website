"use client";

import { cn } from "@/lib";

type MessageFrom = "user" | "assistant";

interface MessageProps extends React.HTMLAttributes<HTMLDivElement> {
    from: MessageFrom;
}

export const Message = ({ from, className, children, ...props }: MessageProps) => (
    <div
        data-from={from}
        className={cn(
            "group flex w-full items-end gap-2",
            from === "user" ? "flex-row-reverse justify-start" : "justify-start",
            className
        )}
        {...props}
    >
        {children}
    </div>
);

interface MessageContentProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "contained" | "flat";
}

export const MessageContent = ({
    variant = "contained",
    className,
    children,
    ...props
}: MessageContentProps) => (
    <div
        className={cn(
            "max-w-[78%] text-sm leading-relaxed",
            variant === "contained" &&
                "rounded-2xl px-3.5 py-2.5 group-data-[from=user]:rounded-br-md group-data-[from=user]:bg-chocolate group-data-[from=user]:text-cream group-data-[from=assistant]:rounded-bl-md group-data-[from=assistant]:border group-data-[from=assistant]:border-border group-data-[from=assistant]:bg-background group-data-[from=assistant]:text-foreground",
            variant === "flat" && "text-foreground/80",
            className
        )}
        {...props}
    >
        {children}
    </div>
);

interface MessageAvatarProps {
    name?: string;
    className?: string;
    children?: React.ReactNode;
}

export const MessageAvatar = ({ name, className, children }: MessageAvatarProps) => (
    <span
        className={cn(
            "flex size-7 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-secondary text-[10px] font-semibold text-muted-foreground ring-2 ring-background",
            className
        )}
        aria-hidden="true"
    >
        {children ?? name?.slice(0, 2)}
    </span>
);

export const MessageTyping = () => (
    <span className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-border bg-background px-3.5 py-3">
        {[0, 1, 2].map((dot) => (
            <span
                key={dot}
                className="size-1.5 animate-bounce rounded-full bg-muted-foreground/60"
                style={{ animationDelay: `${dot * 0.15}s` }}
            />
        ))}
    </span>
);
