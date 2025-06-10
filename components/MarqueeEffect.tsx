"use client";

import React from "react";
import { motion } from "motion/react";
const MarqueeEffect = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex gap-10 overflow-x-hidden">
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: "-100%" }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="flex shrink-0 gap-10 overflow-hidden"
      >
        {children}
      </motion.div>
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: "-100%" }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="flex shrink-0 gap-10 overflow-hidden"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default MarqueeEffect;
