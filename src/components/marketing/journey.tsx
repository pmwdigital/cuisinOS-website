"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ChefHatIcon, CreditCardIcon, QrCodeIcon, ReceiptTextIcon } from "lucide-react";
import { useRef } from "react";
import Container from "../global/container";
import ScrollStroke from "../ui/scroll-stroke";

const STAGE_VIEWBOX = "0 0 1200 620";
const STAGE_PATH =
    "M -80 285 C -42 306, 62 422, 150 408 C 238 394, 350 202, 450 202 C 550 202, 650 408, 750 408 C 850 408, 960 242, 1050 202 C 1140 162, 1250 175, 1290 170";

const RAIL_VIEWBOX = "0 0 6 100";
const RAIL_PATH = "M 3 0 V 100";

type Step = {
    title: string;
    detail: string;
    icon: React.ComponentType<{ className?: string }>;
    reach: number;
    x: string;
    y: string;
    above: boolean;
};

const STEPS: Step[] = [
    {
        title: "QR menü",
        detail: "Misafir masadaki kodu okutur, siparişi kendi dilinde verir",
        icon: QrCodeIcon,
        reach: 0.165,
        x: "12.5%",
        y: "65.8065%",
        above: false,
    },
    {
        title: "Mutfak ekranı",
        detail: "Kalemler istasyonlara ayrılır, hazır olan garsona düşer",
        icon: ChefHatIcon,
        reach: 0.393,
        x: "37.5%",
        y: "32.5806%",
        above: true,
    },
    {
        title: "Kasa ve adisyon",
        detail: "Tahsilat bölünür, bahşiş ve indirim aynı ekranda kapanır",
        icon: CreditCardIcon,
        reach: 0.622,
        x: "62.5%",
        y: "65.8065%",
        above: false,
    },
    {
        title: "Mali fiş",
        detail: "Yazarkasa fişi keser, sonuç adisyona ve denetim izine yazılır",
        icon: ReceiptTextIcon,
        reach: 0.85,
        x: "87.5%",
        y: "32.5806%",
        above: true,
    },
];

const StageStep = ({
    step,
    index,
    progress,
}: {
    step: Step;
    index: number;
    progress: MotionValue<number>;
}) => {
    const reveal: [number, number] = [step.reach - 0.17, step.reach - 0.02];
    const touch: [number, number] = [step.reach - 0.05, step.reach];

    const opacity = useTransform(progress, reveal, [0.35, 1]);
    const lift = useTransform(progress, reveal, [14, 0]);
    const borderColor = useTransform(progress, touch, ["rgba(66,43,33,0.10)", "rgba(228,125,85,0.55)"]);
    const dotColor = useTransform(progress, touch, ["#E4DCD5", "#E47D55"]);
    const dotScale = useTransform(progress, touch, [1, 1.35]);
    const numberOpacity = useTransform(progress, touch, [0.45, 1]);

    return (
        <>
            <motion.span
                className="absolute z-10 size-3.5 rounded-full ring-4 ring-card"
                style={{ left: step.x, top: step.y, x: "-50%", y: "-50%", backgroundColor: dotColor, scale: dotScale }}
            />

            <motion.div
                className="absolute z-20 flex w-[21%] flex-col items-center"
                style={{
                    left: step.x,
                    opacity,
                    x: "-50%",
                    y: lift,
                    ...(step.above ? { bottom: `calc(100% - ${step.y})` } : { top: step.y }),
                }}
            >
                {step.above ? null : <span className="mt-3 h-8 w-px bg-border" />}

                <motion.div
                    className="w-full rounded-xl border bg-background/90 p-4 text-left shadow-sm backdrop-blur-sm"
                    style={{ borderColor }}
                >
                    <div className="flex items-center justify-between">
                        <span className="flex size-6 items-center justify-center rounded-full bg-secondary text-[11px] font-medium text-foreground">
                            {index + 1}
                        </span>
                        <motion.span style={{ opacity: numberOpacity }}>
                            <step.icon className="size-4 text-grapefruit-dark" />
                        </motion.span>
                    </div>
                    <p className="mt-3 text-sm font-medium leading-none">{step.title}</p>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{step.detail}</p>
                </motion.div>

                {step.above ? <span className="mb-3 h-8 w-px bg-border" /> : null}
            </motion.div>
        </>
    );
};

const RailStep = ({
    step,
    index,
    progress,
}: {
    step: Step;
    index: number;
    progress: MotionValue<number>;
}) => {
    const reach = (index + 0.4) / STEPS.length;
    const badgeColor = useTransform(
        progress,
        [reach - 0.08, reach],
        ["#EAE6E1", "#E47D55"]
    );
    const contentOpacity = useTransform(progress, [reach - 0.16, reach - 0.02], [0.45, 1]);

    return (
        <li className="grid grid-cols-[30px_1fr] items-start gap-4">
            <motion.span
                className="relative z-10 mt-0.5 flex size-[30px] items-center justify-center rounded-full border-2 bg-background text-xs font-medium"
                style={{ borderColor: badgeColor }}
            >
                {index + 1}
            </motion.span>
            <motion.div style={{ opacity: contentOpacity }}>
                <p className="flex items-center gap-2 text-sm font-medium leading-none">
                    <step.icon className="size-4 text-grapefruit-dark" />
                    {step.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.detail}</p>
            </motion.div>
        </li>
    );
};

const Journey = () => {
    const trackRef = useRef<HTMLDivElement>(null);
    const railRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress: trackProgress } = useScroll({ target: trackRef });
    const { scrollYProgress: railProgress } = useScroll({
        target: railRef,
        offset: ["start 0.85", "end 0.6"],
    });

    const drawn = useTransform(trackProgress, [0.04, 0.92], [0, 1], { clamp: true });

    return (
        <section className="relative flex w-full flex-col items-center justify-center py-20">
            <Container>
                <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
                    <span className="rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
                        Servis akışı
                    </span>
                    <h2 className="mt-5 font-heading text-2xl font-normal !leading-snug md:text-4xl lg:text-5xl">
                        Masadan mali fişe <br />
                        kopmayan tek hat
                    </h2>
                    <p className="mt-4 text-base text-muted-foreground md:text-lg">
                        Sipariş dört durakta ilerler ve hiçbirinde elden ele geçmez. Aşağı kaydırdıkça hattın
                        tamamı çizilir.
                    </p>
                </div>
            </Container>

            <div
                ref={trackRef}
                className="relative mt-16 hidden h-[300vh] w-full motion-reduce:h-[150vh] xl:block"
            >
                <div className="sticky top-16 flex h-[calc(100svh-4rem)] w-full items-center justify-center">
                    <div className="journey-stage relative overflow-hidden rounded-2xl border border-border bg-card">
                        <div
                            className="absolute inset-0 opacity-[0.14]"
                            style={{
                                backgroundImage:
                                    "radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)",
                                backgroundSize: "32px 32px",
                            }}
                        />
                        <div className="pointer-events-none absolute -left-20 top-1/2 size-72 -translate-y-1/2 rounded-full bg-lemon/20 blur-[7rem]" />
                        <div className="pointer-events-none absolute -right-20 top-1/4 size-72 rounded-full bg-grapefruit/20 blur-[7rem]" />

                        <ScrollStroke
                            d={STAGE_PATH}
                            viewBox={STAGE_VIEWBOX}
                            progress={drawn}
                            strokeWidth={5}
                            trackWidth={2}
                            className="absolute inset-0 h-full w-full"
                        />

                        {STEPS.map((step, index) => (
                            <StageStep key={step.title} step={step} index={index} progress={drawn} />
                        ))}

                        <span className="absolute left-6 top-6 rounded-full border border-border bg-background/80 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur-sm">
                            Tek adisyon, dört durak
                        </span>
                        <span className="absolute bottom-6 right-6 text-xs text-muted-foreground/70">
                            Hat, kaydırma ilerledikçe çizilir
                        </span>
                    </div>
                </div>
            </div>

            <div ref={railRef} className="relative mt-12 w-full max-w-xl xl:hidden">
                <ScrollStroke
                    d={RAIL_PATH}
                    viewBox={RAIL_VIEWBOX}
                    progress={railProgress}
                    strokeWidth={2.5}
                    trackWidth={1.5}
                    headLength={0.05}
                    gradientVector={[0, 0, 0, 100]}
                    stretch
                    className="pointer-events-none absolute left-3 top-[18px] h-[calc(100%-36px)] w-[6px]"
                />
                <ol className="space-y-8">
                    {STEPS.map((step, index) => (
                        <RailStep key={step.title} step={step} index={index} progress={railProgress} />
                    ))}
                </ol>
            </div>
        </section>
    );
};

export default Journey;
