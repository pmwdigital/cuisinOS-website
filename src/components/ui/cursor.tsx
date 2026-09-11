"use client";

import { useEffect, useRef, useState } from "react";
import {
    AnimatePresence,
    motion,
    useMotionValue,
    useSpring,
    type SpringOptions,
    type Transition,
    type Variant,
} from "framer-motion";
import { cn } from "@/lib";

type CursorProps = {
    children: React.ReactNode;
    className?: string;
    springConfig?: SpringOptions;
    attachToParent?: boolean;
    transition?: Transition;
    variants?: {
        initial: Variant;
        animate: Variant;
        exit: Variant;
    };
    onPositionChange?: (x: number, y: number) => void;
};

export function Cursor({
    children,
    className,
    springConfig,
    attachToParent,
    variants,
    transition,
    onPositionChange,
}: CursorProps) {
    const cursorX = useMotionValue(typeof window !== "undefined" ? window.innerWidth / 2 : 0);
    const cursorY = useMotionValue(typeof window !== "undefined" ? window.innerHeight / 2 : 0);
    const cursorRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(!attachToParent);

    useEffect(() => {
        const previousCursor = document.body.style.cursor;
        document.body.style.cursor = attachToParent ? "auto" : "none";

        const updatePosition = (event: MouseEvent) => {
            cursorX.set(event.clientX);
            cursorY.set(event.clientY);
            onPositionChange?.(event.clientX, event.clientY);
        };

        document.addEventListener("mousemove", updatePosition);

        return () => {
            document.removeEventListener("mousemove", updatePosition);
            document.body.style.cursor = previousCursor;
        };
    }, [attachToParent, cursorX, cursorY, onPositionChange]);

    const cursorXSpring = useSpring(cursorX, springConfig || { duration: 0 });
    const cursorYSpring = useSpring(cursorY, springConfig || { duration: 0 });

    useEffect(() => {
        if (!attachToParent) return;

        const parent = cursorRef.current?.parentElement;
        if (!parent) return;

        const handleEnter = () => {
            parent.style.cursor = "none";
            setIsVisible(true);
        };
        const handleLeave = () => {
            parent.style.cursor = "auto";
            setIsVisible(false);
        };

        parent.addEventListener("mouseenter", handleEnter);
        parent.addEventListener("mouseleave", handleLeave);

        return () => {
            parent.removeEventListener("mouseenter", handleEnter);
            parent.removeEventListener("mouseleave", handleLeave);
        };
    }, [attachToParent]);

    return (
        <motion.div
            ref={cursorRef}
            className={cn("pointer-events-none fixed left-0 top-0 z-50", className)}
            style={{
                x: cursorXSpring,
                y: cursorYSpring,
                translateX: "-50%",
                translateY: "-50%",
            }}
        >
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={variants}
                        transition={transition}
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
