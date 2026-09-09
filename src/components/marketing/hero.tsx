import { ArrowRightIcon, CheckIcon } from "lucide-react";
import Link from "next/link";
import Container from "../global/container";
import { Button } from "../ui/button";
import IntegrationBadge from "../ui/integration-badge";
import MacWindow from "../ui/mac-window";

const Hero = () => {
    return (
        <div className="relative flex w-full flex-col items-center justify-center pb-16 pt-4 lg:pb-24 lg:pt-8">
            <div className="pointer-events-none absolute left-1/2 top-0 -z-10 size-72 -translate-x-1/2 rounded-full bg-grapefruit/25 blur-[9rem]" />

            <div className="grid w-full grid-cols-1 items-center gap-14 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] lg:gap-10">

                <div className="flex flex-col items-start text-left">
                    <Container>
                        <Link
                            href="#mali"
                            className="group inline-flex items-center gap-2 rounded-full border border-border bg-background py-1 pl-1 pr-3 text-sm transition-colors hover:border-grapefruit/50"
                        >
                            <span className="rounded-full bg-gradient-to-r from-lemon to-grapefruit px-2 py-0.5 text-[11px] font-medium text-chocolate">
                                Yeni
                            </span>
                            <span className="text-muted-foreground transition-colors group-hover:text-foreground">
                                Yazarkasa entegrasyonu yayında
                            </span>
                            <ArrowRightIcon className="size-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                        </Link>
                    </Container>

                    <Container delay={0.1}>
                        <h1 className="mt-7 max-w-xl font-heading text-4xl font-light tracking-tight !leading-[1.08] md:text-5xl lg:text-6xl">
                            Restoranınızın tamamı tek ekranda
                        </h1>
                    </Container>

                    <Container delay={0.15}>
                        <p className="mt-6 max-w-md text-base text-muted-foreground lg:text-lg">
                            QR menüden mutfağa, kasadan mali fişe kadar bütün akış aynı yerde.
                            <br className="hidden sm:block" />
                            Kurulum yok, elinizdeki tablet yeter.
                        </p>
                    </Container>

                    <Container delay={0.2}>
                        <div className="mt-8 flex flex-wrap items-center gap-3">
                            <Link href="#iletisim" className="group">
                                <Button size="lg" variant="brand">
                                    Ücretsiz deneyin
                                    <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                                </Button>
                            </Link>
                            <Link href="#ozellikler">
                                <Button size="lg" variant="outline">
                                    Nasıl çalıştığını görün
                                </Button>
                            </Link>
                        </div>
                    </Container>

                    <Container delay={0.25}>
                        <p className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
                            <CheckIcon className="size-4 text-mint-dark" />
                            Tablet, telefon ve masaüstü tarayıcıda çalışır
                        </p>
                    </Container>

                    <Container delay={0.3}>
                        <div className="mt-8">
                            <IntegrationBadge />
                        </div>
                    </Container>
                </div>

                <Container delay={0.2} className="relative">
                    <MacWindow />
                </Container>

            </div>
        </div>
    );
};

export default Hero;
