import { cn } from "@/lib";

export function PhoneFrame({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div
            className={cn(
                "relative aspect-[9/19] w-full rounded-[2.4rem] bg-chocolate p-[0.3rem] shadow-2xl shadow-chocolate/25",
                className
            )}
        >
            <span className="absolute -left-[2px] top-[22%] h-8 w-[3px] rounded-l bg-chocolate-light" />
            <span className="absolute -left-[2px] top-[32%] h-12 w-[3px] rounded-l bg-chocolate-light" />
            <span className="absolute -right-[2px] top-[27%] h-16 w-[3px] rounded-r bg-chocolate-light" />

            <div className="relative h-full w-full overflow-hidden rounded-[2.1rem] bg-background">
                <div className="absolute left-1/2 top-[0.55rem] z-20 h-[1.1rem] w-[4.5rem] -translate-x-1/2 rounded-full bg-chocolate" />
                <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-5 pt-[0.7rem] text-[0.55rem] font-medium text-foreground">
                    <span>9:41</span>
                    <span className="flex items-center gap-1">
                        <span className="h-[0.35rem] w-[0.35rem] rounded-full bg-foreground/70" />
                        <span className="h-[0.35rem] w-[0.55rem] rounded-[1px] bg-foreground/70" />
                    </span>
                </div>
                <div className="h-full w-full pt-[2.2rem]">{children}</div>
                <span className="absolute bottom-1.5 left-1/2 h-[0.2rem] w-[5.5rem] -translate-x-1/2 rounded-full bg-foreground/25" />
            </div>
        </div>
    );
}
