"use client";

import { cn } from "@/lib";
import {
    motion,
    transform,
    useAnimationFrame,
    useMotionValue,
    useMotionValueEvent,
    useReducedMotion,
    useScroll,
    useSpring,
    useTransform,
    useVelocity,
    type MotionValue,
    type SpringOptions,
} from "framer-motion";
import React, {
    useCallback,
    useEffect,
    useId,
    useMemo,
    useRef,
    type RefObject,
} from "react";

const wrap = (min: number, max: number, value: number): number => {
    const range = max - min;
    return ((((value - min) % range) + range) % range) + min;
};

type PreserveAspectRatioAlign =
    | "none"
    | "xMinYMin"
    | "xMidYMin"
    | "xMaxYMin"
    | "xMinYMid"
    | "xMidYMid"
    | "xMaxYMid"
    | "xMinYMax"
    | "xMidYMax"
    | "xMaxYMax";

type PreserveAspectRatioMeetOrSlice = "meet" | "slice";

type PreserveAspectRatio =
    | PreserveAspectRatioAlign
    | `${Exclude<PreserveAspectRatioAlign, "none">} ${PreserveAspectRatioMeetOrSlice}`;

export interface CSSVariableInterpolation {
    property: string;
    from: number | string;
    to: number | string;
}

interface MarqueeAlongSvgPathProps {
    children: React.ReactNode;
    className?: string;

    path: string;
    pathId?: string;
    preserveAspectRatio?: PreserveAspectRatio;
    showPath?: boolean;

    width?: string | number;
    height?: string | number;
    viewBox?: string;

    baseVelocity?: number;
    direction?: "normal" | "reverse";
    easing?: (value: number) => number;
    slowdownOnHover?: boolean;
    slowDownFactor?: number;
    slowDownSpringConfig?: SpringOptions;

    useScrollVelocity?: boolean;
    scrollAwareDirection?: boolean;
    scrollSpringConfig?: SpringOptions;
    scrollContainer?: RefObject<HTMLElement | null>;

    repeat?: number;

    draggable?: boolean;
    dragSensitivity?: number;
    dragVelocityDecay?: number;
    dragAwareDirection?: boolean;
    grabCursor?: boolean;

    enableRollingZIndex?: boolean;
    zIndexBase?: number;
    zIndexRange?: number;

    cssVariableInterpolation?: CSSVariableInterpolation[];

    offsetRotate?: string;

    responsive?: boolean;
    minScale?: number;
}

interface MarqueeItemProps {
    children: React.ReactNode;
    path: string;
    position: number;
    baseOffset: MotionValue<number>;
    easing?: (value: number) => number;
    offsetRotate: string;
    rollingZIndex: boolean;
    zIndexFor: (offsetDistance: number) => number;
    cssVariableInterpolation: CSSVariableInterpolation[];
    hidden: boolean;
    grabCursor: boolean;
    onHoverChange: (hovered: boolean) => void;
}

const MarqueeItem = ({
    children,
    path,
    position,
    baseOffset,
    easing,
    offsetRotate,
    rollingZIndex,
    zIndexFor,
    cssVariableInterpolation,
    hidden,
    grabCursor,
    onHoverChange,
}: MarqueeItemProps) => {
    const itemRef = useRef<HTMLDivElement>(null);

    const distance = useTransform(baseOffset, (value) => {
        const wrapped = wrap(0, 100, value + position);
        return easing ? easing(wrapped / 100) * 100 : wrapped;
    });
    const offsetDistance = useTransform(distance, (value) => `${value}%`);
    const zIndex = useTransform(distance, zIndexFor);

    const interpolators = useMemo(
        () =>
            cssVariableInterpolation.map(({ property, from, to }) => ({
                property,
                resolve: transform([0, 100], [from, to]),
            })),
        [cssVariableInterpolation]
    );

    const applyVariables = useCallback(
        (value: number) => {
            const element = itemRef.current;
            if (!element) return;
            interpolators.forEach(({ property, resolve }) => {
                element.style.setProperty(property, String(resolve(value)));
            });
        },
        [interpolators]
    );

    useEffect(() => {
        applyVariables(distance.get());
    }, [applyVariables, distance]);

    useMotionValueEvent(distance, "change", applyVariables);

    return (
        <motion.div
            ref={itemRef}
            className={cn("absolute left-0 top-0", grabCursor && "cursor-grab")}
            style={{
                offsetPath: `path('${path}')`,
                offsetDistance,
                offsetRotate,
                zIndex: rollingZIndex ? zIndex : undefined,
                willChange: "offset-distance",
                backfaceVisibility: "hidden",
            }}
            aria-hidden={hidden}
            onMouseEnter={() => onHoverChange(true)}
            onMouseLeave={() => onHoverChange(false)}
        >
            {children}
        </motion.div>
    );
};

const MarqueeAlongSvgPath = ({
    children,
    className,

    path,
    pathId,
    preserveAspectRatio = "xMidYMid meet",
    showPath = false,

    width = "100%",
    height = "100%",
    viewBox = "0 0 100 100",

    baseVelocity = 5,
    direction = "normal",
    easing,
    slowdownOnHover = false,
    slowDownFactor = 0.3,
    slowDownSpringConfig = { damping: 50, stiffness: 400 },

    useScrollVelocity = false,
    scrollAwareDirection = false,
    scrollSpringConfig = { damping: 50, stiffness: 400 },
    scrollContainer,

    repeat = 3,

    draggable = false,
    dragSensitivity = 0.2,
    dragVelocityDecay = 0.96,
    dragAwareDirection = false,
    grabCursor = false,

    enableRollingZIndex = true,
    zIndexBase = 1,
    zIndexRange = 10,

    cssVariableInterpolation = [],

    offsetRotate = "auto",

    responsive = false,
    minScale = 0,
}: MarqueeAlongSvgPathProps) => {
    const container = useRef<HTMLDivElement>(null);
    const marqueeContainerRef = useRef<HTMLDivElement>(null);
    const baseOffset = useMotionValue(0);
    const shouldReduceMotion = useReducedMotion();

    const generatedId = useId().replace(/:/g, "");
    const id = pathId ?? `marquee-path-${generatedId}`;

    useEffect(() => {
        if (!responsive) return;

        const [, , viewBoxWidth, viewBoxHeight] = viewBox.split(/[\s,]+/).map(Number);
        const baseWidth = viewBoxWidth || 100;
        const baseHeight = viewBoxHeight || 100;

        const updateScale = () => {
            const wrapper = container.current;
            const marqueeContainer = marqueeContainerRef.current;
            if (!wrapper || !marqueeContainer) return;

            const wrapperWidth = wrapper.clientWidth;
            const wrapperHeight = wrapper.clientHeight;
            const scale = Math.max(
                Math.min(wrapperWidth / baseWidth, wrapperHeight / baseHeight),
                minScale
            );

            const offsetX = (wrapperWidth - baseWidth * scale) / 2;
            const offsetY = (wrapperHeight - baseHeight * scale) / 2;

            marqueeContainer.style.width = `${baseWidth}px`;
            marqueeContainer.style.height = `${baseHeight}px`;
            marqueeContainer.style.transformOrigin = "top left";
            marqueeContainer.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale})`;
        };

        updateScale();

        const wrapper = container.current;
        if (!wrapper || typeof ResizeObserver === "undefined") return;

        const observer = new ResizeObserver(updateScale);
        observer.observe(wrapper);
        return () => observer.disconnect();
    }, [responsive, viewBox, minScale]);

    const isInView = useRef(true);

    useEffect(() => {
        const wrapper = container.current;
        if (!wrapper || typeof IntersectionObserver === "undefined") return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                isInView.current = entry.isIntersecting;
            },
            { rootMargin: "240px" }
        );
        observer.observe(wrapper);
        return () => observer.disconnect();
    }, []);

    const items = useMemo(() => {
        const childrenArray = React.Children.toArray(children);
        const total = childrenArray.length * repeat;

        return childrenArray.flatMap((child, childIndex) =>
            Array.from({ length: repeat }, (_, repeatIndex) => {
                const itemIndex = repeatIndex * childrenArray.length + childIndex;
                return {
                    child,
                    repeatIndex,
                    key: `${childIndex}-${repeatIndex}`,
                    position: (itemIndex * 100) / total,
                };
            })
        );
    }, [children, repeat]);

    const zIndexFor = useCallback(
        (offsetDistance: number) =>
            Math.floor(zIndexBase + (offsetDistance / 100) * zIndexRange),
        [zIndexBase, zIndexRange]
    );

    const { scrollY } = useScroll(scrollContainer ? { container: scrollContainer } : undefined);
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, scrollSpringConfig);

    const isHovered = useRef(false);
    const isDragging = useRef(false);
    const dragVelocity = useRef(0);
    const directionFactor = useRef(direction === "normal" ? 1 : -1);

    const hoverFactorValue = useMotionValue(1);
    const defaultVelocity = useMotionValue(1);
    const smoothHoverFactor = useSpring(hoverFactorValue, slowDownSpringConfig);

    const velocityFactor = useTransform(
        useScrollVelocity ? smoothVelocity : defaultVelocity,
        [0, 1000],
        [0, 5],
        { clamp: false }
    );

    const handleHoverChange = useCallback((hovered: boolean) => {
        isHovered.current = hovered;
    }, []);

    useAnimationFrame((_, delta) => {
        if (shouldReduceMotion || !isInView.current) return;

        if (isDragging.current && draggable) {
            baseOffset.set(baseOffset.get() + dragVelocity.current);
            dragVelocity.current *= 0.9;

            if (Math.abs(dragVelocity.current) < 0.01) {
                dragVelocity.current = 0;
            }

            return;
        }

        hoverFactorValue.set(isHovered.current && slowdownOnHover ? slowDownFactor : 1);

        let moveBy =
            directionFactor.current * baseVelocity * (delta / 1000) * smoothHoverFactor.get();

        if (scrollAwareDirection && !isDragging.current) {
            if (velocityFactor.get() < 0) {
                directionFactor.current = -1;
            } else if (velocityFactor.get() > 0) {
                directionFactor.current = 1;
            }
        }

        moveBy += directionFactor.current * moveBy * velocityFactor.get();

        if (draggable) {
            moveBy += dragVelocity.current;

            if (dragAwareDirection && Math.abs(dragVelocity.current) > 0.1) {
                directionFactor.current = Math.sign(dragVelocity.current);
            }

            if (!isDragging.current && Math.abs(dragVelocity.current) > 0.01) {
                dragVelocity.current *= dragVelocityDecay;
            } else if (!isDragging.current) {
                dragVelocity.current = 0;
            }
        }

        baseOffset.set(baseOffset.get() + moveBy);
    });

    const lastPointerPosition = useRef({ x: 0, y: 0 });

    const handlePointerDown = (event: React.PointerEvent) => {
        if (!draggable) return;
        const target = event.currentTarget as HTMLElement;
        target.setPointerCapture(event.pointerId);

        if (grabCursor) {
            target.style.cursor = "grabbing";
        }

        isDragging.current = true;
        lastPointerPosition.current = { x: event.clientX, y: event.clientY };
        dragVelocity.current = 0;
    };

    const handlePointerMove = (event: React.PointerEvent) => {
        if (!draggable || !isDragging.current) return;

        const deltaX = event.clientX - lastPointerPosition.current.x;
        const deltaY = event.clientY - lastPointerPosition.current.y;
        const delta = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const projectedDelta = deltaX > 0 ? delta : -delta;

        dragVelocity.current = projectedDelta * dragSensitivity;
        lastPointerPosition.current = { x: event.clientX, y: event.clientY };
    };

    const handlePointerUp = (event: React.PointerEvent) => {
        if (!draggable) return;
        const target = event.currentTarget as HTMLElement;
        target.releasePointerCapture(event.pointerId);
        isDragging.current = false;

        if (grabCursor) {
            target.style.cursor = "grab";
        }
    };

    return (
        <div
            ref={container}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className={cn("relative", className)}
        >
            <div
                ref={marqueeContainerRef}
                className="relative"
                style={{ contain: "layout style" }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={width}
                    height={height}
                    viewBox={viewBox}
                    preserveAspectRatio={preserveAspectRatio}
                    className="h-full w-full"
                    aria-hidden="true"
                >
                    <path id={id} d={path} stroke={showPath ? "currentColor" : "none"} fill="none" />
                </svg>

                {items.map(({ child, repeatIndex, key, position }) => (
                    <MarqueeItem
                        key={key}
                        path={path}
                        position={position}
                        baseOffset={baseOffset}
                        easing={easing}
                        offsetRotate={offsetRotate}
                        rollingZIndex={enableRollingZIndex}
                        zIndexFor={zIndexFor}
                        cssVariableInterpolation={cssVariableInterpolation}
                        hidden={repeatIndex > 0}
                        grabCursor={draggable && grabCursor}
                        onHoverChange={handleHoverChange}
                    >
                        {child}
                    </MarqueeItem>
                ))}
            </div>
        </div>
    );
};

export default MarqueeAlongSvgPath;
