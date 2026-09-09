import Container from "../global/container";
import AreaSpark from "../ui/area-spark";
import { MagicCard } from "../ui/magic-card";

const REVENUE_SPLIT = [
    { name: "Salon", checks: "34", amount: "₺8.120", share: 63, tone: "bg-grapefruit" },
    { name: "Paket", checks: "18", amount: "₺3.240", share: 25, tone: "bg-mint" },
    { name: "Gel al", checks: "9", amount: "₺1.474", share: 12, tone: "bg-lemon" },
];

const STATIONS = [
    { name: "Izgara", items: "62", waiting: "4", time: "11 dk", load: 78 },
    { name: "Soğuk", items: "48", waiting: "2", time: "6 dk", load: 42 },
    { name: "Tatlı", items: "27", waiting: "1", time: "8 dk", load: 55 },
];

const TURNOVER = [42, 38, 34, 31, 27, 24, 22, 19, 17, 16, 14, 14];

const HOURLY_REVENUE = [180, 420, 760, 640, 380, 300, 520, 980, 1480, 1720, 1260, 620];

const SampleTag = () => (
    <span className="shrink-0 rounded-full border border-border bg-secondary px-2.5 py-1 text-[10px] font-medium text-muted-foreground">
        Örnek ekran
    </span>
);

const Analysis = () => {
    return (
        <div className="relative flex w-full flex-col items-center justify-center py-20">
            <Container>
                <div className="mx-auto mb-16 flex max-w-3xl flex-col items-center text-center">
                    <span className="rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
                        Anlık takip
                    </span>
                    <h2 className="mt-5 font-heading text-2xl font-normal !leading-snug md:text-4xl lg:text-5xl">
                        Gün sonunu beklemeyin
                    </h2>
                    <p className="mt-4 text-base text-muted-foreground md:text-lg">
                        Ciro, masa devri ve mutfak süresi anlık işler. Vardiya bitmeden nerede tıkandığını görürsünüz.
                    </p>
                </div>
            </Container>

            <div className="relative grid w-full grid-cols-1 gap-6 md:grid-cols-2">

                <Container delay={0.15}>
                    <div className="relative h-full rounded-2xl border border-border bg-card">
                        <MagicCard
                            gradientFrom="#E4D085"
                            gradientTo="#EB9977"
                            gradientColor="rgba(235,153,119,0.12)"
                            className="h-full w-full overflow-hidden p-6 lg:p-8"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <h3 className="font-heading text-lg font-medium tracking-tight">Günün özeti</h3>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        Servis tipine göre ciro ve adisyon dağılımı
                                    </p>
                                </div>
                                <SampleTag />
                            </div>

                            <p className="mt-6 font-heading text-3xl font-normal tracking-tight">₺12.834</p>
                            <p className="mt-1 text-xs text-muted-foreground">
                                Akşam servisi, vardiya kapanmadan güncellenir
                            </p>

                            <div className="mt-4">
                                <AreaSpark
                                    values={HOURLY_REVENUE}
                                    labels={["11.00", "17.00", "23.00"]}
                                    stroke="#E47D55"
                                    fillFrom="rgba(235,153,119,0.3)"
                                    height={104}
                                />
                            </div>

                            <div className="mt-5 flex h-2.5 w-full overflow-hidden rounded-full bg-secondary">
                                {REVENUE_SPLIT.map((row) => (
                                    <span key={row.name} className={row.tone} style={{ width: `${row.share}%` }} />
                                ))}
                            </div>

                            <div className="mt-5 space-y-1">
                                <div className="grid grid-cols-[1.4fr_0.8fr_1fr] gap-3 pb-2 text-xs text-muted-foreground">
                                    <span>Servis</span>
                                    <span>Adisyon</span>
                                    <span className="text-right">Ciro</span>
                                </div>
                                {REVENUE_SPLIT.map((row) => (
                                    <div
                                        key={row.name}
                                        className="grid grid-cols-[1.4fr_0.8fr_1fr] gap-3 border-t border-border py-2.5 text-sm"
                                    >
                                        <span className="flex items-center gap-2">
                                            <span className={`size-2 rounded-full ${row.tone}`} />
                                            {row.name}
                                        </span>
                                        <span className="text-muted-foreground tabular-nums">{row.checks}</span>
                                        <span className="text-right font-medium tabular-nums">{row.amount}</span>
                                    </div>
                                ))}
                            </div>
                        </MagicCard>
                    </div>
                </Container>

                <Container delay={0.2}>
                    <div className="relative h-full rounded-2xl border border-border bg-card">
                        <MagicCard
                            gradientFrom="#E4D085"
                            gradientTo="#EB9977"
                            gradientColor="rgba(235,153,119,0.12)"
                            className="h-full w-full overflow-hidden p-6 lg:p-8"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <h3 className="font-heading text-lg font-medium tracking-tight">Servis performansı</h3>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        Mutfaktan masaya geçen süre ve masa devir hızı
                                    </p>
                                </div>
                                <SampleTag />
                            </div>

                            <p className="mt-6 font-heading text-3xl font-normal tracking-tight">14 dk</p>
                            <p className="mt-1 text-xs text-muted-foreground">
                                Ortalama hazırlık süresi, akşam boyunca izlenir
                            </p>

                            <div className="mt-4">
                                <AreaSpark
                                    values={TURNOVER}
                                    labels={["Servis başı", "Yoğunluk", "Gün sonu"]}
                                    stroke="#8FB092"
                                    fillFrom="rgba(170,198,173,0.32)"
                                    height={104}
                                />
                            </div>

                            <div className="mt-5 space-y-1">
                                <div className="grid grid-cols-[1.2fr_0.7fr_0.9fr_0.8fr] gap-3 pb-2 text-xs text-muted-foreground">
                                    <span>İstasyon</span>
                                    <span>Kalem</span>
                                    <span>Bekleyen</span>
                                    <span className="text-right">Süre</span>
                                </div>
                                {STATIONS.map((station) => (
                                    <div
                                        key={station.name}
                                        className="grid grid-cols-[1.2fr_0.7fr_0.9fr_0.8fr] items-center gap-3 border-t border-border py-2.5 text-sm"
                                    >
                                        <span>
                                            {station.name}
                                            <span className="mt-1.5 block h-1 w-full max-w-[68px] overflow-hidden rounded-full bg-secondary">
                                                <span
                                                    className="block h-full rounded-full bg-grapefruit"
                                                    style={{ width: `${station.load}%` }}
                                                />
                                            </span>
                                        </span>
                                        <span className="text-muted-foreground tabular-nums">{station.items}</span>
                                        <span className="text-muted-foreground tabular-nums">{station.waiting}</span>
                                        <span className="text-right font-medium tabular-nums">{station.time}</span>
                                    </div>
                                ))}
                            </div>
                        </MagicCard>
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default Analysis;
