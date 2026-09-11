"use client";

import { ScrollMorphGallery } from "../ui/scroll-morph-gallery";

const PLATES = Array.from({ length: 12 }, (_, index) =>
    `/food/tabak-${String(index + 1).padStart(2, "0")}.webp`
);

const MenuGallery = () => {
    return (
        <ScrollMorphGallery
            images={PLATES}
            introTitle="Menünüz sizin vitriniz"
            introHint="Kaydırarak açın"
            title="Her tabak tek kayıtta"
            description="Fotoğraf, açıklama, fiyat ve alerjen aynı kayıtta durur. Menüyü panelden güncellersiniz, QR menü, paket kanalları ve kasa aynı anda yeni hâlini görür."
        />
    );
};

export default MenuGallery;
