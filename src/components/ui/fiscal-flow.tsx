"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib";

const STEPS = [
    {
        title: "Sepet ÖKC'ye gider",
        detail: "Adisyondaki kalemler KDV oranlarıyla birlikte cihaza aktarılır",
    },
    {
        title: "Cihaz ödemeyi alır",
        detail: "Nakit, kart veya QR, tahsilat cihazın kendi ekranında tamamlanır",
    },
    {
        title: "Mali fiş kesilir",
        detail: "Fiş numarası, Z numarası ve cihaz seri numarası birlikte döner",
    },
    {
        title: "Adisyon kapanır",
        detail: "Sonuç adisyona yazılır, mali fiş kaydı denetim izine düşer",
    },
];

const FiscalFlow = () => {
    const [active, setActive] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setActive((current) => (current + 1) % STEPS.length);
        }, 2200);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl bg-chocolate p-8 sm:p-10">
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.22]"
                style={{
                    backgroundImage:
                        "repeating-linear-gradient(45deg, rgba(250,248,245,0.5) 0px 1px, transparent 1px 11px)",
                    maskImage: "radial-gradient(ellipse 80% 55% at 100% 0%, #000 60%, transparent 110%)",
                    WebkitMaskImage: "radial-gradient(ellipse 80% 55% at 100% 0%, #000 60%, transparent 110%)",
                }}
            />
            <div className="pointer-events-none absolute -bottom-16 -left-10 size-56 rounded-full bg-grapefruit/25 blur-[6rem]" />

            <div className="relative">
                <span className="inline-block rounded-full bg-cream/10 px-3 py-1 text-[11px] font-medium tracking-wide text-cream/70">
                    Yazarkasa köprüsü
                </span>
                <h3 className="mt-5 font-heading text-2xl font-normal tracking-tight text-cream sm:text-3xl">
                    Ödeme ile mali fiş <br />
                    aynı işlemde biter
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-cream/60">
                    Kasiyer cihazda ayrı bir tutar girmez. Sepet, tahsilat ve fiş tek akışta ilerlediği için
                    gün sonunda eşleşmeyen fiş kalmaz.
                </p>
            </div>

            <div className="relative mt-8 grid grid-cols-3 gap-2">
                {[
                    { label: "Cihaz", value: "Bağlı" },
                    { label: "Z raporu", value: "Açık" },
                    { label: "Kuyruk", value: "Boş" },
                ].map((item) => (
                    <div key={item.label} className="rounded-xl border border-cream/12 bg-cream/[0.06] px-3 py-2.5">
                        <p className="text-[10px] text-cream/45">{item.label}</p>
                        <p className="mt-0.5 text-sm font-medium text-cream">{item.value}</p>
                    </div>
                ))}
            </div>

            <ol className="relative mt-8 space-y-5">
                <span className="absolute left-[13px] top-2 h-[calc(100%-1rem)] w-px bg-cream/15" />
                <motion.span
                    className="absolute left-[13px] w-px bg-gradient-to-b from-transparent via-grapefruit to-transparent"
                    animate={{ top: ["0%", "100%"] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    style={{ height: "38%" }}
                />
                {STEPS.map((step, index) => {
                    const isActive = index === active;
                    return (
                        <li key={step.title} className="relative flex gap-4">
                            <span
                                className={cn(
                                    "relative z-10 mt-0.5 flex size-[27px] shrink-0 items-center justify-center rounded-full border text-[11px] font-semibold transition-colors duration-500",
                                    isActive
                                        ? "border-grapefruit bg-grapefruit text-chocolate"
                                        : "border-cream/20 bg-chocolate text-cream/50"
                                )}
                            >
                                {index + 1}
                            </span>
                            <div className="min-w-0">
                                <p
                                    className={cn(
                                        "text-sm font-medium transition-colors duration-500",
                                        isActive ? "text-cream" : "text-cream/55"
                                    )}
                                >
                                    {step.title}
                                </p>
                                <motion.p
                                    className="text-xs leading-relaxed text-cream/40"
                                    animate={{ opacity: isActive ? 1 : 0.45 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    {step.detail}
                                </motion.p>
                            </div>
                        </li>
                    );
                })}
            </ol>
        </div>
    );
};

export default FiscalFlow;
