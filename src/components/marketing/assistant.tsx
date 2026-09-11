import { BellRingIcon, ChefHatIcon, PackageIcon, ReceiptTextIcon, WalletIcon } from "lucide-react";
import Container from "../global/container";
import AssistantChat from "../ui/assistant-chat";
import { NotificationStack, type NotificationItem } from "../ui/notification-stack";

const EVENTS: NotificationItem[] = [
    {
        id: "siparis",
        icon: <BellRingIcon className="size-4" />,
        title: "Yeni sipariş",
        detail: "Masa 12, QR menüden dört kalem geldi",
        meta: "Az önce",
        tone: "grapefruit",
    },
    {
        id: "mutfak",
        icon: <ChefHatIcon className="size-4" />,
        title: "Mutfak hazır",
        detail: "Izgara istasyonu iki kalemi servise bıraktı",
        meta: "1 dakika önce",
        tone: "lemon",
    },
    {
        id: "tahsilat",
        icon: <WalletIcon className="size-4" />,
        title: "Tahsilat tamam",
        detail: "Masa 7 kapandı, mali fiş kesildi",
        meta: "3 dakika önce",
        tone: "mint",
    },
    {
        id: "stok",
        icon: <PackageIcon className="size-4" />,
        title: "Stok uyarısı",
        detail: "Ayran kritik seviyeye indi, sipariş açın",
        meta: "8 dakika önce",
        tone: "grapefruit",
    },
    {
        id: "earsiv",
        icon: <ReceiptTextIcon className="size-4" />,
        title: "e-Arşiv kuyruğu boşaldı",
        detail: "Gün içinde bekleyen fatura kalmadı",
        meta: "12 dakika önce",
        tone: "mint",
    },
];

const Assistant = () => {
    return (
        <div className="relative flex w-full flex-col items-center justify-center py-20">
            <Container>
                <div className="mx-auto mb-14 flex max-w-3xl flex-col items-center text-center">
                    <span className="rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
                        Asistan
                    </span>
                    <h2 className="mt-5 font-heading text-2xl font-normal !leading-snug md:text-4xl lg:text-5xl">
                        Rapor açmadan <br />
                        sorun, cevap gelsin
                    </h2>
                    <p className="mt-4 text-base text-muted-foreground md:text-lg">
                        Asistan servisin kendi verisine bakar. Hangi masa bekliyor, mutfakta ne birikti,
                        hangi adisyon açık kaldı sorularını konuşarak yanıtlar.
                    </p>
                </div>
            </Container>

            <div className="grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
                <Container delay={0.15}>
                    <div className="mx-auto h-[27rem] w-full max-w-md">
                        <AssistantChat />
                    </div>
                </Container>

                <Container delay={0.25}>
                    <div className="flex flex-col items-center gap-10 lg:items-start">
                        <div className="min-h-[11rem] w-full max-w-sm">
                            <NotificationStack items={EVENTS} />
                        </div>
                        <p className="max-w-md text-center text-sm text-muted-foreground lg:text-left">
                            Aynı olaylar bildirim olarak da düşer. Kartı yana kaydırarak kapatabilir,
                            listeyi boşalana kadar temizleyebilirsiniz.
                        </p>
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default Assistant;
