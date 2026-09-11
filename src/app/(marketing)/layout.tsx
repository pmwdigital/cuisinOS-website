import Footer from "@/components/marketing/footer";
import Navbar from "@/components/marketing/navbar";
import SiteCursor from "@/components/global/site-cursor";
import React from 'react';

interface Props {
    children: React.ReactNode
}

const MarketingLayout = ({ children }: Props) => {
    return (
        <>
            <SiteCursor />
            <Navbar />
            <main className="mx-auto w-full z-40 relative">
                {children}
            </main>
            <Footer />
        </>
    );
};

export default MarketingLayout
