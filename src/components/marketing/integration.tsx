import { ArrowRightIcon, CheckIcon } from "lucide-react";
import Link from "next/link";
import Container from "../global/container";
import { Button } from "../ui/button";
import IntegrationGraph from "../ui/integration-graph";

const CHANNELS = [
    "Salon, paket ve gel al siparişleri aynı adisyon havuzunda toplanır",
    "Yazarkasa ÖKC sepeti alır, mali fişi keser, sonucu adisyona geri yazar",
    "e-Arşiv faturası tahsilat kapanır kapanmaz kuyruğa girer",
    "Kart, nakit ve QR ödemeleri tek ekranda bölünebilir",
];

const Integration = () => {
    return (
        <div className="relative flex w-full flex-col items-center justify-center py-20">
            <div className="grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">

                <Container>
                    <div className="flex flex-col items-start text-left">
                        <span className="rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
                            Entegrasyonlar
                        </span>
                        <h2 className="mt-5 font-heading text-2xl font-normal !leading-snug md:text-4xl lg:text-5xl">
                            Menünüz her kanalda, <br />
                            kasanız tek yerde
                        </h2>
                        <p className="mt-4 max-w-lg text-base text-muted-foreground md:text-lg">
                            Sipariş nereden gelirse gelsin aynı adisyona düşer. Mutfak, kasa ve mali taraf
                            birbirini bekletmeden ilerler.
                        </p>

                        <ul className="mt-8 space-y-3">
                            {CHANNELS.map((channel) => (
                                <li key={channel} className="flex items-start gap-3 text-sm text-foreground/80 md:text-base">
                                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-mint-pale text-mint-dark">
                                        <CheckIcon className="size-3" />
                                    </span>
                                    {channel}
                                </li>
                            ))}
                        </ul>

                        <Link href="#iletisim" className="mt-9">
                            <Button size="lg" variant="brand">
                                Entegrasyonları konuşalım
                                <ArrowRightIcon className="size-4" />
                            </Button>
                        </Link>
                    </div>
                </Container>

                <Container delay={0.2}>
                    <div className="relative overflow-hidden rounded-2xl border border-border bg-card">
                        <div className="relative flex aspect-[564/460] w-full items-center justify-center p-6 sm:aspect-[564/410] sm:p-8">
                            <div
                                className="absolute inset-0 opacity-[0.18]"
                                style={{
                                    backgroundImage:
                                        "radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)",
                                    backgroundSize: "32px 32px",
                                }}
                            />
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/70 via-transparent to-background/70" />
                            <div className="pointer-events-none absolute -left-16 top-1/2 size-64 -translate-y-1/2 rounded-full bg-lemon/25 blur-[6rem]" />
                            <div className="pointer-events-none absolute -right-16 top-1/3 size-56 rounded-full bg-grapefruit/20 blur-[6rem]" />
                            <div className="relative z-10 h-full w-full">
                                <IntegrationGraph />
                            </div>
                        </div>
                    </div>
                </Container>

            </div>
        </div>
    );
};

export default Integration;
