"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";

import DashboardImage from "../../public/dashboard.svg";
import AnimatedContent from "../Animations/AnimatedContent/AnimatedContent";
import { motion, useScroll, useTransform } from "motion/react";
const Hero = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const scrollProgress = useTransform(scrollY, (value) => {
    if (sectionRef.current) {
      const sectionHeight = sectionRef.current.clientHeight;
      const scrollingPosition = value / sectionHeight;
      return Math.min(Math.max(scrollingPosition, 0), 1);
    }
    return 0;
  });
  const rotateX = useTransform(scrollProgress, [0.2, 1], [0, 45]);

  return (
    <div className="mt-10  px-2 z-20  flex flex-col gap-6 items-center">
      <AnimatedContent
        distance={50}
        reverse={false}
        duration={1.2}
        ease="power3.out"
        initialOpacity={0.2}
        animateOpacity
        scale={1.1}
        threshold={0.2}
        delay={0.3}
      >
        <h1 className="text-5xl lg:text-7xl font-extrabold text-center">
          AI-Powered <br /> Career Assistant
        </h1>
      </AnimatedContent>
      <AnimatedContent
        distance={50}
        reverse={false}
        duration={1.2}
        ease="power3.out"
        initialOpacity={0}
        animateOpacity
        scale={1.1}
        threshold={0.2}
        delay={0.6}
        className="flex flex-col items-center justify-center"
      >
        <p className="text-base text-subheadline lg:text-lg max-w-lg text-center">
          Generate a tailored CV, optimize it for any job, and practice
          interviews. Land your next job smarter and faster.
        </p>
        <Link href={"/login"} className="mt-4 sign-up-btn  ">
          Get Started
        </Link>
      </AnimatedContent>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.3 }}
        transition={{
          duration: 0.5,
          delay: 0.8,
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[300px] blur-[100px] md:h-[700px] md:w-[700px] lg:h-[900px] lg:w-[900px]   -z-10 rounded-full bg-gradient-to-t from-[#0a0a0a] via-[#033a2c] to-[#0d828a] "
      />
      <AnimatedContent
        distance={150}
        reverse={false}
        duration={0.8}
        ease="power3.out"
        initialOpacity={0}
        animateOpacity
        scale={1}
        threshold={0.1}
        delay={0.5}
        className=" px-2 "
      >
        <div
          ref={sectionRef}
          className="perspective-distant hidden md:block mt-10  max-lg:overflow-hidden"
        >
          <motion.div style={{ rotateX }}>
            <Image
              src={DashboardImage}
              width={1100}
              height={1100}
              alt="ai"
              className={`relative border  rounded-md transform-3d rotate-x-${rotateX} `}
            />
          </motion.div>
        </div>
        <Image
          src={DashboardImage}
          width={1100}
          height={1100}
          alt="ai"
          className=" md:hidden relative border rounded-md "
        />
      </AnimatedContent>
    </div>
  );
};

export default Hero;
