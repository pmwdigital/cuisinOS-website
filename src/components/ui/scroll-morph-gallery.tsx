"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import Icons from "../global/icons";

type IntroPhase = "scatter" | "line" | "circle";

const CARD_WIDTH = 60;
const CARD_HEIGHT = 85;

const lerp = (start: number, end: number, t: number) => start * (1 - t) + end * t;

interface CardTarget {
    x: number;
    y: number;
    rotation: number;
    scale: number;
    opacity: number;
}

const FlipCard = ({
    src,
    index,
    target,
    settled,
    flipEnabled,
}: {
    src: string;
    index: number;
    target: CardTarget;
    settled: boolean;
    flipEnabled: boolean;
}) => {
    const [hovered, setHovered] = React.useState(false);
    const flipped = hovered && flipEnabled && target.opacity > 0.5;

    React.useEffect(() => {
        if (!flipEnabled) setHovered(false);
    }, [flipEnabled]);

    return (
    <motion.div
        animate={{
            x: target.x,
            y: target.y,
            rotate: target.rotation,
            scale: target.scale,
            opacity: target.opacity,
        }}
        transition={
            settled
                ? { type: "tween", duration: 0.08, ease: "linear" }
                : { type: "spring", stiffness: 70, damping: 18 }
        }
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            marginLeft: -CARD_WIDTH / 2,
            marginTop: -CARD_HEIGHT / 2,
            width: CARD_WIDTH,
            height: CARD_HEIGHT,
            transformStyle: "preserve-3d",
            perspective: 1000,
            zIndex: flipped ? 40 : 20,
            pointerEvents: target.opacity > 0.5 ? "auto" : "none",
        }}
        className="group"
    >
        <motion.div
            className="relative h-full w-full"
            style={{ transformStyle: "preserve-3d" }}
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
        >
            <div
                className="absolute inset-0 h-full w-full overflow-hidden rounded-xl bg-secondary shadow-lg shadow-chocolate/10"
                style={{ backfaceVisibility: "hidden" }}
            >
                <Image
                    src={src}
                    alt=""
                    fill
                    sizes="140px"
                    draggable={false}
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-chocolate/10 transition-colors group-hover:bg-transparent" />
            </div>

            <div
                className="absolute inset-0 flex h-full w-full flex-col items-center justify-center gap-1.5 overflow-hidden rounded-xl bg-chocolate p-2 text-center shadow-lg"
                style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
            >
                <Icons.icon className="size-4 text-grapefruit" />
                <p className="text-[7px] font-medium leading-tight text-cream">Menüde</p>
                <p className="text-[6px] leading-tight text-cream/60">Panelden yönetilir</p>
            </div>
        </motion.div>
        <span className="sr-only">{`Menü fotoğrafı ${index + 1}`}</span>
    </motion.div>
    );
};

export function ScrollMorphGallery({
    images,
    introTitle,
    introHint,
    title,
    description,
}: {
    images: string[];
    introTitle: string;
    introHint: string;
    title: string;
    description: string;
}) {
    const trackRef = React.useRef<HTMLDivElement>(null);
    const stageRef = React.useRef<HTMLDivElement>(null);

    const [introPhase, setIntroPhase] = React.useState<IntroPhase>("scatter");
    const [stageSize, setStageSize] = React.useState({ width: 0, height: 0 });
    const [frame, setFrame] = React.useState({ morph: 0, shuffle: 0, parallax: 0 });
    const [flipEnabled, setFlipEnabled] = React.useState(true);
    const [canHover, setCanHover] = React.useState(false);

    const { scrollYProgress } = useScroll({ target: trackRef });

    const morph = useTransform(scrollYProgress, [0.06, 0.44], [0, 1]);
    const shuffle = useTransform(scrollYProgress, [0.46, 0.96], [0, 1]);
    const smoothMorph = useSpring(morph, { stiffness: 120, damping: 26 });
    const smoothShuffle = useSpring(shuffle, { stiffness: 120, damping: 26 });

    const pointerX = useMotionValue(0);
    const smoothPointerX = useSpring(pointerX, { stiffness: 90, damping: 22 });

    React.useEffect(() => {
        const stage = stageRef.current;
        if (!stage) return;

        const measure = () =>
            setStageSize({ width: stage.offsetWidth, height: stage.offsetHeight });
        measure();

        const observer = new ResizeObserver(measure);
        observer.observe(stage);
        return () => observer.disconnect();
    }, []);

    React.useEffect(() => {
        const stage = stageRef.current;
        if (!stage) return;

        let started = false;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting || started) return;
                started = true;
                setTimeout(() => setIntroPhase("line"), 350);
                setTimeout(() => setIntroPhase("circle"), 1600);
            },
            { threshold: 0.25 }
        );
        observer.observe(stage);
        return () => observer.disconnect();
    }, []);

    React.useEffect(() => {
        const query = window.matchMedia("(hover: hover) and (pointer: fine)");
        const update = () => setCanHover(query.matches);
        update();
        query.addEventListener("change", update);
        return () => query.removeEventListener("change", update);
    }, []);

    React.useEffect(() => {
        let timeout = 0;

        const handleScroll = () => {
            setFlipEnabled((current) => (current ? false : current));
            window.clearTimeout(timeout);
            timeout = window.setTimeout(() => setFlipEnabled(true), 180);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.clearTimeout(timeout);
        };
    }, []);

    React.useEffect(() => {
        const stage = stageRef.current;
        if (!stage) return;

        const handleMove = (event: MouseEvent) => {
            const rect = stage.getBoundingClientRect();
            const normalized = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            pointerX.set(normalized * 26);
        };

        stage.addEventListener("mousemove", handleMove);
        return () => stage.removeEventListener("mousemove", handleMove);
    }, [pointerX]);

    React.useEffect(() => {
        let raf = 0;
        const commit = () => {
            raf = 0;
            setFrame({
                morph: smoothMorph.get(),
                shuffle: smoothShuffle.get(),
                parallax: smoothPointerX.get(),
            });
        };
        const schedule = () => {
            if (raf) return;
            raf = requestAnimationFrame(commit);
        };

        const unsubscribe = [
            smoothMorph.on("change", schedule),
            smoothShuffle.on("change", schedule),
            smoothPointerX.on("change", schedule),
        ];

        return () => {
            unsubscribe.forEach((stop) => stop());
            if (raf) cancelAnimationFrame(raf);
        };
    }, [smoothMorph, smoothShuffle, smoothPointerX]);

    const scatter = React.useMemo(
        () =>
            images.map((_, index) => {
                const noise = (seed: number) => ((index + 1) * seed) % 1;
                return {
                    x: (noise(0.6180339) - 0.5) * 1400,
                    y: (noise(0.3819660) - 0.5) * 900,
                    rotation: (noise(0.2360679) - 0.5) * 180,
                    scale: 0.6,
                    opacity: 0,
                };
            }),
        [images]
    );

    const total = images.length;
    const isNarrow = stageSize.width < 768;
    const minDimension = Math.min(stageSize.width, stageSize.height);
    const circleRadius = Math.min(minDimension * 0.38, 330);
    const arcRadius = Math.min(stageSize.width, stageSize.height * 1.5) * (isNarrow ? 2.2 : 0.9);
    const arcCenterY = stageSize.height * (isNarrow ? 0.14 : 0.06) + arcRadius;
    const spreadAngle = isNarrow ? 74 : 80;
    const startAngle = -90 - spreadAngle / 2;
    const step = total > 1 ? spreadAngle / (total - 1) : 0;
    const boundedRotation = -frame.shuffle * spreadAngle * 0.3;

    const cardReach = isNarrow ? 62 : 95;
    const fadeBand = isNarrow ? 55 : 105;
    const fadeEnd = Math.max(stageSize.width / 2 - cardReach, 0);
    const fadeStart = Math.max(fadeEnd - fadeBand, 0);
    const edgeOpacity = (x: number) => {
        const distance = Math.abs(x);
        if (distance <= fadeStart) return 1;
        if (distance >= fadeEnd) return 0;
        return 1 - (distance - fadeStart) / (fadeEnd - fadeStart);
    };

    const introOpacity = Math.max(0, 1 - frame.morph * 2.2);
    const arcOpacity = Math.max(0, Math.min(1, (frame.morph - 0.7) / 0.3));

    return (
        <div ref={trackRef} className="relative h-[260vh] w-full motion-reduce:h-[130vh]">
            <div
                ref={stageRef}
                className="sticky top-16 h-[calc(100svh-4rem)] w-full overflow-hidden [perspective:1000px]"
            >
                <div
                    className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center"
                    style={{ opacity: introOpacity }}
                >
                    <h2 className="max-w-[16rem] font-heading text-xl font-normal !leading-snug sm:max-w-sm md:text-3xl">
                        {introTitle}
                    </h2>
                    <p className="mt-3 text-xs text-muted-foreground">{introHint}</p>
                </div>

                <div
                    className="pointer-events-none absolute inset-x-0 top-[12%] z-10 flex flex-col items-center px-4 text-center"
                    style={{ opacity: arcOpacity }}
                >
                    <h2 className="font-heading text-2xl font-normal !leading-snug md:text-4xl lg:text-5xl">
                        {title}
                    </h2>
                    <p className="mt-4 max-w-xl text-base text-muted-foreground md:text-lg">
                        {description}
                    </p>
                </div>

                <div className="relative h-full w-full">
                    {images.map((src, index) => {
                        let target: CardTarget;

                        if (introPhase === "scatter") {
                            target = scatter[index];
                        } else if (introPhase === "line") {
                            const spacing = 70;
                            target = {
                                x: index * spacing - (total * spacing) / 2 + spacing / 2,
                                y: 0,
                                rotation: 0,
                                scale: 1,
                                opacity: 1,
                            };
                        } else {
                            const circleAngle = (index / total) * 360;
                            const circleRad = (circleAngle * Math.PI) / 180;
                            const circleX = Math.cos(circleRad) * circleRadius;
                            const circleY = Math.sin(circleRad) * circleRadius;

                            const arcAngle = startAngle + index * step + boundedRotation;
                            const arcRad = (arcAngle * Math.PI) / 180;
                            const arcX = Math.cos(arcRad) * arcRadius + frame.parallax;
                            const arcY = Math.sin(arcRad) * arcRadius + arcCenterY;

                            const finalX = lerp(circleX, arcX, frame.morph);

                            target = {
                                x: finalX,
                                y: lerp(circleY, arcY, frame.morph),
                                rotation: lerp(circleAngle + 90, arcAngle + 90, frame.morph),
                                scale: lerp(1, isNarrow ? 1.25 : 2, frame.morph),
                                opacity: canHover ? lerp(1, edgeOpacity(finalX), frame.morph) : 1,
                            };
                        }

                        return (
                            <FlipCard
                                key={src}
                                src={src}
                                index={index}
                                target={target}
                                settled={introPhase === "circle"}
                                flipEnabled={flipEnabled}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
