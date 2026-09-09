import { SUPPORTED_LANGUAGES } from "@/constants/countries";
import { Plus } from "lucide-react";
import Container from "../global/container";

const LanguageSupport = () => {
    return (
        <div className="relative mx-auto flex max-w-5xl flex-col items-center justify-center py-20">
            <Container>
                <div className="mx-auto flex w-full max-w-3xl flex-col items-center justify-center text-center">
                    <span className="rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
                        Çok dilli menü
                    </span>
                    <h2 className="mt-5 font-heading text-2xl font-normal !leading-snug md:text-4xl lg:text-5xl">
                        Menünüz misafirin dilinde
                    </h2>
                    <p className="mt-4 text-base text-muted-foreground md:text-lg">
                        Misafir QR kodu okuttuğunda menü telefonunun diline göre açılır. Kalem adları,
                        açıklamalar ve alerjen notları aynı kayıttan çevrilir, ayrı menü hazırlamanız gerekmez.
                    </p>
                </div>
            </Container>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 items-start justify-start max-w-4xl mx-auto pt-10 relative w-full">

                <div className="absolute top-1/2 -translate-y-1/2 right-1/4 w-3/5 h-14 lg:h-20 bg-gradient-to-r from-grapefruit to-mint rounded-full -rotate-12 blur-[10rem] -z-10"></div>

                {SUPPORTED_LANGUAGES.map((language, idx) => (
                    <Container
                        key={language.code}
                        delay={0.05 * idx}
                        className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors h-auto"
                    >
                        <span className="text-2xl">{language.flag}</span>
                        <span className="text-lg lg:text-xl">{language.name}</span>
                    </Container>
                ))}
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-muted">
                        <Plus size={14} />
                    </span>
                    <span>ve dahası</span>
                </div>
            </div>
        </div>
    )
};

export default LanguageSupport
