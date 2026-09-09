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
                <div className="mx-auto flex max-w-3xl flex-row flex-wrap items-center justify-center gap-3 pt-12">
                    {BUNDLED.map((item) => (
                        <span
                            key={item.label}
                            className="flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm text-muted-foreground shadow-sm transition-colors hover:border-grapefruit/40 hover:text-foreground"
                        >
                            <item.icon className="size-4 text-grapefruit-dark" />
                            {item.label}
                        </span>
                    ))}
                </div>
            </Container>
        </div>
    );
};

export default Companies;
