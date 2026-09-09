"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { QrCodeIcon, ReceiptTextIcon } from "lucide-react";
import HeroDashboard from "./hero-dashboard";

const BASE_WIDTH = 960;
const BASE_HEIGHT = 545;

const TOASTS = [
    {
        id: "qr",
        icon: QrCodeIcon,
        title: "Yeni sipariş",
        body: "Masa 12, QR menüden 4 kalem",
        tone: "bg-grapefruit-pale text-grapefruit-dark",
    },
    {
        id: "okc",
        icon: ReceiptTextIcon,
        title: "Mali fiş kesildi",
        body: "Masa 5, fiş no 0001431",
        tone: "bg-mint-pale text-mint-dark",
    },
];

const MacWindow = () => {
    const frameRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(0);
    const [toast, setToast] = useState(0);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const node = frameRef.current;
        if (!node) return;
        const update = () => setScale(node.clientWidth / BASE_WIDTH);
        update();
        const observer = new ResizeObserver(update);
        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const hide = setInterval(() => setVisible(false), 5200);
        return () => clearInterval(hide);
    }, []);

    useEffect(() => {
        if (visible) return;
        const next = setTimeout(() => {
            setToast((current) => (current + 1) % TOASTS.length);
            setVisible(true);
        }, 600);
        return () => clearTimeout(next);
    }, [visible]);

    const current = TOASTS[toast];
    const Icon = current.icon;

    return (
        <div className="relative w-full">
            <div className="pointer-events-none absolute -left-8 top-12 hidden h-[74%] w-[36%] -rotate-2 rounded-2xl bg-gradient-to-br from-mint-pale via-lemon-pale to-cream lg:block" />
            <div className="pointer-events-none absolute -right-10 -top-7 hidden h-[48%] w-[32%] rotate-3 rounded-2xl bg-gradient-to-br from-grapefruit-pale to-lemon-pale lg:block" />

            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="relative overflow-hidden rounded-xl border border-border bg-background shadow-[0_28px_70px_-20px_rgba(66,43,33,0.28)]"
            >
                <div className="flex items-center gap-2 border-b border-border bg-cream px-3.5 py-2.5">
                    <span className="size-2.5 rounded-full bg-[#ED6A5E]" />
                    <span className="size-2.5 rounded-full bg-[#F5BF4F]" />
                    <span className="size-2.5 rounded-full bg-[#61C554]" />
                    <span className="mx-auto -translate-x-6 text-[11px] text-muted-foreground">
                        CuisinOS, Kadıköy şubesi
                    </span>
                </div>

                <div ref={frameRef} className="relative w-full overflow-hidden" style={{ aspectRatio: `${BASE_WIDTH} / ${BASE_HEIGHT}` }}>
                    <div
                        className="absolute left-0 top-0 origin-top-left"
                        style={{
                            width: BASE_WIDTH,
                            height: BASE_HEIGHT,
                            transform: `scale(${scale})`,
                            opacity: scale > 0 ? 1 : 0,
                        }}
                    >
                        <HeroDashboard />
                    </div>
                </div>
            </motion.div>

            <div className="pointer-events-none absolute -bottom-5 left-5 z-20 flex items-center gap-2 rounded-full border border-border bg-background px-3.5 py-2 shadow-lg sm:left-10">
                <span className="flex items-end gap-[3px]">
                    {[0, 1, 2, 3].map((bar) => (
                        <motion.span
                            key={bar}
                            className="w-[3px] rounded-full bg-grapefruit-dark"
                            animate={{ height: [5, 13, 7, 15, 5] }}
                            transition={{ duration: 1.3, repeat: Infinity, delay: bar * 0.12 }}
                        />
                    ))}
                </span>
                <span className="text-xs font-medium">Servis canlı</span>
            </div>

            <div className="pointer-events-none absolute -bottom-8 right-0 z-20 w-[15.5rem] sm:-right-6">
                <AnimatePresence mode="wait">
                    {visible ? (
                        <motion.div
                            key={current.id}
                            initial={{ opacity: 0, y: 14, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.97 }}
                            transition={{ duration: 0.35, ease: "easeOut" }}
                            className="flex items-start gap-2.5 rounded-xl border border-border bg-background/95 p-3 shadow-[0_16px_40px_-14px_rgba(66,43,33,0.32)] backdrop-blur"
                        >
                            <span className={`flex size-7 shrink-0 items-center justify-center rounded-lg ${current.tone}`}>
                                <Icon className="size-3.5" />
                            </span>
                            <div className="min-w-0">
                                <p className="text-xs font-medium leading-none">{current.title}</p>
                                <p className="mt-1 text-[11px] leading-snug text-muted-foreground">{current.body}</p>
                            </div>
                        </motion.div>
                    ) : null}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default MacWindow;
