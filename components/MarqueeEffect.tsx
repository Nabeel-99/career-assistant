"use client";

import React, { useRef } from "react";
import { motion, useAnimationFrame } from "motion/react";
const MarqueeEffect = ({ children }: { children: React.ReactNode }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const x = useRef(0);
  const speedRef = useRef(0.4);

  useAnimationFrame((_, delta) => {
    if (!contentRef.current) return;

    x.current -= (speedRef.current * delta) / 10;

    const totalWidth = contentRef.current.offsetWidth / 2;
    if (Math.abs(x.current) >= totalWidth) {
      x.current = 0;
    }
    contentRef.current.style.transform = `translateX(${x.current}px)`;
  });
  const handleMouseEnter = () => {
    speedRef.current = 0.1;
  };
  const handleMouseLeave = () => {
    speedRef.current = 0.4;
  };
  return (
    <div
      className="flex gap-6 "
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="flex h-full  gap-6 "
        ref={contentRef}
        style={{ willChange: "transform" }}
      >
        <div className="flex h-full gap-6">{children}</div>
        <div className="flex h-full gap-6">{children}</div>
      </div>
    </div>
  );
};

export default MarqueeEffect;
