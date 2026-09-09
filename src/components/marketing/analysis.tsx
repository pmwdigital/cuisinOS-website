import { DownloadIcon, FilterIcon, TrendingUpIcon } from "lucide-react";
import Container from "../global/container";
import { Button } from "../ui/button";
import { MagicCard } from "../ui/magic-card";

const Analysis = () => {
    return (
        <div className="relative flex flex-col items-center justify-center w-full py-20">
            <Container>
                <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-2xl md:text-4xl lg:text-5xl font-heading font-normal !leading-snug">
                        Gün sonunu <br />beklemeyin
                    </h2>
                    <p className="text-base md:text-lg text-accent-foreground/80 mt-4">
                        Ciro, masa devri ve mutfak süresi anlık işler. Vardiya bitmeden nerede tıkandığını görürsünüz.
                    </p>
                </div>
            </Container>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative w-full">

                <Container delay={0.2}>
                    <div className="rounded-2xl bg-background/40 relative border border-border/50">
                        <MagicCard
                            gradientFrom="#E4D085"
                            gradientTo="#EB9977"
                            gradientColor="rgba(235,153,119,0.12)"
                            className="p-4 lg:p-8 w-full overflow-hidden"
                        >
                            <div className="absolute bottom-0 right-0 bg-grapefruit w-1/4 h-1/4 blur-[8rem] z-20"></div>
                            <div className="space-y-4">
                                <h3 className="text-xl font-medium">
                                    Günün özeti
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Servis tipine göre ciro ve adisyon dağılımı.
                                </p>

                                <div className="space-y-4">
                                    <div className="flex justify-between items-baseline">
                                        <div>
                                            <div className="text-3xl font-semibold">
                                                ₺12.834
                                            </div>
                                            <div className="text-sm text-mint flex items-center gap-1 mt-2">
                                                <TrendingUpIcon className="w-4 h-4" />
                                                Geçen haftaya göre yüzde 25 artış
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button size="icon" variant="ghost">
                                                <FilterIcon className="w-5 h-5" />
                                            </Button>
                                            <Button size="icon" variant="ghost">
                                                <DownloadIcon className="w-5 h-5" />
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="grid grid-cols-4 text-sm text-muted-foreground py-2">
                                            <div>Servis</div>
                                            <div>Durum</div>
                                            <div>Adisyon</div>
                                            <div>Ciro</div>
                                        </div>
                                        {[
                                            { name: "Salon", status: "Açık", reach: "34", roi: "₺8.120" },
                                            { name: "Paket", status: "Açık", reach: "18", roi: "₺3.240" },
                                            { name: "Gel al", status: "Kapandı", reach: "9", roi: "₺1.474" },
                                        ].map((campaign) => (
                                            <div key={campaign.name} className="grid grid-cols-4 text-sm py-2 border-t border-border/50">
                                                <div>{campaign.name}</div>
                                                <div>{campaign.status}</div>
                                                <div>{campaign.reach}</div>
                                                <div className="font-semibold">{campaign.roi}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </MagicCard>
                    </div>
                </Container>

                <Container delay={0.2}>
                    <div className="rounded-2xl bg-background/40 relative border border-border/50">
                        <MagicCard
                            gradientFrom="#E4D085"
                            gradientTo="#EB9977"
                            gradientColor="rgba(235,153,119,0.12)"
                            className="p-4 lg:p-8 w-full overflow-hidden"
                        >
                            <div className="absolute bottom-0 right-0 bg-mint w-1/4 h-1/4 blur-[8rem] z-20"></div>
                            <div className="space-y-4">
                                <h3 className="text-xl font-medium">
                                    Servis performansı
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Mutfaktan masaya geçen süre ve masa devir hızı.
                                </p>

                                <div className="space-y-4">
                                    <div className="flex justify-between items-baseline">
                                        <div>
                                            <div className="text-3xl font-semibold">14 dk</div>
                                            <div className="text-sm text-mint flex items-center gap-1 mt-2">
                                                <TrendingUpIcon className="w-4 h-4" />
                                                Ortalama hazırlık süresi, hedefin altında
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button size="icon" variant="ghost">
                                                <FilterIcon className="w-5 h-5" />
                                            </Button>
                                            <Button size="icon" variant="ghost">
                                                <DownloadIcon className="w-5 h-5" />
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="grid grid-cols-4 text-sm text-muted-foreground py-2">
                                            <div>İstasyon</div>
                                            <div>Kalem</div>
                                            <div>Bekleyen</div>
                                            <div>Süre</div>
                                        </div>
                                        {[
                                            { channel: "Izgara", users: "62", sessions: "4", rate: "11 dk" },
                                            { channel: "Soğuk", users: "48", sessions: "2", rate: "6 dk" },
                                            { channel: "Tatlı", users: "27", sessions: "1", rate: "8 dk" },
                                        ].map((metric) => (
                                            <div key={metric.channel} className="grid grid-cols-4 text-sm py-2 border-t border-border/50">
                                                <div>{metric.channel}</div>
                                                <div>{metric.users}</div>
                                                <div>{metric.sessions}</div>
                                                <div className="font-semibold">{metric.rate}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </MagicCard>
                    </div>
                </Container>
            </div>
        </div>
    )
};

export default Analysis;
