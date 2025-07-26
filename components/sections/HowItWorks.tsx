"use client";

import React from "react";
import StepsCards from "../Steps";
import FadeContent from "../Animations/FadeContent/FadeContent";
import AnimatedContent from "../Animations/AnimatedContent/AnimatedContent";

const HowItWorks = () => {
  return (
    <AnimatedContent
      distance={40}
      direction="vertical"
      reverse={false}
      duration={1.2}
      ease="power3.out"
      initialOpacity={0}
      animateOpacity
      scale={1}
      threshold={0.2}
      delay={0.3}
      className=" flex flex-col gap-6 items-center"
    >
      <h3 className="shadow-sm shadow-[#b6b6b6] border-[#1f1f1f] px-4 py-2 border-2 rounded-4xl">
        How it works
      </h3>
      <FadeContent
        blur={true}
        easing="ease-out"
        initialOpacity={0}
        delay={0.5}
        className="flex flex-col gap-6 items-center"
      >
        <h3 className="text-3xl lg:text-5xl text-center">
          Smarter career preparation powered <br className="max-lg:hidden" /> by
          AI, designed for success.
        </h3>
        <p className="text-base lg:text-lg max-w-lg text-center text-subheadline">
          From uploading your resume to mastering interviews,{" "}
          <br className="max-lg:hidden" /> every step is seamless and
          purposeful.
        </p>
      </FadeContent>

      <div className="flex flex-col items-center gap-10 lg:gap-44  mt-20 ">
        <StepsCards />
      </div>
    </AnimatedContent>
  );
};

export default HowItWorks;
