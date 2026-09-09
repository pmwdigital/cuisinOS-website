# CuisinOS tanıtım sitesi

CuisinOS restoran yönetim platformunun Türkçe tanıtım sitesi. Next.js 15 App Router,
Tailwind CSS ve framer-motion ile yazıldı, tamamen statik olarak derlenir.

## Bölümler

| Bölüm | İçerik |
| --- | --- |
| Hero | Salon görünümü panosu, kutudan çıkan entegrasyon rozeti |
| Bağlantılar | Kurulumda hazır gelen entegrasyonların listesi |
| Özellikler | QR menü, mutfak ekranı, kasa, mali entegrasyon, asistan |
| Analiz | Gün içi ciro ve servis performansı kartları |
| Mali entegrasyon | Yazarkasa köprüsü, gün içi fiş dağılımı, e-Arşiv kuyruğu, mali fiş tablosu |
| Asistan | Servis verisine bağlı örnek konuşma ve bildirim yığını |
| Entegrasyonlar | Kanalların merkeze bağlandığı animasyonlu akış grafiği |
| Şubeler | Şehir işaretli döndürülebilir küre |
| Fiyatlandırma | Aylık ve yıllık plan karşılaştırması |
| İletişim | Akış tuvali arka planlı çağrı bölümü |

## Kurulum

```bash
npm install --legacy-peer-deps
npm run dev
```

Site `http://localhost:3000` adresinde açılır.

`--legacy-peer-deps` gerekiyor çünkü `cmdk@1.0.0` React 18 talep ediyor, proje React 19
kullanıyor. Sürüm yükseltilene kadar bu bayrak kalmalı.

## Derleme

```bash
npm run build
```

## Tipografi

Gövde ve başlık fontu [Stack Sans Text](https://fonts.google.com/specimen/Stack+Sans+Text).
Woff2 dosyaları `public/fonts` altında yerel olarak duruyor, dışarıya font isteği gitmiyor.
İtalik vurgular Instrument Serif ile veriliyor.

## Veri hakkında

Sitedeki pano, grafik ve tablolar tasarım amaçlı örnek ekranlardır ve her birinin
üzerinde "Örnek ekran" etiketi bulunur. Canlı sistemden çekilen veri içermezler.

## Kaynak

Sayfa iskeleti [Vetra](https://github.com/Shreyas-29/vetra) şablonundan türetildi.
Şablon MIT lisanslıdır, telif notu `LICENSE` dosyasında korunmaktadır. Ayrıntı için
`ATTRIBUTION.md` dosyasına bakın. Şablonun görselleri, logoları ve fontları kaldırıldı,
yerlerine CuisinOS için yazılmış bileşenler kondu.
