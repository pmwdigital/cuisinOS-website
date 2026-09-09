import Link from "next/link";
import Container from "../global/container";
import Icons from "../global/icons";

const COLUMNS = [
    {
        title: "Özellikler",
        links: [
            { label: "QR menü ve sipariş", href: "#ozellikler" },
            { label: "Mutfak ekranı", href: "#ozellikler" },
            { label: "Kasa ve adisyon", href: "#ozellikler" },
            { label: "Asistan", href: "#ozellikler" },
        ],
    },
    {
        title: "Ürün",
        links: [
            { label: "Fiyatlandırma", href: "#fiyatlandirma" },
            { label: "Mali entegrasyon", href: "#mali" },
            { label: "Entegrasyonlar", href: "#entegrasyonlar" },
            { label: "Çok şubeli işletmeler", href: "#entegrasyonlar" },
            { label: "Demo isteyin", href: "#iletisim" },
        ],
    },
    {
        title: "Şirket",
        links: [
            { label: "Hakkımızda", href: "#" },
            { label: "Ekip", href: "#" },
            { label: "Kariyer", href: "#" },
            { label: "İletişim", href: "#iletisim" },
        ],
    },
    {
        title: "Kaynaklar",
        links: [
            { label: "Kurulum rehberi", href: "#" },
            { label: "Destek", href: "#" },
            { label: "Sistem durumu", href: "#" },
            { label: "Gizlilik", href: "#" },
            { label: "Kullanım şartları", href: "#" },
        ],
    },
];

const SOCIALS = [
    { label: "LinkedIn", icon: Icons.linkedin, href: "#" },
    { label: "X", icon: Icons.x, href: "#" },
    { label: "Instagram", icon: Icons.insta, href: "#" },
];

const Footer = () => {
    return (
        <footer className="relative mx-auto w-full max-w-6xl border-t border-border px-6 pb-0 pt-16 lg:px-8 lg:pt-28">
            <Container>
                <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4">
                    {COLUMNS.map((column) => (
                        <div key={column.title}>
                            <h3 className="font-heading text-lg font-normal text-foreground">{column.title}</h3>
                            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                                {column.links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="transition-colors duration-200 hover:text-foreground"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </Container>

            <Container delay={0.15}>
                <div className="mt-16 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-4">
                        {SOCIALS.map((social) => (
                            <Link
                                key={social.label}
                                href={social.href}
                                aria-label={social.label}
                                className="text-muted-foreground transition-colors duration-200 hover:text-foreground"
                            >
                                <social.icon className="size-4" />
                            </Link>
                        ))}
                    </div>
                    <p className="text-sm text-muted-foreground">
                        &copy; CuisinOS, {new Date().getFullYear()}
                    </p>
                </div>
            </Container>

            <div className="footer relative mt-14 w-full overflow-hidden lg:mt-20">
                <div className="flex translate-y-[14%] items-center justify-center gap-[0.06em] whitespace-nowrap">
                    <Icons.icon className="h-[0.72em] w-auto shrink-0 text-foreground" style={{ fontSize: "min(15.5vw, 9.5rem)" }} />
                    <span
                        className="font-heading font-normal leading-[0.82] tracking-[-0.05em] text-foreground"
                        style={{ fontSize: "min(15.5vw, 9.5rem)" }}
                    >
                        CuisinOS
                    </span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
