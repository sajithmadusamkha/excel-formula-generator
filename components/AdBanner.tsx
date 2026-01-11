"use client";

import { useEffect, useRef, useState } from "react";

export function AdBanner() {
  const adRef = useRef<HTMLDivElement>(null);
  const isLoaded = useRef(false);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    // Detect screen size on client
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    // Wait until we know the screen size
    if (isMobile === null) return;
    if (isLoaded.current) return;
    if (!adRef.current) return;

    isLoaded.current = true;

    if (isMobile) {
      // Mobile ad (320x50)
      (window as any).atOptions = {
        key: "130f35a3e5d5ba7dccd0afa6e38a1277",
        format: "iframe",
        height: 50,
        width: 320,
        params: {},
      };

      const script = document.createElement("script");
      script.src =
        "https://creeduserbane.com/130f35a3e5d5ba7dccd0afa6e38a1277/invoke.js";
      script.async = true;
      adRef.current.appendChild(script);
    } else {
      // Desktop ad (728x90)
      (window as any).atOptions = {
        key: "950543de0757806ac8fb8588c453adf5",
        format: "iframe",
        height: 90,
        width: 728,
        params: {},
      };

      const script = document.createElement("script");
      script.src =
        "https://creeduserbane.com/950543de0757806ac8fb8588c453adf5/invoke.js";
      script.async = true;
      adRef.current.appendChild(script);
    }
  }, [isMobile]);

  return (
    <div
      ref={adRef}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: isMobile ? "50px" : "90px",
        maxWidth: isMobile ? "320px" : "728px",
        margin: "0 auto",
        overflow: "hidden",
      }}
    />
  );
}
