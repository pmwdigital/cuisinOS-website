import { BuildingIcon, GaugeIcon, LayersIcon } from "lucide-react";
import Container from "../global/container";
import { CITIES } from "@/constants/cities";
import { LeaderboardCard } from "../ui/leaderboard-card";
import TurkeyGlobe from "../ui/turkey-globe";

const BRANCHES = [
    { id: "kadikoy", name: "Kadıköy", byline: "Salon ağırlıklı, 42 masa", value: 289400 },
    { id: "besiktas", name: "Beşiktaş", byline: "Salon ve paket karışık", value: 251800 },
    { id: "nisantasi", name: "Nişantaşı", byline: "Salon ağırlıklı, 28 masa", value: 238300 },
    { id: "cankaya", name: "Çankaya", byline: "Paket ağırlıklı", value: 198700 },
    { id: "alsancak", name: "Alsancak", byline: "Salon ve gel al", value: 156200 },
    { id: "konak", name: "Konak", byline: "Gel al ağırlıklı", value: 142900 },
    { id: "nilufer", name: "Nilüfer", byline: "Paket ağırlıklı", value: 128400 },
    { id: "muratpasa", name: "Muratpaşa", byline: "Sezonluk salon", value: 117600 },
].map((branch) => ({ ...branch, avatar: `/food/sube/${branch.id}.webp` }));

const PODIUM = BRANCHES.slice(0, 3).map((branch, index) => ({
    userId: branch.id,
    userName: branch.name,
    rank: index + 1,
    value: branch.value,
    avatar: branch.avatar,
}));

const RANKINGS = BRANCHES.map((branch, index) => ({
    userId: branch.id,
    rank: index + 1,
    userName: branch.name,
    byline: branch.byline,
    value: branch.value,
    avatar: branch.avatar,
}));

const POINTS = [
    {
        icon: LayersIcon,
        title: "Tek panel, çok şube",
        detail: "Her şubenin menüsü, fiyatı ve stoğu ayrı tutulur, rapor tek yerde toplanır",
    },
    {
        icon: BuildingIcon,
        title: "Şubeye özel yetki",
        detail: "Personel yalnızca bağlı olduğu şubenin adisyonlarını ve raporlarını görür",
    },
    {
        icon: GaugeIcon,
        title: "Karşılaştırmalı görünüm",
        detail: "Ciro, masa devri ve mutfak süresi şubeler arasında yan yana okunur",
    },
];

const Coverage = () => {
    return (
        <div className="relative flex w-full flex-col items-center justify-center py-20">
            <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">

                <Container>
                    <div className="flex flex-col items-start text-left">
                        <span className="rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
                            Çok şubeli işletmeler
                        </span>
                        <h2 className="mt-5 font-heading text-2xl font-normal !leading-snug md:text-4xl lg:text-5xl">
                            Şubeler dağınık, <br />
                            panel tek
                        </h2>
                        <p className="mt-4 max-w-lg text-base text-muted-foreground md:text-lg">
                            Aynı marka altındaki her nokta kendi işini yürütür, merkez bütün şubeleri aynı
                            ekrandan izler. Yeni şube açmak yeni bir kurulum gerektirmez.
                        </p>

                        <div className="mt-9 space-y-5">
                            {POINTS.map((point) => (
                                <div key={point.title} className="flex items-start gap-4">
                                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border bg-background text-chocolate shadow-sm">
                                        <point.icon className="size-4" />
                                    </span>
                                    <div>
                                        <p className="text-sm font-medium leading-none">{point.title}</p>
                                        <p className="mt-1.5 text-sm text-muted-foreground">{point.detail}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Container>

                <Container delay={0.2}>
                    <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 sm:p-8">
                        <div className="pointer-events-none absolute -right-20 -top-16 size-64 rounded-full bg-grapefruit/15 blur-[7rem]" />
                        <div className="relative mx-auto w-full max-w-[26rem]">
                            <TurkeyGlobe />
                        </div>
                        <div className="relative mt-6 flex flex-wrap justify-center gap-x-4 gap-y-2 border-t border-border pt-5">
                            {CITIES.map((city) => (
                                <span key={city.id} className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                                    <span className="size-1.5 rounded-full bg-grapefruit-dark" />
                                    {city.name}
                                </span>
                            ))}
                        </div>
                        <p className="relative mt-4 text-center text-[11px] text-muted-foreground/75">
                            İşaretli şehirler CuisinOS kurulumunun desteklendiği bölgeleri gösterir, küre sürüklenebilir
                        </p>
                    </div>
                </Container>

            </div>

            <Container delay={0.25} className="mt-6">
                <div className="relative mx-auto w-full max-w-xl">
                    <LeaderboardCard
                        title="Şube sıralaması"
                        fromDate="2026-09-01"
                        toDate="2026-09-07"
                        podiumRankings={PODIUM}
                        rankings={RANKINGS}
                        currentUserId="alsancak"
                    />
                    <span className="absolute right-5 top-5 rounded-full border border-border bg-secondary px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                        Örnek ekran
                    </span>
                </div>
            </Container>
        </div>
    );
};

export default Coverage;
