"use client";

import { useEffect, useState } from "react";
import { Cursor } from "../ui/cursor";

const BrandPointer = () => (
    <svg width="22" height="26" viewBox="0 0 26 31" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            fill="#E47D55"
            fillRule="evenodd"
            stroke="#FAF8F5"
            strokeLinecap="square"
            strokeWidth={2}
            d="M21.993 14.425 2.549 2.935l4.444 23.108 4.653-10.002z"
            clipRule="evenodd"
        />
    </svg>
);

const SiteCursor = () => {
    const [enabled, setEnabled] = useState(false);

    useEffect(() => {
        const query = window.matchMedia("(pointer: fine)");
        const update = () => setEnabled(query.matches);
        update();
        query.addEventListener("change", update);
        return () => query.removeEventListener("change", update);
    }, []);

    useEffect(() => {
        if (!enabled) return;
        const root = document.documentElement;
        root.classList.add("custom-cursor");
        return () => root.classList.remove("custom-cursor");
    }, [enabled]);

    if (!enabled) return null;

    return (
        <Cursor
            variants={{
                initial: { scale: 0.4, opacity: 0 },
                animate: { scale: 1, opacity: 1 },
                exit: { scale: 0.4, opacity: 0 },
            }}
            transition={{ ease: "easeInOut", duration: 0.15 }}
            className="z-[100]"
        >
            <BrandPointer />
        </Cursor>
    );
};

export default SiteCursor;
