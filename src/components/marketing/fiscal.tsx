import { ShieldCheckIcon } from "lucide-react";
import Container from "../global/container";
import AreaSpark from "../ui/area-spark";
import FiscalFlow from "../ui/fiscal-flow";
import FiscalTable from "../ui/fiscal-table";
import TrendCard from "../ui/trend-card";

const HOURLY_RECEIPTS = [
    { label: "11", value: 4 },
    { label: "12", value: 9 },
    { label: "13", value: 16 },
    { label: "14", value: 12 },
    { label: "15", value: 7 },
    { label: "16", value: 6 },
    { label: "17", value: 8 },
    { label: "18", value: 14 },
    { label: "19", value: 23 },
    { label: "20", value: 27 },
    { label: "21", value: 18 },
    { label: "22", value: 9 },
    { label: "23", value: 4 },
];

const QUEUE_DRAIN = [14, 11, 13, 8, 9, 5, 6, 3, 4, 2, 1, 0];

const Fiscal = () => {
    return (
        <div className="relative flex w-full flex-col items-center justify-center py-20">
            <Container>
                <div className="mx-auto mb-14 flex max-w-3xl flex-col items-center text-center">
                    <span className="rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
                        Mali entegrasyon
                    </span>
                    <h2 className="mt-5 font-heading text-2xl font-normal !leading-snug md:text-4xl lg:text-5xl">
                        Yazarkasa ve mali tarafla <br />
                        tam uyum
                    </h2>
                    <p className="mt-4 text-base text-muted-foreground md:text-lg">
                        Ödeme, mali fiş ve e-Arşiv adımları aynı akışın parçası. Kasiyerin cihazda ikinci
                        kez tutar girmesi gerekmez, gün sonunda açıkta fiş kalmaz.
                    </p>
                </div>
            </Container>

            <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-6">

                <Container delay={0.1} className="md:col-span-3 md:row-span-2">
                    <FiscalFlow />
                </Container>

                <Container delay={0.15} className="md:col-span-3">
                    <TrendCard
                        title="Gün içi mali fiş dağılımı"
                        subtitle="Saat bazında kesilen fiş adedi"
                        data={HOURLY_RECEIPTS}
                        footer={[
                            { label: "Toplam fiş", value: "157" },
                            { label: "Eşleşmeyen", value: "0" },
                            { label: "Z raporu", value: "1" },
                        ]}
                    />
                </Container>

                <Container delay={0.2} className="md:col-span-2">
                    <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6">
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <h3 className="font-heading text-lg font-medium tracking-tight">e-Arşiv kuyruğu</h3>
                                <p className="mt-1 text-sm text-muted-foreground">Tahsilat kapanınca fatura kuyruğa girer</p>
                            </div>
                            <span className="shrink-0 rounded-full border border-border bg-secondary px-2.5 py-1 text-[10px] font-medium text-muted-foreground">
                                Örnek ekran
                            </span>
                        </div>
                        <div className="mt-6 flex-1">
                            <AreaSpark
                                values={QUEUE_DRAIN}
                                labels={["Servis başı", "Akşam", "Gün sonu"]}
                                stroke="#8FB092"
                                fillFrom="rgba(170,198,173,0.35)"
                            />
                        </div>
                        <p className="mt-4 border-t border-border pt-4 text-xs text-muted-foreground">
                            Kuyruk boşalmadan gün kapanmaz, bekleyen her kayıt sebebiyle birlikte görünür.
                        </p>
                    </div>
                </Container>

                <Container delay={0.25} className="md:col-span-1">
                    <div className="flex h-full flex-col justify-center rounded-2xl border border-border bg-card p-6 text-center">
                        <p className="font-heading text-3xl font-normal tracking-tight">3</p>
                        <p className="mt-1 text-xs font-medium text-muted-foreground">
                            KDV oranı aynı fişte
                        </p>
                        <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground/80">
                            Yüzde 1, 10 ve 20 kalemleri tek adisyonda karışabilir
                        </p>
                    </div>
                </Container>

                <Container delay={0.3} className="md:col-span-3">
                    <div className="flex h-full items-center gap-4 rounded-2xl border border-border bg-secondary/60 p-6">
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-background text-mint-dark shadow-sm">
                            <ShieldCheckIcon className="size-5" />
                        </span>
                        <div>
                            <p className="text-sm font-medium leading-none">Her fiş denetim izine yazılır</p>
                            <p className="mt-1.5 text-xs text-muted-foreground">
                                Kim, hangi cihazda, hangi adisyon için kesti sorusunun cevabı kayıtta durur
                            </p>
                        </div>
                    </div>
                </Container>

            </div>

            <Container delay={0.35} className="mt-4">
                <FiscalTable />
            </Container>
        </div>
    );
};

export default Fiscal;
