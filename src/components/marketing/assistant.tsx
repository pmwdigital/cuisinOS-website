import { BellRingIcon, ChefHatIcon, WalletIcon } from "lucide-react";
import Container from "../global/container";
import AssistantChat from "../ui/assistant-chat";
import DisplayCards, { STACK_POSITIONS } from "../ui/display-cards";

const EVENT_CARDS = [
    {
        icon: <BellRingIcon className="size-3.5" />,
        title: "Yeni sipariş",
        description: "Masa 12, QR menüden 4 kalem",
        meta: "Az önce",
        tone: "grapefruit" as const,
        className: STACK_POSITIONS[0],
    },
    {
        icon: <ChefHatIcon className="size-3.5" />,
        title: "Mutfak hazır",
        description: "Izgara istasyonu, 2 kalem",
        meta: "1 dakika önce",
        tone: "lemon" as const,
        className: STACK_POSITIONS[1],
    },
    {
        icon: <WalletIcon className="size-3.5" />,
        title: "Tahsilat tamam",
        description: "Masa 7, mali fiş kesildi",
        meta: "3 dakika önce",
        tone: "mint" as const,
        className: STACK_POSITIONS[2],
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
                        <div className="w-full min-h-[16rem] pl-2 sm:pl-8">
                            <DisplayCards cards={EVENT_CARDS} />
                        </div>
                        <p className="max-w-md text-center text-sm text-muted-foreground lg:text-left">
                            Aynı olaylar bildirim olarak da düşer. Sipariş açıldığında, mutfak hazır dediğinde
                            ve tahsilat kapandığında ilgili ekip anında görür.
                        </p>
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default Assistant;
