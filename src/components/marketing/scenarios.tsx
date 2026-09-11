"use client";

import Container from "../global/container";
import { StackingCards, type StackingCardItem } from "../ui/stacking-cards";

const SetupPanel = ({
    rows,
    footnote,
}: {
    rows: { label: string; value: string; tone: string }[];
    footnote: string;
}) => (
    <div className="flex h-full flex-col justify-between p-4">
        <div className="space-y-2">
            {rows.map((row) => (
                <div
                    key={row.label}
                    className="flex items-center justify-between rounded-lg border border-chocolate/10 bg-background px-3 py-2.5"
                >
                    <span className="flex items-center gap-2 text-xs text-chocolate/70">
                        <span className={`size-2 rounded-full ${row.tone}`} />
                        {row.label}
                    </span>
                    <span className="text-xs font-medium tabular-nums text-chocolate">{row.value}</span>
                </div>
            ))}
        </div>
        <p className="mt-4 border-t border-chocolate/10 pt-3 text-[11px] leading-relaxed text-chocolate/60">
            {footnote}
        </p>
    </div>
);

const SCENARIOS: StackingCardItem[] = [
    {
        id: "kebapci",
        title: "Kebapçıda",
        tone: "bg-cream",
        description:
            "Salon yoğun, masa devri hızlı. Sipariş masadan düşer, ızgara ve soğuk istasyonları kendi kuyruğunu görür, kasa adisyonu beklemez.",
        bullets: [
            "Ocak başında ayrı mutfak ekranı",
            "Garson tabletinden hızlı adisyon",
            "Yazarkasa ile tek dokunuşta fiş",
        ],
        visual: (
            <SetupPanel
                rows={[
                    { label: "Masa", value: "42", tone: "bg-grapefruit" },
                    { label: "Mutfak istasyonu", value: "3", tone: "bg-lemon" },
                    { label: "Kasa noktası", value: "2", tone: "bg-mint" },
                ]}
                footnote="Izgara, soğuk ve tatlı istasyonları ayrı ekranda, hazır olan kalem garsona düşer."
            />
        ),
    },
    {
        id: "kafe",
        title: "Kafede",
        tone: "bg-grapefruit-pale",
        description:
            "Sipariş tezgahta alınır, misafir masada bekler. Kısa menü, hızlı ödeme ve sadakat kaydı aynı ekranda toplanır.",
        bullets: [
            "Tezgah ve masa siparişi tek havuzda",
            "Gel al ile salon ayrı raporlanır",
            "Misafir kaydı fiş üstünden tutulur",
        ],
        visual: (
            <SetupPanel
                rows={[
                    { label: "Masa", value: "18", tone: "bg-grapefruit" },
                    { label: "Tezgah noktası", value: "1", tone: "bg-lemon" },
                    { label: "Gel al payı", value: "yüzde 40", tone: "bg-mint" },
                ]}
                footnote="Gel al siparişleri salon adisyonlarıyla karışmaz, gün sonu ayrı okunur."
            />
        ),
    },
    {
        id: "pastane",
        title: "Pastanede",
        tone: "bg-mint-pale",
        description:
            "Vitrin satışı adet ve kilo üzerinden ilerler. Kalem ağırlığa göre fiyatlanır, paket siparişleri aynı kasadan geçer.",
        bullets: [
            "Kiloya göre fiyatlanan kalemler",
            "Vitrin ve sipariş stoğu ayrı takip",
            "Özel gün siparişleri takvimde",
        ],
        visual: (
            <SetupPanel
                rows={[
                    { label: "Vitrin kalemi", value: "86", tone: "bg-grapefruit" },
                    { label: "Kiloya göre", value: "24 kalem", tone: "bg-lemon" },
                    { label: "Ön sipariş", value: "açık", tone: "bg-mint" },
                ]}
                footnote="Tartıdan gelen ağırlık kaleme yazılır, fiş kalem kalem dökülür."
            />
        ),
    },
    {
        id: "bulut-mutfak",
        title: "Bulut mutfakta",
        tone: "bg-lemon-pale",
        description:
            "Salon yok, bütün iş paket kanallarından gelir. Farklı markaların siparişi tek mutfak ekranında sıraya girer.",
        bullets: [
            "Çoklu paket kanalı tek kuyrukta",
            "Marka bazlı ayrı menü ve fiyat",
            "Kurye teslimi adisyona yazılır",
        ],
        visual: (
            <SetupPanel
                rows={[
                    { label: "Paket kanalı", value: "4", tone: "bg-grapefruit" },
                    { label: "Sanal marka", value: "3", tone: "bg-lemon" },
                    { label: "Salon", value: "yok", tone: "bg-mint" },
                ]}
                footnote="Her markanın menüsü ayrı, mutfak tek ekrandan bütün kuyruğu görür."
            />
        ),
    },
];

const Scenarios = () => {
    return (
        <div className="relative flex w-full flex-col items-center justify-center pb-20 pt-20">
            <Container>
                <div className="mx-auto mb-12 flex max-w-3xl flex-col items-center text-center">
                    <span className="rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
                        Kurulum senaryoları
                    </span>
                    <h2 className="mt-5 font-heading text-2xl font-normal !leading-snug md:text-4xl lg:text-5xl">
                        Her mekan kendi <br />
                        düzenini kuruyor
                    </h2>
                    <p className="mt-4 text-base text-muted-foreground md:text-lg">
                        Aynı sistem, işletmenin çalışma biçimine göre farklı kuruluyor. Aşağı kaydırdıkça
                        dört tipik kurulumu görürsünüz.
                    </p>
                </div>
            </Container>

            <StackingCards items={SCENARIOS} />
        </div>
    );
};

export default Scenarios;
