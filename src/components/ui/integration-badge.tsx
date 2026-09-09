"use client";

import {
    BikeIcon,
    CalculatorIcon,
    ChefHatIcon,
    CreditCardIcon,
    FileCheck2Icon,
    ReceiptTextIcon,
} from "lucide-react";
import StackBadge, { type StackItem } from "./stack-badge";

const BUNDLED_INTEGRATIONS: StackItem[] = [
    { id: "okc", label: "Yazarkasa ÖKC", icon: ReceiptTextIcon },
    { id: "earsiv", label: "GİB e-Arşiv", icon: FileCheck2Icon },
    { id: "paket", label: "Paket kanalları", icon: BikeIcon },
    { id: "odeme", label: "Kart ve QR ödeme", icon: CreditCardIcon },
    { id: "mutfak", label: "Mutfak ekranı", icon: ChefHatIcon },
    { id: "muhasebe", label: "Muhasebe aktarımı", icon: CalculatorIcon },
];

const IntegrationBadge = () => (
    <StackBadge items={BUNDLED_INTEGRATIONS} label="Kutudan çıkan entegrasyonlar" />
);

export default IntegrationBadge;
