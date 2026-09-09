"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Container from "../global/container";
import { Button } from "../ui/button";
import FlowCanvas from "../ui/flow-canvas";

const CTA = () => {
    return (
        <div className="relative flex flex-col items-center justify-center w-full py-20">
            <Container className="py-20 max-w-6xl mx-auto">
                <div className="relative flex flex-col items-center justify-center py-12 lg:py-20 px-0 rounded-2xl lg:rounded-3xl bg-background/20 text-center border border-border bg-card overflow-hidden">
                    <FlowCanvas className="absolute inset-0 z-0 hidden h-full w-full lg:block" pathCount={46} />
                    <FlowCanvas className="absolute inset-0 z-0 block h-full w-full lg:hidden" pathCount={22} />

                    <motion.div
                        className="absolute -bottom-1/8 left-1/3 -translate-x-1/2 w-44 h-32 lg:h-52 lg:w-1/3 rounded-full blur-[5rem] lg:blur-[10rem] -z-10"
                        style={{
                            background: 'conic-gradient(from 0deg at 50% 50%, #EB9977 0deg, #E4D085 180deg, #AAC6AD 360deg)',
                        }}
                        animate={{
                            rotate: 360
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />
                    <h2 className="relative z-10 text-3xl md:text-5xl lg:text-6xl font-heading font-normal !leading-snug">
                        Salonu bugün <br /> devralın
                    </h2>
                    <p className="relative z-10 text-sm md:text-lg text-center text-accent-foreground/80 max-w-2xl mx-auto mt-4">
                        Kurulum için teknik ekip gerekmiyor. Masalarınızı tanımlayın, menünüzü yükleyin <span className="hidden lg:inline">ve aynı gün sipariş almaya başlayın.</span>
                    </p>
                    <Link href="#fiyatlandirma" className="relative z-10 mt-8">
                        <Button size="lg" variant="brand">
                            Hemen başlayın
                        </Button>
                    </Link>
                </div>
            </Container>
        </div>
    )
};

export default CTA
