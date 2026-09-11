import Wrapper from "@/components/global/wrapper";
import Analysis from "@/components/marketing/analysis";
import Assistant from "@/components/marketing/assistant";
import Coverage from "@/components/marketing/coverage";
import Companies from "@/components/marketing/companies";
import CTA from "@/components/marketing/cta";
import Features from "@/components/marketing/features";
import GuestScreens from "@/components/marketing/guest-screens";
import Fiscal from "@/components/marketing/fiscal";
import Hero from "@/components/marketing/hero";
import Integration from "@/components/marketing/integration";
import Journey from "@/components/marketing/journey";
import LanguageSupport from "@/components/marketing/lang-support";
import Pricing from "@/components/marketing/pricing";
import Venues from "@/components/marketing/venues";

const HomePage = () => {
    return (
        <Wrapper className="py-20 relative">
            <Hero />
            <Companies />
            <div id="ozellikler" className="scroll-mt-24">
                <Features />
            </div>
            <GuestScreens />
            <div id="akis" className="scroll-mt-24">
                <Journey />
            </div>
            <Analysis />
            <div id="mali" className="scroll-mt-24">
                <Fiscal />
            </div>
            <div id="entegrasyonlar" className="scroll-mt-24">
                <Integration />
            </div>
            <Assistant />
            <Coverage />
            <Venues />
            <div id="fiyatlandirma" className="scroll-mt-24">
                <Pricing />
            </div>
            <LanguageSupport />
            <div id="iletisim" className="scroll-mt-24">
                <CTA />
            </div>
        </Wrapper>
    )
};

export default HomePage
