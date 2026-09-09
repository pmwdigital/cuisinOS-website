import {
    ChefHatIcon,
    CreditCardIcon,
    QrCodeIcon,
    ReceiptTextIcon,
    SparklesIcon
} from "lucide-react";

export const FEATURES = [
    {
        title: "QR menü ve masadan sipariş",
        description: "Misafir masadaki kodu okutur, menüyü kendi dilinde görür ve siparişini kendisi verir. Uygulama indirmesi gerekmez.",
        icon: QrCodeIcon,
        visual: "qr",
    },
    {
        title: "Mutfak ekranı",
        description: "Sipariş anında mutfağa düşer, istasyonlara ayrılır. Hazır olan kalem garsona bildirilir.",
        icon: ChefHatIcon,
        visual: "mutfak",
    },
    {
        title: "Kasa ve adisyon",
        description: "Tahsilat, bölünmüş ödeme, bahşiş ve gün sonu raporu tek ekranda toplanır.",
        icon: CreditCardIcon,
        visual: "kasa",
    },
    {
        title: "Mali entegrasyon ve ÖKC",
        description: "Yazarkasa bağlantısı, mali fiş ve fatura akışı sipariş sisteminin içinde çalışır.",
        icon: ReceiptTextIcon,
        visual: "okc",
    },
    {
        title: "Yapay zekâ asistanı",
        description: "Misafire menüyü anlatır, alerjen sorularını yanıtlar ve öneri verir. Konuştuğu dilde.",
        icon: SparklesIcon,
        visual: "asistan",
    }
]
