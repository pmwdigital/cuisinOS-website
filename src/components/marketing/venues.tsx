"use client";

import { LayoutGroup, motion, useReducedMotion, type Transition } from "framer-motion";
import Container from "../global/container";
import Icons from "../global/icons";
import { SpringElement } from "../ui/spring-element";
import { TextRotate } from "../ui/text-rotate";
import { WarpBackground } from "../ui/warp-background";

const VENUES = [
    "kebapçıda",
    "kafede",
    "pastanede",
    "pizzacıda",
    "balıkçıda",
    "kahvecide",
    "bistroda",
];

const SPRING: Transition = { type: "spring", damping: 30, stiffness: 400 };

const Venues = () => {
    const shouldReduceMotion = useReducedMotion();

    return (
        <div className="relative flex w-full flex-col items-center justify-center py-20">
            <Container>
                <WarpBackground
                    className="mx-auto max-w-5xl rounded-2xl border-border bg-card px-6 py-16 sm:px-12 lg:rounded-3xl lg:px-20 lg:py-20"
                    beamsPerSide={4}
                    beamSize={4}
                    beamDuration={4.5}
                    beamDelayMax={5}
                >
                    <div className="flex flex-col items-center gap-9">
                        <SpringElement springClassName="stroke-grapefruit-dark">
                            <div className="flex size-14 items-center justify-center rounded-2xl border border-border bg-background shadow-sm transition-transform duration-300 hover:scale-105">
                                <Icons.icon className="size-7 text-chocolate" />
                            </div>
                        </SpringElement>

                        <LayoutGroup>
                            <motion.div
                                className="flex flex-wrap items-center justify-center whitespace-pre font-heading text-xl font-normal !leading-snug sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl"
                                layout
                            >
                                <motion.span layout transition={SPRING}>
                                    Aynı sistem{" "}
                                </motion.span>
                                <TextRotate
                                    texts={VENUES}
                                    auto={!shouldReduceMotion}
                                    mainClassName="justify-center overflow-hidden rounded-lg bg-grapefruit px-2 py-0.5 text-chocolate sm:px-2.5 md:px-3 md:py-1.5"
                                    staggerFrom="last"
                                    initial={{ y: "100%" }}
                                    animate={{ y: 0 }}
                                    exit={{ y: "-120%" }}
                                    staggerDuration={0.025}
                                    splitLevelClassName="overflow-hidden pb-0.5 md:pb-1"
                                    transition={SPRING}
                                    rotationInterval={2200}
                                />
                                <motion.span layout transition={SPRING}>
                                    {" "}
                                    çalışır
                                </motion.span>
                            </motion.div>
                        </LayoutGroup>
                    </div>
                </WarpBackground>
            </Container>
        </div>
    );
};

export default Venues;
