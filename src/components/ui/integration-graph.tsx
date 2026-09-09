"use client";

import { useId } from "react";
import { motion } from "framer-motion";
import {
    BikeIcon,
    CalculatorIcon,
    ChefHatIcon,
    CreditCardIcon,
    FileCheck2Icon,
    ReceiptTextIcon,
} from "lucide-react";
import Icons from "../global/icons";

type IntegrationNode = {
    id: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    x: number;
    y: number;
    path: string;
    delay: number;
};

const NODES: IntegrationNode[] = [
    {
        id: "okc",
        label: "Yazarkasa ÖKC",
        icon: ReceiptTextIcon,
        x: 118,
        y: 84,
        path: "M 262 188 V 99 Q 262 84 247 84 H 138",
        delay: 0.05,
    },
    {
        id: "earsiv",
        label: "GİB e-Arşiv",
        icon: FileCheck2Icon,
        x: 446,
        y: 78,
        path: "M 302 188 V 93 Q 302 78 317 78 H 426",
        delay: 0.12,
    },
    {
        id: "paket",
        label: "Paket kanalları",
        icon: BikeIcon,
        x: 112,
        y: 205,
        path: "M 250 205 H 132",
        delay: 0.19,
    },
    {
        id: "odeme",
        label: "Kart ve QR ödeme",
        icon: CreditCardIcon,
        x: 452,
        y: 205,
        path: "M 314 205 H 432",
        delay: 0.26,
    },
    {
        id: "mutfak",
        label: "Mutfak ekranı",
        icon: ChefHatIcon,
        x: 150,
        y: 326,
        path: "M 262 222 V 311 Q 262 326 247 326 H 170",
        delay: 0.33,
    },
    {
        id: "muhasebe",
        label: "Muhasebe aktarımı",
        icon: CalculatorIcon,
        x: 424,
        y: 326,
        path: "M 302 222 V 311 Q 302 326 317 326 H 404",
        delay: 0.4,
    },
];

const FlowPath = ({ d, id }: { d: string; id: string }) => (
    <>
        <path d={d} stroke="currentColor" strokeWidth="1" fill="none" className="text-border" />
        <motion.path
            d={d}
            stroke={`url(#${id})`}
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="36 220"
            initial={{ strokeDashoffset: 256 }}
            animate={{ strokeDashoffset: -256 }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
        />
        <defs>
            <linearGradient id={id} gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#EB9977" stopOpacity="0" />
                <stop offset="50%" stopColor="#E47D55" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#EB9977" stopOpacity="0" />
            </linearGradient>
        </defs>
    </>
);

const IntegrationGraph = () => {
    const containerId = useId().replace(/:/g, "");

    return (
        <div className="relative h-full w-full">
            <svg
                className="pointer-events-none absolute inset-0 h-full w-full"
                viewBox="0 0 564 410"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                {NODES.map((node) => (
                    <FlowPath key={node.id} d={node.path} id={`${containerId}-${node.id}`} />
                ))}
            </svg>

            <div className="absolute left-1/2 top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border border-border bg-background p-2 shadow-lg shadow-chocolate/5">
                <div className="rounded-xl border border-border/70 bg-cream p-2.5">
                    <Icons.icon className="size-8 text-chocolate sm:size-10" />
                </div>
                <motion.div
                    className="absolute inset-0 rounded-2xl border-2 border-grapefruit/25"
                    animate={{ scale: [1, 1.16, 1], opacity: [0.45, 0, 0.45] }}
                    transition={{ duration: 3, repeat: Infinity }}
                />
            </div>

            {NODES.map((node) => {
                const Icon = node.icon;
                return (
                    <motion.div
                        key={node.id}
                        initial={{ opacity: 0, scale: 0.85 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: node.delay }}
                        style={{
                            left: `${(node.x / 564) * 100}%`,
                            top: `${(node.y / 410) * 100}%`,
                        }}
                        className="absolute z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5"
                    >
                        <span className="flex size-9 items-center justify-center rounded-xl border border-border bg-background text-chocolate shadow-sm sm:size-12">
                            <Icon className="size-4 sm:size-5" />
                        </span>
                        <span className="whitespace-nowrap rounded-md bg-background/90 px-1.5 text-[9px] font-medium text-muted-foreground sm:text-[11px]">
                            {node.label}
                        </span>
                    </motion.div>
                );
            })}
        </div>
    );
};

export default IntegrationGraph;
