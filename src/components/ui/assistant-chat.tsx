"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SendHorizonalIcon } from "lucide-react";
import Icons from "../global/icons";
import { Message, MessageAvatar, MessageContent, MessageTyping } from "./message";

type Turn = {
    from: "user" | "assistant";
    text: string;
};

const SCRIPT: Turn[] = [
    { from: "user", text: "Bu akşam en çok bekleyen masa hangisi?" },
    { from: "assistant", text: "Masa 9. Siparişi 22 dakikadır mutfakta, ızgara istasyonunda bekliyor." },
    { from: "user", text: "Izgarada başka ne var?" },
    { from: "assistant", text: "Dört kalem daha var. İkisi aynı adisyondan, ortalama bekleme 14 dakika." },
    { from: "user", text: "Masa 9'un garsonuna haber ver" },
    { from: "assistant", text: "Bildirimi gönderdim. Masa 9 için gecikme notu adisyona da işlendi." },
];

const AssistantChat = () => {
    const [visible, setVisible] = useState(0);
    const [typing, setTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const timers = useRef<number[]>([]);

    const schedule = useMemo(() => {
        const plan: { at: number; action: "typing" | "show" | "reset"; index: number }[] = [];
        let clock = 700;
        SCRIPT.forEach((turn, index) => {
            if (turn.from === "assistant") {
                plan.push({ at: clock, action: "typing", index });
                clock += 1100;
            }
            plan.push({ at: clock, action: "show", index });
            clock += turn.from === "assistant" ? 1900 : 1200;
        });
        plan.push({ at: clock + 2200, action: "reset", index: 0 });
        return plan;
    }, []);

    useEffect(() => {
        const run = () => {
            timers.current.forEach((timer) => window.clearTimeout(timer));
            timers.current = [];
            setVisible(0);
            setTyping(false);
            schedule.forEach((step) => {
                const timer = window.setTimeout(() => {
                    if (step.action === "typing") setTyping(true);
                    if (step.action === "show") {
                        setTyping(false);
                        setVisible(step.index + 1);
                    }
                    if (step.action === "reset") run();
                }, step.at);
                timers.current.push(timer);
            });
        };
        run();
        return () => timers.current.forEach((timer) => window.clearTimeout(timer));
    }, [schedule]);

    useEffect(() => {
        const node = scrollRef.current;
        if (node) node.scrollTo({ top: node.scrollHeight, behavior: "smooth" });
    }, [visible, typing]);

    return (
        <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card">
            <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-3.5">
                <div className="flex items-center gap-2.5">
                    <span className="relative flex size-8 items-center justify-center rounded-full border border-border bg-cream">
                        <Icons.icon className="size-4 text-chocolate" />
                        <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full border-2 border-card bg-mint-dark" />
                    </span>
                    <div>
                        <p className="text-sm font-medium leading-none">CuisinOS asistanı</p>
                        <p className="mt-1 text-[11px] text-muted-foreground">Servis verisine bağlı</p>
                    </div>
                </div>
                <span className="rounded-full border border-border bg-secondary px-2.5 py-1 text-[10px] font-medium text-muted-foreground">
                    Örnek konuşma
                </span>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-5 py-5">
                <AnimatePresence initial={false}>
                    {SCRIPT.slice(0, visible).map((turn, index) => (
                        <motion.div
                            key={`${index}-${turn.text}`}
                            initial={{ opacity: 0, y: 10, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.28, ease: "easeOut" }}
                        >
                            <Message from={turn.from}>
                                <MessageAvatar name={turn.from === "user" ? "SY" : undefined}>
                                    {turn.from === "assistant" ? <Icons.icon className="size-3.5 text-chocolate" /> : null}
                                </MessageAvatar>
                                <MessageContent>{turn.text}</MessageContent>
                            </Message>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {typing ? (
                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                    >
                        <Message from="assistant">
                            <MessageAvatar>
                                <Icons.icon className="size-3.5 text-chocolate" />
                            </MessageAvatar>
                            <MessageTyping />
                        </Message>
                    </motion.div>
                ) : null}
            </div>

            <div className="flex items-center gap-2 border-t border-border px-4 py-3">
                <div className="flex-1 rounded-full border border-border bg-secondary/60 px-4 py-2 text-xs text-muted-foreground">
                    Servisle ilgili bir şey sorun
                </div>
                <span className="flex size-8 items-center justify-center rounded-full bg-grapefruit text-chocolate">
                    <SendHorizonalIcon className="size-4" />
                </span>
            </div>
        </div>
    );
};

export default AssistantChat;
