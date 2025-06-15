"use client";

import Faq from "@/components/sections/Faq";
import Features from "@/components/sections/Features";
import Hero from "@/components/sections/Hero";
import HowItWorks from "@/components/sections/HowItWorks";
import Testimonials from "@/components/sections/Testimonials";
import { motion } from "motion/react";
export default function Home() {
  return (
    <div className="flex flex-col  w-full gap-10">
      {/* hero */}
      <section id="hero" className="relative   mt-20 pb-10 lg:mt-0">
        <div className="absolute mask-t-from-50% mask-radial-[50%_90%] mask-radial-from-80% bg-hero top-0 -z-20 left-0 right-0 h-full"></div>
        <Hero />
        <div className="absolute bottom-0 h-40  lg:h-[500px]   left-0 right-0 bg-gradient-to-b from-transparent to-70% to-[#0a0a0a] "></div>
      </section>
      {/* features */}
      <section
        id="features"
        className="pb-10 px-4 relative  lg:px-20 2xl:container 2xl:mx-auto"
      >
        <div className="absolute overflow-hidden 2xl:overflow-visible  inset-0 -z-10 ">
          <motion.div
            initial={{ opacity: 0.1 }}
            whileInView={{
              opacity: 0.5,
            }}
            transition={{
              duration: 1.5,
              ease: "easeInOut",
              delay: 0.2,
            }}
            className="absolute top-1/2 border  bg-radial-[at_75%_25%]  from-[#0d828a] from-50% to-[#232aea] w-[600px] h-[100px] rounded-full rotate-45 blur-[70px] left-0"
          />
          <motion.div
            initial={{ opacity: 0.1 }}
            whileInView={{
              opacity: 0.5,
            }}
            transition={{
              duration: 1.5,
              ease: "easeInOut",
              delay: 0.2,
            }}
            className="absolute top-1/2 bg-radial-[at_25%_75%]  from-[#232aea] to-50% to-[#0d828a] w-[600px] h-[100px] rounded-full -rotate-45 blur-[70px] right-0"
          />
        </div>
        <Features />
      </section>
      {/* how it works */}
      <section
        id="how-it-works"
        className="pb-10 px-4  lg:px-20 2xl:container 2xl:mx-auto"
      >
        <HowItWorks />
      </section>
      {/* testimonials */}
      <section
        id="testimonials"
        className="pb-10 px-4  relative lg:px-20 w-full "
      >
        <div className="absolute top-32  bg-radial-[at_75%_50%] opacity-25 from-[#343333] from-50% to-[#343333] w-[400px] h-[100px] rounded-full  blur-[90px] -translate-x-1/2 -translate-y-1/12 -z-40 left-1/2"></div>
        <Testimonials />
      </section>
      {/* faq */}
      <section
        id="faq"
        className="pb-40 lg:pb-60 px-6 mt-10 lg:mt-20 lg:px-20 2xl:container 2xl:mx-auto"
      >
        <Faq />
      </section>
    </div>
  );
}
