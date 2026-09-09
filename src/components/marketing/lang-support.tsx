import { SUPPORTED_LANGUAGES } from "@/constants/countries";
import { Plus } from "lucide-react";
import Container from "../global/container";

const LanguageSupport = () => {
    return (
        <div className="relative flex flex-col items-center justify-center max-w-5xl py-20 mx-auto">
            <Container>
                <div className="flex flex-col items-center justify-center w-full max-w-3xl mx-auto text-center">
                    <h2 className="text-2xl md:text-4xl lg:text-5xl font-heading font-normal !leading-snug mb-6">
                        Menünüz misafirin dilinde
                    </h2>
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
