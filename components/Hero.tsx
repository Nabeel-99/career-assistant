import Image from "next/image";
import Link from "next/link";
import React from "react";
import AIimage from "../public/ai.webp";
import CVimage from "../public/cv.svg";
const Hero = () => {
  return (
    <div className="mt-10   z-20  flex flex-col gap-6 items-center">
      <h1 className="text-5xl lg:text-7xl text-center">
        AI-Powered <br /> Career Assistant
      </h1>
      <p className="text-base text-subheadline lg:text-lg max-w-lg text-center">
        Generate a tailored CV, optimize it for any job, and practice
        interviews. Land your next job smarter and faster.
      </p>
      <Link href={"/"} className="mt-4 sign-up-btn  ">
        Get Started
      </Link>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[300px] blur-xl lg:h-[900px] lg:w-[900px]  -z-10 rounded-full bg-gradient-to-t from-[#0a0a0a] via-[#033a2c] to-[#0d828a] lg:blur-3xl opacity-30" />
      <div className="perspective-distant ">
        {/* <Image
          src={AIimage}
          width={400}
          height={400}
          alt="ai"
          className="border border-[#1f1f1f] rounded-2xl "
        /> */}
        <Image
          src={CVimage}
          width={800}
          height={800}
          alt="ai"
          className="relative transform-3d rotate-x-45 "
        />
      </div>
    </div>
  );
};

export default Hero;
