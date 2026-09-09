import { FEATURES } from "@/constants";
import { cn } from "@/lib";
import Container from "../global/container";
import { FEATURE_VISUALS } from "../ui/feature-visuals";
import { MagicCard } from "../ui/magic-card";

const Features = () => {
    return (
        <div className="relative flex flex-col items-center justify-center w-full py-20">
            <Container>
                <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
                    <h2 className="text-2xl md:text-4xl lg:text-5xl font-heading font-normal !leading-snug mt-6">
                        Servisin her adımı <br /> tek akışta
                    </h2>
                    <p className="text-base md:text-lg text-center text-accent-foreground/80 mt-6">
                        Misafir masaya oturduğu andan hesabı kapattığı ana kadar bütün adımlar aynı sistemde. Garson, mutfak ve kasa aynı veriyi görür.
                    </p>
                </div>
            </Container>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 relative overflow-visible">

                {FEATURES.map((feature, index) => (
                    <Container key={feature.title} delay={0.1 + index * 0.1} className={cn(
                        "relative flex flex-col rounded-2xl lg:rounded-3xl bg-card border border-border/50 hover:border-border/100 transition-colors",
                        index === 3 && "lg:col-span-2",
                        index === 2 && "md:col-span-2 lg:col-span-1",
                    )}>
                        <MagicCard
                            gradientFrom="#E4D085"
                            gradientTo="#EB9977"
                            className="p-4 lg:p-6 lg:rounded-3xl"
                            gradientColor="rgba(235,153,119,0.12)"
                        >
                            <div className="flex items-center space-x-4 mb-4">
                                <h3 className="text-xl font-medium flex items-center gap-2">
                                    <feature.icon className="size-5 text-primary" />
                                    {feature.title}
                                </h3>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                {feature.description}
                            </p>

                            <div className="mt-6 w-full overflow-hidden">
                                {(() => {
                                    const Visual = FEATURE_VISUALS[feature.visual];
                                    return Visual ? <Visual /> : null;
                                })()}
                            </div>
                        </MagicCard>
                    </Container>
                ))}
            </div>
        </div>
    )
};

export default Features
