export type PLAN = {
    id: string;
    title: string;
    desc: string;
    monthlyPrice: number;
    annuallyPrice: number;
    badge?: string;
    buttonText: string;
    features: string[];
    link: string;
};

export const PLANS: PLAN[] = [
    {
        id: "basic",
        title: "Basic",
        desc: "Tek şubeli restoranlar için. QR menü, sipariş akışı, mutfak ekranı ve kasa dahil.",
        monthlyPrice: 89,
        annuallyPrice: 890,
        buttonText: "Basic ile başlayın",
        features: [
            "30 masaya kadar",
            "15 kullanıcıya kadar",
            "Aylık 1.000 sipariş",
            "QR menü ve masadan sipariş",
            "Mutfak ekranı",
            "Stok ve reçete yönetimi",
            "Müşteri kayıtları",
            "Öncelikli destek"
        ],
        link: "#"
    },
    {
        id: "pro",
        title: "Pro",
        desc: "Yoğun salon ve çok şubeli işletmeler için. Gelişmiş analitik ve mali entegrasyon dahil.",
        monthlyPrice: 249,
        annuallyPrice: 2490,
        badge: "En çok tercih edilen",
        buttonText: "Pro ile başlayın",
        features: [
            "100 masaya kadar",
            "50 kullanıcıya kadar",
            "Aylık 5.000 sipariş",
            "Çok şubeli yönetim",
            "İstasyonlu mutfak ekranı",
            "Gelişmiş analitik",
            "ÖKC ve mali entegrasyon",
            "Günün her saati destek"
        ],
        link: "#"
    },
];
