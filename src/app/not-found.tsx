import Container from "@/components/global/container";
import Wrapper from "@/components/global/wrapper";
import { Button } from "@/components/ui/button";
import { generateMetadata } from "@/utils";
import { ArrowLeftIcon } from "lucide-react";
import Link from 'next/link';

export const metadata = generateMetadata({
    title: "404",
    description: "Aradığınız sayfa bulunamadı ya da taşınmış olabilir.",
    noIndex: true,
});

const NotFoundPage = () => {
    return (
        <main className="relative flex flex-col items-center justify-center px-4 h-dvh">
            <Wrapper>
                <Container className="flex flex-col items-center justify-center mx-auto py-16">
                    <div className="flex items-center justify-center h-full flex-col">
                        <span className="text-sm px-3.5 py-1 rounded-md bg-gradient-to-br from-lemon to-grapefruit text-chocolate custom-shadow">
                            404
                        </span>
                        <h1 className="text-3xl md:text-5xl font-bold mt-5">
                            Sayfa bulunamadı
                        </h1>
                        <p className="text-base text-muted-foreground mt-5 text-center mx-auto max-w-xl">
                            Bu sayfa yok. Adresi kontrol edip tekrar deneyin.
                        </p>
                        <Link href="/">
                            <Button variant="subtle" className="mt-8">
                                <ArrowLeftIcon className="size-4" />
                                Ana sayfa
                            </Button>
                        </Link>
                    </div>
                </Container>
            </Wrapper>
        </main>
    )
};

export default NotFoundPage;
