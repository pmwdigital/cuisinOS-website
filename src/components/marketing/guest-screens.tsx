"use client";

import Image from "next/image";
import { CheckIcon, MinusIcon, PlusIcon, QrCodeIcon } from "lucide-react";
import Container from "../global/container";
import { PhoneCarousel, type PhoneScreen } from "../ui/phone-carousel";

const MENU_ITEMS = [
    { name: "Lahmacun", note: "İnce hamur, salata ile", price: "₺95", image: "/food/mini/lahmacun.webp" },
    { name: "Döner dürüm", note: "El açması lavaş, acılı", price: "₺240", image: "/food/mini/doner.webp" },
    { name: "Pilav üstü tavuk", note: "Tereyağlı pirinç pilavı", price: "₺320", image: "/food/mini/pilav.webp" },
];

const BASKET = [
    { name: "Lahmacun", qty: 2, price: "₺190", image: "/food/mini/lahmacun.webp" },
    { name: "Döner dürüm", qty: 1, price: "₺240", image: "/food/mini/doner.webp" },
    { name: "Ayran", qty: 2, price: "₺80", image: "/food/mini/ayran.webp" },
];

const STATUS_STEPS = [
    { label: "Sipariş alındı", detail: "Masa 7, üç kalem", done: true },
    { label: "Mutfakta hazırlanıyor", detail: "Izgara istasyonu", done: true },
    { label: "Servise çıktı", detail: "Garson yolda", done: false },
];

const ScreenShell = ({ title, subtitle, children, footer }: {
    title: string;
    subtitle: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
}) => (
    <div className="flex h-full flex-col px-3 pb-3 text-left">
        <div className="flex items-center justify-between border-b border-border pb-2.5">
            <div className="min-w-0">
                <p className="truncate text-[0.7rem] font-medium leading-none">{title}</p>
                <p className="mt-1 truncate text-[0.55rem] text-muted-foreground">{subtitle}</p>
            </div>
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-grapefruit-pale text-grapefruit-dark">
                <QrCodeIcon className="size-3" />
            </span>
        </div>
        <div className="min-h-0 flex-1 overflow-hidden pt-2.5">{children}</div>
        {footer}
    </div>
);

const MenuScreen = () => (
    <ScreenShell
        title="Lezzet Durağı"
        subtitle="Masa 7, menü kendi dilinde"
        footer={
            <div className="mt-2 w-full rounded-lg bg-grapefruit py-2 text-center text-[0.6rem] font-medium text-chocolate">
                Sepete git, 3 kalem
            </div>
        }
    >
        <div className="flex gap-1 pb-2">
            {["Ana yemek", "Dürümler", "İçecek"].map((group, index) => (
                <span
                    key={group}
                    className={`rounded-full px-2 py-1 text-[0.5rem] ${index === 0 ? "bg-chocolate text-cream" : "bg-secondary text-muted-foreground"}`}
                >
                    {group}
                </span>
            ))}
        </div>
        <div className="space-y-1.5">
            {MENU_ITEMS.map((item) => (
                <div key={item.name} className="flex items-center gap-2 rounded-lg border border-border p-2">
                    <Image
                        src={item.image}
                        alt=""
                        width={80}
                        height={80}
                        className="size-8 shrink-0 rounded-md object-cover"
                    />
                    <div className="min-w-0 flex-1">
                        <p className="truncate text-[0.6rem] font-medium leading-none">{item.name}</p>
                        <p className="mt-1 truncate text-[0.5rem] text-muted-foreground">{item.note}</p>
                    </div>
                    <div className="flex shrink-0 flex-col items-end gap-1">
                        <span className="text-[0.6rem] font-medium tabular-nums">{item.price}</span>
                        <span className="flex size-4 items-center justify-center rounded-full bg-grapefruit-pale text-grapefruit-dark">
                            <PlusIcon className="size-2.5" />
                        </span>
                    </div>
                </div>
            ))}
        </div>
    </ScreenShell>
);

const BasketScreen = () => (
    <ScreenShell
        title="Sepetiniz"
        subtitle="Garson çağırmadan gönderin"
        footer={
            <div className="mt-2 w-full rounded-lg bg-grapefruit py-2 text-center text-[0.6rem] font-medium text-chocolate">
                Siparişi gönder
            </div>
        }
    >
        <div className="space-y-1.5">
            {BASKET.map((item) => (
                <div key={item.name} className="flex items-center gap-2 rounded-lg border border-border p-2">
                    <div className="flex shrink-0 items-center gap-1 rounded-full border border-border px-1 py-0.5">
                        <MinusIcon className="size-2 text-muted-foreground" />
                        <span className="text-[0.5rem] tabular-nums">{item.qty}</span>
                        <PlusIcon className="size-2 text-muted-foreground" />
                    </div>
                    <Image
                        src={item.image}
                        alt=""
                        width={64}
                        height={64}
                        className="size-6 shrink-0 rounded object-cover"
                    />
                    <p className="min-w-0 flex-1 truncate text-[0.6rem]">{item.name}</p>
                    <span className="shrink-0 text-[0.6rem] font-medium tabular-nums">{item.price}</span>
                </div>
            ))}
        </div>
        <div className="mt-2.5 space-y-1 border-t border-border pt-2 text-[0.55rem]">
            <div className="flex justify-between text-muted-foreground">
                <span>Ara toplam</span>
                <span className="tabular-nums">₺510</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
                <span>KDV</span>
                <span className="tabular-nums">₺51</span>
            </div>
            <div className="flex justify-between text-[0.65rem] font-medium">
                <span>Toplam</span>
                <span className="tabular-nums">₺561</span>
            </div>
        </div>
    </ScreenShell>
);

const StatusScreen = () => (
    <ScreenShell title="Siparişiniz" subtitle="Durum anlık güncellenir">
        <div className="space-y-2.5">
            {STATUS_STEPS.map((step) => (
                <div key={step.label} className="flex gap-2">
                    <span
                        className={`mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full ${step.done ? "bg-mint text-chocolate" : "border border-dashed border-border text-muted-foreground"}`}
                    >
                        {step.done && <CheckIcon className="size-2.5" />}
                    </span>
                    <div className="min-w-0">
                        <p className={`truncate text-[0.6rem] leading-none ${step.done ? "font-medium" : "text-muted-foreground"}`}>
                            {step.label}
                        </p>
                        <p className="mt-1 truncate text-[0.5rem] text-muted-foreground">{step.detail}</p>
                    </div>
                </div>
            ))}
        </div>
        <div className="mt-3 rounded-lg bg-secondary p-2.5">
            <p className="text-[0.5rem] text-muted-foreground">Tahmini servis</p>
            <p className="mt-1 font-heading text-sm font-normal tabular-nums">11 dakika</p>
        </div>
    </ScreenShell>
);

const PaymentScreen = () => (
    <ScreenShell
        title="Hesap"
        subtitle="Masa 7, üç kişi"
        footer={
            <div className="mt-2 w-full rounded-lg bg-grapefruit py-2 text-center text-[0.6rem] font-medium text-chocolate">
                Kartla öde
            </div>
        }
    >
        <div className="rounded-lg border border-border p-2.5">
            <div className="flex items-baseline justify-between">
                <span className="text-[0.55rem] text-muted-foreground">Toplam</span>
                <span className="font-heading text-base font-normal tabular-nums">₺561</span>
            </div>
            <div className="mt-2 flex gap-1">
                {["Tek öde", "Bölüş", "Kalem seç"].map((mode, index) => (
                    <span
                        key={mode}
                        className={`flex-1 rounded-md py-1 text-center text-[0.5rem] ${index === 1 ? "bg-chocolate text-cream" : "bg-secondary text-muted-foreground"}`}
                    >
                        {mode}
                    </span>
                ))}
            </div>
        </div>
        <div className="mt-2.5">
            <p className="text-[0.5rem] text-muted-foreground">Bahşiş</p>
            <div className="mt-1 flex gap-1">
                {["Yüzde 5", "Yüzde 10", "Yüzde 15"].map((tip, index) => (
                    <span
                        key={tip}
                        className={`flex-1 rounded-md border py-1 text-center text-[0.5rem] ${index === 1 ? "border-grapefruit bg-grapefruit-pale text-grapefruit-dark" : "border-border text-muted-foreground"}`}
                    >
                        {tip}
                    </span>
                ))}
            </div>
        </div>
        <div className="mt-2.5 flex items-center gap-2 rounded-lg bg-mint-pale p-2">
            <CheckIcon className="size-3 shrink-0 text-mint-dark" />
            <p className="text-[0.5rem] leading-tight text-chocolate">
                Ödeme bitince mali fiş otomatik keseriz
            </p>
        </div>
    </ScreenShell>
);

const SCREENS: PhoneScreen[] = [
    { id: "menu", label: "QR menü", content: <MenuScreen /> },
    { id: "sepet", label: "Sepet ve sipariş", content: <BasketScreen /> },
    { id: "durum", label: "Sipariş durumu", content: <StatusScreen /> },
    { id: "odeme", label: "Hesap ve ödeme", content: <PaymentScreen /> },
];

const GuestScreens = () => {
    return (
        <div className="relative flex w-full flex-col items-center justify-center py-20">
            <Container>
                <div className="mx-auto mb-14 flex max-w-3xl flex-col items-center text-center">
                    <span className="rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
                        Misafir tarafı
                    </span>
                    <h2 className="mt-5 font-heading text-2xl font-normal !leading-snug md:text-4xl lg:text-5xl">
                        Misafir telefonunda <br />
                        ne görüyor
                    </h2>
                    <p className="mt-4 text-base text-muted-foreground md:text-lg">
                        Masadaki kodu okutur, menüyü kendi dilinde açar, siparişini verir ve hesabı
                        kendi telefonundan kapatır. Uygulama indirmesi gerekmez.
                    </p>
                </div>
            </Container>

            <Container delay={0.15}>
                <PhoneCarousel screens={SCREENS} />
            </Container>

            <Container delay={0.2}>
                <p className="mt-6 text-center text-xs text-muted-foreground/75">
                    Örnek ekranlar, gerçek menüde kalemler ve fiyatlar sizin panelinizden gelir
                </p>
            </Container>
        </div>
    );
};

export default GuestScreens;
