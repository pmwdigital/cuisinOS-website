"use client";

import { useState } from "react";
import { ReceiptTextIcon } from "lucide-react";
import { Badge } from "./badge";
import { Button } from "./button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "./table";

type FiscalRecord = {
    id: string;
    receipt: string;
    time: string;
    check: string;
    method: string;
    amount: string;
    status: "Kesildi" | "e-Arşiv kuyruğunda" | "İade";
    device: string;
    zNumber: string;
    vat: string;
};

const RECORDS: FiscalRecord[] = [
    {
        id: "1",
        receipt: "0001427",
        time: "19:04",
        check: "Masa 7",
        method: "Kart",
        amount: "₺1.284,50",
        status: "Kesildi",
        device: "ÖKC-DEMO-0147",
        zNumber: "Z 0142",
        vat: "Yüzde 10 ve yüzde 20 karma",
    },
    {
        id: "2",
        receipt: "0001428",
        time: "19:12",
        check: "Paket 318",
        method: "Online",
        amount: "₺436,00",
        status: "e-Arşiv kuyruğunda",
        device: "ÖKC-DEMO-0147",
        zNumber: "Z 0142",
        vat: "Yüzde 10",
    },
    {
        id: "3",
        receipt: "0001429",
        time: "19:26",
        check: "Masa 2",
        method: "Nakit",
        amount: "₺712,00",
        status: "Kesildi",
        device: "ÖKC-DEMO-0147",
        zNumber: "Z 0142",
        vat: "Yüzde 10",
    },
    {
        id: "4",
        receipt: "0001430",
        time: "19:41",
        check: "Masa 11",
        method: "Kart ve nakit",
        amount: "₺2.058,75",
        status: "Kesildi",
        device: "ÖKC-DEMO-0147",
        zNumber: "Z 0142",
        vat: "Yüzde 10 ve yüzde 20 karma",
    },
    {
        id: "5",
        receipt: "0001431",
        time: "19:53",
        check: "Masa 5",
        method: "Kart",
        amount: "-₺180,00",
        status: "İade",
        device: "ÖKC-DEMO-0147",
        zNumber: "Z 0142",
        vat: "Yüzde 10",
    },
];

const statusVariant = (status: FiscalRecord["status"]) => {
    if (status === "Kesildi") return "default" as const;
    if (status === "e-Arşiv kuyruğunda") return "secondary" as const;
    return "destructive" as const;
};

const FiscalTable = () => {
    const [selected, setSelected] = useState<FiscalRecord | null>(null);

    return (
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-6 py-4">
                <div className="flex items-center gap-3">
                    <span className="flex size-9 items-center justify-center rounded-lg bg-grapefruit-pale text-grapefruit-dark">
                        <ReceiptTextIcon className="size-4" />
                    </span>
                    <div>
                        <p className="font-heading text-sm font-semibold">Mali fiş kayıtları</p>
                        <p className="text-xs text-muted-foreground">Cihazdan dönen sonuç adisyonla birlikte saklanır</p>
                    </div>
                </div>
                <span className="rounded-full border border-border bg-secondary px-2.5 py-1 text-[10px] font-medium text-muted-foreground">
                    Örnek ekran
                </span>
            </div>

            <div className="max-h-[360px] overflow-auto">
                <Table>
                    <TableHeader className="sticky top-0 z-10 bg-card">
                        <TableRow className="hover:bg-transparent">
                            <TableHead>Fiş no</TableHead>
                            <TableHead>Saat</TableHead>
                            <TableHead>Adisyon</TableHead>
                            <TableHead className="hidden sm:table-cell">Ödeme</TableHead>
                            <TableHead>Durum</TableHead>
                            <TableHead className="text-right">Tutar</TableHead>
                            <TableHead className="text-right">Detay</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {RECORDS.map((record) => (
                            <TableRow key={record.id} className="transition-colors hover:bg-secondary/60">
                                <TableCell className="font-mono text-xs">{record.receipt}</TableCell>
                                <TableCell className="text-xs text-muted-foreground">{record.time}</TableCell>
                                <TableCell className="font-medium">{record.check}</TableCell>
                                <TableCell className="hidden text-muted-foreground sm:table-cell">{record.method}</TableCell>
                                <TableCell>
                                    <Badge variant={statusVariant(record.status)} className="whitespace-nowrap font-normal">
                                        {record.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right font-medium tabular-nums">{record.amount}</TableCell>
                                <TableCell className="text-right">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button size="sm" variant="outline" onClick={() => setSelected(record)}>
                                                Aç
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Mali fiş {record.receipt}</DialogTitle>
                                                <DialogDescription>
                                                    {record.check} adisyonuna bağlı fiş kaydı
                                                </DialogDescription>
                                            </DialogHeader>
                                            <dl className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
                                                <div>
                                                    <dt className="text-xs text-muted-foreground">Cihaz</dt>
                                                    <dd className="mt-0.5 font-mono text-xs">{record.device}</dd>
                                                </div>
                                                <div>
                                                    <dt className="text-xs text-muted-foreground">Z raporu</dt>
                                                    <dd className="mt-0.5 font-mono text-xs">{record.zNumber}</dd>
                                                </div>
                                                <div>
                                                    <dt className="text-xs text-muted-foreground">Ödeme tipi</dt>
                                                    <dd className="mt-0.5">{record.method}</dd>
                                                </div>
                                                <div>
                                                    <dt className="text-xs text-muted-foreground">KDV kırılımı</dt>
                                                    <dd className="mt-0.5">{record.vat}</dd>
                                                </div>
                                                <div>
                                                    <dt className="text-xs text-muted-foreground">Tutar</dt>
                                                    <dd className="mt-0.5 font-semibold tabular-nums">{record.amount}</dd>
                                                </div>
                                                <div>
                                                    <dt className="text-xs text-muted-foreground">Durum</dt>
                                                    <dd className="mt-0.5">
                                                        <Badge variant={statusVariant(record.status)} className="font-normal">
                                                            {record.status}
                                                        </Badge>
                                                    </dd>
                                                </div>
                                            </dl>
                                        </DialogContent>
                                    </Dialog>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter className="bg-secondary/50">
                        <TableRow className="hover:bg-transparent">
                            <TableCell colSpan={5} className="text-xs font-medium">
                                {RECORDS.length} fiş, tek Z raporu altında
                            </TableCell>
                            <TableCell className="text-right font-semibold tabular-nums">₺4.311,25</TableCell>
                            <TableCell />
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>

            <span className="sr-only">{selected ? `Seçili fiş ${selected.receipt}` : ""}</span>
        </div>
    );
};

export default FiscalTable;
