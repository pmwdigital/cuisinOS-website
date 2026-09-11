"use client";

import { cn } from "@/lib";
import {
    BikeIcon,
    CalculatorIcon,
    ChefHatIcon,
    CreditCardIcon,
    FileCheck2Icon,
    QrCodeIcon,
    ReceiptTextIcon,
    SmartphoneIcon,
} from "lucide-react";
import Container from "../global/container";
import MarqueeAlongSvgPath from "../ui/marquee-along-svg-path";

const TONES = [
    "bg-grapefruit-pale text-grapefruit-dark",
    "bg-mint-pale text-mint-dark",
    "bg-lemon-pale text-chocolate",
];

const BUNDLED = [
    { label: "Yazarkasa ÖKC", icon: ReceiptTextIcon },
    { label: "GİB e-Arşiv", icon: FileCheck2Icon },
    { label: "Kart ve QR ödeme", icon: CreditCardIcon },
    { label: "Paket kanalları", icon: BikeIcon },
    { label: "Mutfak ekranı", icon: ChefHatIcon },
    { label: "QR menü", icon: QrCodeIcon },
    { label: "Garson tableti", icon: SmartphoneIcon },
    { label: "Muhasebe aktarımı", icon: CalculatorIcon },
];

const MARQUEE_PATH =
    "M -200 133 C -40 133, -40 57, 120 57 C 280 57, 280 133, 440 133 C 600 133, 600 57, 760 57 C 920 57, 920 133, 1080 133 C 1240 133, 1240 57, 1400 57";

const EDGE_FADE =
    "linear-gradient(to right, transparent 0px, #000 max(9%, 72px), #000 calc(100% - max(9%, 72px)), transparent 100%)";

const Companies = () => {
    return (
        <div className="companies relative mt-16 flex w-full flex-col items-center justify-center overflow-hidden py-20">
            <Container>
                <div className="flex flex-col items-center justify-center text-center">
                    <h4 className="text-2xl font-medium lg:text-4xl">
                        Kurulumda hazır gelen bağlantılar
                    </h4>
                    <p className="mt-4 max-w-xl text-sm text-muted-foreground md:text-base">
                        Ek modül satın almadan, ayrı sözleşme imzalamadan ilk günden çalışır durumda gelir.
                    </p>
                </div>
            </Container>

            <Container delay={0.1}>
                <div
                    className="relative mt-6"
                    style={{ maskImage: EDGE_FADE, WebkitMaskImage: EDGE_FADE }}
                >
                    <MarqueeAlongSvgPath
                        path={MARQUEE_PATH}
                        viewBox="0 0 1200 190"
                        baseVelocity={4}
                        slowdownOnHover
                        slowDownFactor={0.2}
                        useScrollVelocity
                        scrollAwareDirection
                        repeat={1}
                        offsetRotate="0deg"
                        responsive
                        minScale={0.82}
                        showPath
                        className="h-[190px] w-full text-border"
                    >
                        {BUNDLED.map((item, index) => (
                            <div
                                key={item.label}
                                className="flex items-center gap-2 whitespace-nowrap rounded-full border border-border bg-background py-1.5 pl-1.5 pr-3.5 text-sm text-foreground shadow-sm transition-colors hover:border-grapefruit/50"
                            >
                                <span
                                    className={cn(
                                        "flex size-7 items-center justify-center rounded-full",
                                        TONES[index % TONES.length]
                                    )}
                                >
                                    <item.icon className="size-3.5" />
                                </span>
                                {item.label}
                            </div>
                        ))}
                    </MarqueeAlongSvgPath>
                </div>
            </Container>
        </div>
    );
};

export default Companies;
