import { CheckIcon, QrCodeIcon, SparklesIcon } from "lucide-react";

const Frame = ({ children }: { children: React.ReactNode }) => (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-border bg-cream/70 p-3">
        <div
            className="absolute inset-0 opacity-[0.14]"
            style={{
                backgroundImage: "radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)",
                backgroundSize: "22px 22px",
            }}
        />
        <div className="relative h-full w-full">{children}</div>
    </div>
);

const QrMenuVisual = () => (
    <Frame>
        <div className="flex h-full items-center gap-3">
            <div className="flex h-full max-h-[128px] w-[86px] shrink-0 flex-col rounded-[14px] border border-border bg-background p-2 shadow-sm">
                <span className="mx-auto h-1 w-6 rounded-full bg-border" />
                <div className="mt-2 flex flex-1 flex-col gap-1.5">
                    {["Çorbalar", "Ara sıcak", "Ana yemek", "Tatlı"].map((group) => (
                        <span key={group} className="rounded-md bg-secondary px-1.5 py-1 text-[7px] text-muted-foreground">
                            {group}
                        </span>
                    ))}
                </div>
                <span className="mt-1.5 rounded-md bg-grapefruit px-1.5 py-1 text-center text-[7px] font-medium text-chocolate">
                    Sipariş ver
                </span>
            </div>

            <div className="flex min-w-0 flex-1 flex-col gap-2">
                <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-2.5 py-2">
                    <QrCodeIcon className="size-4 shrink-0 text-chocolate" />
                    <div className="min-w-0">
                        <p className="truncate text-[10px] font-medium">Masa 7 kodu okundu</p>
                        <p className="text-[9px] text-muted-foreground">Uygulama gerekmiyor</p>
                    </div>
                </div>
                {[
                    { name: "Mercimek çorbası", price: "₺95" },
                    { name: "Adana kebap", price: "₺480" },
                ].map((item) => (
                    <div key={item.name} className="flex items-center justify-between rounded-lg border border-border bg-background px-2.5 py-2">
                        <span className="truncate text-[10px]">{item.name}</span>
                        <span className="text-[10px] font-medium tabular-nums">{item.price}</span>
                    </div>
                ))}
            </div>
        </div>
    </Frame>
);

const KitchenVisual = () => {
    const columns = [
        { title: "Bekleyen", tone: "bg-lemon-pale text-lemon-dark", tickets: ["Masa 4", "Paket 318"] },
        { title: "Hazırlanıyor", tone: "bg-grapefruit-pale text-grapefruit-dark", tickets: ["Masa 7", "Masa 11"] },
        { title: "Hazır", tone: "bg-mint-pale text-mint-dark", tickets: ["Masa 2"] },
    ];
    return (
        <Frame>
            <div className="grid h-full grid-cols-3 gap-2">
                {columns.map((column) => (
                    <div key={column.title} className="flex min-w-0 flex-col gap-1.5">
                        <span className={`rounded-md px-1.5 py-1 text-center text-[8px] font-medium ${column.tone}`}>
                            {column.title}
                        </span>
                        {column.tickets.map((ticket) => (
                            <div key={ticket} className="rounded-lg border border-border bg-background p-1.5">
                                <p className="text-[9px] font-medium">{ticket}</p>
                                <div className="mt-1 space-y-0.5">
                                    <span className="block h-1 w-full rounded-full bg-secondary" />
                                    <span className="block h-1 w-3/4 rounded-full bg-secondary" />
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </Frame>
    );
};

const CheckoutVisual = () => (
    <Frame>
        <div className="flex h-full flex-col justify-between rounded-lg border border-border bg-background p-2.5">
            <div>
                <div className="flex items-baseline justify-between">
                    <span className="text-[10px] font-medium">Masa 7 adisyonu</span>
                    <span className="text-[11px] font-semibold tabular-nums">₺1.710,50</span>
                </div>
                <div className="mt-2 space-y-1">
                    {[
                        { label: "Kart", value: "₺1.000,00", width: "58%", tone: "bg-grapefruit" },
                        { label: "Nakit", value: "₺560,50", width: "33%", tone: "bg-mint" },
                        { label: "Bahşiş", value: "₺150,00", width: "9%", tone: "bg-lemon" },
                    ].map((row) => (
                        <div key={row.label} className="flex items-center gap-2">
                            <span className="w-10 shrink-0 text-[9px] text-muted-foreground">{row.label}</span>
                            <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary">
                                <span className={`block h-full rounded-full ${row.tone}`} style={{ width: row.width }} />
                            </span>
                            <span className="w-14 shrink-0 text-right text-[9px] tabular-nums">{row.value}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex items-center gap-1.5 rounded-md bg-mint-pale px-2 py-1.5 text-[9px] text-mint-dark">
                <CheckIcon className="size-3" />
                Bölünmüş ödeme kapandı, adisyon tek kayıtta
            </div>
        </div>
    </Frame>
);

const FiscalVisual = () => (
    <Frame>
        <div className="flex h-full items-stretch gap-3">
            <div className="flex w-[74px] shrink-0 flex-col rounded-[12px] border border-border bg-background p-1.5 shadow-sm">
                <span className="rounded-[6px] bg-chocolate px-1 py-1.5 text-center text-[7px] text-cream">ÖKC</span>
                <div className="mt-1.5 grid flex-1 grid-cols-3 gap-[3px]">
                    {Array.from({ length: 9 }).map((_, index) => (
                        <span key={index} className="rounded-[3px] bg-secondary" />
                    ))}
                </div>
            </div>
            <div className="flex min-w-0 flex-1 flex-col rounded-lg border border-border bg-background p-2">
                <p className="text-[9px] font-medium">Mali fiş 0001427</p>
                <div className="mt-1.5 flex-1 space-y-1">
                    {[
                        ["Ara toplam", "₺1.555,00"],
                        ["KDV yüzde 10", "₺155,50"],
                        ["Toplam", "₺1.710,50"],
                    ].map(([label, value]) => (
                        <div key={label} className="flex justify-between text-[8.5px]">
                            <span className="text-muted-foreground">{label}</span>
                            <span className="tabular-nums">{value}</span>
                        </div>
                    ))}
                </div>
                <span className="mt-1 rounded-md bg-mint-pale px-1.5 py-1 text-center text-[8px] text-mint-dark">
                    Adisyona geri yazıldı
                </span>
            </div>
        </div>
    </Frame>
);

const AssistantVisual = () => (
    <Frame>
        <div className="flex h-full flex-col justify-center gap-2">
            <div className="flex justify-end">
                <span className="max-w-[78%] rounded-xl rounded-br-md bg-chocolate px-2.5 py-1.5 text-[9px] text-cream">
                    Bu menüde glütensiz ne var?
                </span>
            </div>
            <div className="flex items-end gap-1.5">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full border border-border bg-background text-chocolate">
                    <SparklesIcon className="size-2.5" />
                </span>
                <span className="max-w-[78%] rounded-xl rounded-bl-md border border-border bg-background px-2.5 py-1.5 text-[9px]">
                    Izgara köfte ve mevsim salata glütensiz. Künefeyi öneremem, irmik içeriyor.
                </span>
            </div>
            <div className="flex justify-end">
                <span className="max-w-[78%] rounded-xl rounded-br-md bg-chocolate px-2.5 py-1.5 text-[9px] text-cream">
                    Köfteyi ekle
                </span>
            </div>
        </div>
    </Frame>
);

export const FEATURE_VISUALS: Record<string, () => React.JSX.Element> = {
    qr: QrMenuVisual,
    mutfak: KitchenVisual,
    kasa: CheckoutVisual,
    okc: FiscalVisual,
    asistan: AssistantVisual,
};
