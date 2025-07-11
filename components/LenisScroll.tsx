"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function LenisScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    if (isSafari) return;

    const lenis = new Lenis({
      duration: 1.2,
      lerp: 0.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      gestureOrientation: "vertical",
      wheelMultiplier: 1,
      touchMultiplier: 1,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
