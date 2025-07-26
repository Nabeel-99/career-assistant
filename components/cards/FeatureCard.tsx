"use client";

import React from "react";
import { motion } from "motion/react";
import TiltedCard from "../Components/TiltedCard/TiltedCard";
type CardProps = {
  title: string;
  description: string;
  icon?: any;
  delay?: number;
};
const FeatureCard = ({ title, description, icon, delay }: CardProps) => {
  return (
    <>
      {/* large screen */}
      <TiltedCard
        rotateAmplitude={10}
        scaleOnHover={1}
        className="hidden cursor-pointer md:block"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay,
          }}
          viewport={{ once: true, amount: 0.5 }}
          className="bg-radial-[at_50%_0%]  h-[240px] rounded-2xl  lg:min-h-[240px] lg:h-[200px] from-white/50 to-[#0a0a0a] to-[40%] p-[0.5px]  "
        >
          <div className="bg-[#0a0a0a] border border-[#1f1f1f] rounded-2xl flex flex-col justify-between p-6 h-full">
            <div className="flex justify-start">
              <div className="text-4xl  border border-[#1f1f1f] p-2 rounded-full shadow-sm shadow-[#b6b6b6]">
                {icon}
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <h3>{title}</h3>
              <p className="text-subheadline">{description}</p>
            </div>
          </div>
        </motion.div>
      </TiltedCard>

      {/* small screen */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay,
        }}
        viewport={{ once: true }}
        className="bg-radial-[at_50%_0%]   min-h-[240px] rounded-2xl  lg:h-[200px] from-white/50 to-[#0a0a0a] to-[40%] p-[0.5px]  md:hidden "
      >
        <div className="bg-[#0a0a0a] border border-[#1f1f1f] rounded-2xl flex flex-col justify-between p-6 h-full">
          <div className="flex justify-start">
            <div className="text-4xl  border border-[#1f1f1f] p-2 rounded-full shadow-sm shadow-[#b6b6b6]">
              {icon}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <h3>{title}</h3>
            <p className="text-subheadline">{description}</p>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default FeatureCard;
