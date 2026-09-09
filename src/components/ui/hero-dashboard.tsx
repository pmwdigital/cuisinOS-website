"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    BellIcon,
    ChefHatIcon,
    CreditCardIcon,
    LayoutGridIcon,
    ReceiptTextIcon,
    SearchIcon,
    SettingsIcon,
    UtensilsCrossedIcon,
} from "lucide-react";
import Icons from "../global/icons";

const NAV = [
    { label: "Masalar", icon: LayoutGridIcon, active: true },
    { label: "Siparişler", icon: UtensilsCrossedIcon },
    { label: "Mutfak", icon: ChefHatIcon },
    { label: "Kasa", icon: CreditCardIcon },
    { label: "Mali fişler", icon: ReceiptTextIcon },
];

type TableState = "acik" | "hazir" | "bos" | "odeme";

type TableCell = { name: string; state: TableState; note: string };

const BASE_TABLES: TableCell[] = [
    { name: "M1", state: "acik", note: "4 kişi" },
    { name: "M2", state: "bos", note: "Boş" },
    { name: "M3", state: "hazir", note: "Mutfak hazır" },
    { name: "M4", state: "acik", note: "2 kişi" },
    { name: "M5", state: "odeme", note: "Ödeme" },
    { name: "M6", state: "bos", note: "Boş" },
    { name: "M7", state: "acik", note: "6 kişi" },
    { name: "M8", state: "acik", note: "3 kişi" },
    { name: "M9", state: "hazir", note: "Mutfak hazır" },
    { name: "M10", state: "bos", note: "Boş" },
    { name: "M11", state: "acik", note: "2 kişi" },
    { name: "M12", state: "bos", note: "Boş" },
];

type Scene = {
    table: string;
    state: TableState;
    note: string;
    activity: { time: string; text: string; dot: string };
};

const SCENES: Scene[] = [
    {
        table: "M12",
        state: "acik",
        note: "4 kişi",
        activity: { time: "19:58", text: "Masa 12 QR menüden sipariş açtı", dot: "bg-grapefruit-dark" },
    },
    {
        table: "M4",
        state: "hazir",
        note: "Mutfak hazır",
        activity: { time: "20:01", text: "Mutfak, masa 4 için ızgara kalemini hazır bildirdi", dot: "bg-mint-dark" },
    },
    {
        table: "M5",
        state: "bos",
        note: "Boş",
        activity: { time: "20:04", text: "Masa 5 tahsilatı kapandı, mali fiş kesildi", dot: "bg-mint-dark" },
    },
    {
        table: "M7",
        state: "odeme",
        note: "Ödeme",
        activity: { time: "20:07", text: "Masa 7 hesabı istedi, adisyon kasaya düştü", dot: "bg-lemon-dark" },
    },
];

const BASE_ACTIVITY = [
    { time: "19:53", text: "Masa 5 iadesi onaylandı, mali fiş düzeltmesi kesildi", dot: "bg-lemon-dark" },
    { time: "19:41", text: "Masa 11 tahsilatı tamamlandı, adisyon kapandı", dot: "bg-mint-dark" },
    { time: "19:36", text: "Mutfak, masa 3 için ızgara kalemini hazır bildirdi", dot: "bg-mint-dark" },
    { time: "19:28", text: "Paket 318 siparişi alındı, e-Arşiv kuyruğuna girdi", dot: "bg-grapefruit-dark" },
];

const STATE_STYLES: Record<TableState, string> = {
    acik: "border-grapefruit/45 bg-grapefruit-pale",
    hazir: "border-mint-dark/45 bg-mint-pale",
    odeme: "border-lemon-dark/45 bg-lemon-pale",
    bos: "border-border bg-secondary/50",
};

const STATE_DOTS: Record<TableState, string> = {
    acik: "bg-grapefruit-dark",
    hazir: "bg-mint-dark",
    odeme: "bg-lemon-dark",
    bos: "bg-muted-foreground/35",
};

const CHECK_LINES = [
    { name: "Adana kebap", qty: 2, price: "₺960,00" },
    { name: "Mercimek çorbası", qty: 3, price: "₺285,00" },
    { name: "Şalgam", qty: 2, price: "₺120,00" },
    { name: "Künefe", qty: 1, price: "₺190,00" },
];

const countState = (tables: TableCell[], state: TableState) =>
    tables.filter((table) => table.state === state).length;

const HeroDashboard = () => {
    const [step, setStep] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => setStep((current) => current + 1), 2600);
        return () => clearInterval(timer);
    }, []);

    const applied = SCENES.slice(0, Math.min(step, SCENES.length));
    const cycle = step % (SCENES.length + 1);
    const active = SCENES.slice(0, cycle);

    const tables = BASE_TABLES.map((table) => {
        const scene = [...active].reverse().find((item) => item.table === table.name);
        return scene ? { ...table, state: scene.state, note: scene.note } : table;
    });

    const activity = [...active].reverse().map((scene) => scene.activity).concat(BASE_ACTIVITY).slice(0, 4);
    const highlighted = active.length > 0 ? active[active.length - 1].table : null;

    return (
        <div className="flex h-full w-full overflow-hidden bg-background text-left">

            <aside className="hidden w-[168px] shrink-0 flex-col border-r border-border bg-cream px-3 py-4 sm:flex">
                <div className="flex items-center gap-2 px-1.5">
                    <Icons.icon className="size-4 text-chocolate" />
                    <span className="font-heading text-sm font-medium tracking-tight">CuisinOS</span>
                </div>
                <nav className="mt-6 space-y-1">
                    {NAV.map((item) => (
                        <span
                            key={item.label}
                            className={
                                item.active
                                    ? "flex items-center gap-2.5 rounded-lg bg-background px-2.5 py-2 text-xs font-medium text-foreground shadow-sm"
                                    : "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs text-muted-foreground"
                            }
                        >
                            <item.icon className="size-3.5" />
                            {item.label}
                        </span>
                    ))}
                </nav>
                <div className="mt-auto rounded-lg border border-border bg-background px-2.5 py-2">
                    <p className="text-[10px] text-muted-foreground">Vardiya</p>
                    <p className="mt-0.5 text-xs font-medium">Akşam servisi</p>
                </div>
            </aside>

            <div className="flex min-w-0 flex-1 flex-col">
                <header className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
                    <div className="flex min-w-0 items-center gap-2">
                        <span className="truncate font-heading text-sm font-medium">Salon görünümü</span>
                        <span className="hidden rounded-full border border-border bg-secondary px-2 py-0.5 text-[10px] text-muted-foreground sm:inline">
                            Kadıköy şubesi
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="hidden items-center gap-1.5 rounded-md border border-border bg-secondary/60 px-2.5 py-1.5 text-[10px] text-muted-foreground md:flex">
                            <SearchIcon className="size-3" />
                            Masa veya adisyon ara
                        </span>
                        <span className="flex size-7 items-center justify-center rounded-md border border-border text-muted-foreground">
                            <BellIcon className="size-3.5" />
                        </span>
                        <span className="flex size-7 items-center justify-center rounded-md border border-border text-muted-foreground">
                            <SettingsIcon className="size-3.5" />
                        </span>
                    </div>
                </header>

                <div className="flex min-h-0 flex-1">
                    <div className="min-w-0 flex-1 p-4">
                        <div className="flex flex-wrap items-center gap-2">
                            {[
                                { label: "Açık adisyon", value: countState(tables, "acik"), dot: "bg-grapefruit-dark" },
                                { label: "Mutfak hazır", value: countState(tables, "hazir"), dot: "bg-mint-dark" },
                                { label: "Ödeme bekleyen", value: countState(tables, "odeme"), dot: "bg-lemon-dark" },
                                { label: "Boş masa", value: countState(tables, "bos"), dot: "bg-muted-foreground/35" },
                            ].map((stat) => (
                                <span
                                    key={stat.label}
                                    className="flex items-center gap-2 rounded-lg border border-border bg-card px-2.5 py-1.5"
                                >
                                    <span className={`size-1.5 rounded-full ${stat.dot}`} />
                                    <span className="text-[10px] text-muted-foreground">{stat.label}</span>
                                    <motion.span
                                        key={`${stat.label}-${stat.value}`}
                                        initial={{ opacity: 0, y: -4 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-xs font-medium"
                                    >
                                        {stat.value}
                                    </motion.span>
                                </span>
                            ))}
                        </div>

                        <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-6">
                            {tables.map((table) => (
                                <motion.div
                                    key={table.name}
                                    animate={
                                        highlighted === table.name
                                            ? { scale: [1, 1.045, 1], boxShadow: ["0 0 0 0 rgba(228,125,85,0)", "0 0 0 4px rgba(228,125,85,0.18)", "0 0 0 0 rgba(228,125,85,0)"] }
                                            : {}
                                    }
                                    transition={{ duration: 1.1 }}
                                    className={`flex aspect-[5/4] flex-col justify-between rounded-xl border p-2.5 transition-colors duration-500 ${STATE_STYLES[table.state]}`}
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-medium">{table.name}</span>
                                        <span className={`size-1.5 rounded-full transition-colors duration-500 ${STATE_DOTS[table.state]}`} />
                                    </div>
                                    <span className="text-[10px] text-muted-foreground">{table.note}</span>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-4 rounded-xl border border-border bg-card">
                            <div className="flex items-center justify-between border-b border-border px-3 py-2">
                                <span className="text-[10px] font-medium">Son hareketler</span>
                                <span className="text-[9px] text-muted-foreground">Akşam servisi</span>
                            </div>
                            <div className="divide-y divide-border">
                                {activity.map((row, index) => (
                                    <motion.div
                                        key={row.time + row.text}
                                        initial={index === 0 && active.length > 0 ? { opacity: 0, height: 0 } : false}
                                        animate={{ opacity: 1, height: "auto" }}
                                        transition={{ duration: 0.35 }}
                                        className="flex items-center gap-3 overflow-hidden px-3 py-2"
                                    >
                                        <span className={`size-1.5 shrink-0 rounded-full ${row.dot}`} />
                                        <span className="min-w-0 flex-1 truncate text-[10px]">{row.text}</span>
                                        <span className="shrink-0 text-[9px] tabular-nums text-muted-foreground">{row.time}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <aside className="hidden w-[228px] shrink-0 flex-col border-l border-border bg-cream/60 p-4 lg:flex">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-medium">Masa 7</span>
                            <span className="rounded-full bg-grapefruit-pale px-2 py-0.5 text-[10px] text-grapefruit-dark">
                                Açık
                            </span>
                        </div>
                        <p className="mt-1 text-[10px] text-muted-foreground">Garson Selin, 19:04 açıldı</p>

                        <div className="mt-4 space-y-2">
                            {CHECK_LINES.map((line) => (
                                <div key={line.name} className="flex items-baseline justify-between gap-2 text-[11px]">
                                    <span className="truncate">
                                        <span className="text-muted-foreground">{line.qty}x</span> {line.name}
                                    </span>
                                    <span className="shrink-0 tabular-nums">{line.price}</span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-4 space-y-1.5 border-t border-border pt-3 text-[11px]">
                            <div className="flex justify-between text-muted-foreground">
                                <span>Ara toplam</span>
                                <span className="tabular-nums">₺1.555,00</span>
                            </div>
                            <div className="flex justify-between text-muted-foreground">
                                <span>KDV</span>
                                <span className="tabular-nums">₺155,50</span>
                            </div>
                            <div className="flex justify-between font-medium">
                                <span>Toplam</span>
                                <span className="tabular-nums">₺1.710,50</span>
                            </div>
                        </div>

                        <div className="mt-auto space-y-2 pt-4">
                            <span className="flex w-full items-center justify-center rounded-lg bg-grapefruit px-3 py-2 text-[11px] font-medium text-chocolate">
                                Yazarkasaya gönder
                            </span>
                            <span className="flex w-full items-center justify-center rounded-lg border border-border bg-background px-3 py-2 text-[11px] text-muted-foreground">
                                Hesabı böl
                            </span>
                        </div>
                    </aside>
                </div>
            </div>

            <span className="sr-only">{applied.length} olay işlendi</span>
        </div>
    );
};

export default HeroDashboard;
