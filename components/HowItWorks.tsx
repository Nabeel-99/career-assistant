import React from "react";
import StepsCard from "./StepsCard";

const HowItWorks = () => {
  return (
    <div className=" flex flex-col gap-6 items-center">
      <h1 className="shadow-sm shadow-[#b6b6b6] border-[#1f1f1f] px-4 py-2 border-2 rounded-4xl">
        How it works
      </h1>
      <h1 className="text-3xl lg:text-5xl text-center">
        Smarter career preparation powered <br className="max-lg:hidden" /> by
        AI, designed for success.
      </h1>
      <p className="text-base lg:text-lg max-w-lg text-center text-subheadline">
        From uploading your resume to mastering interviews,{" "}
        <br className="max-lg:hidden" /> every step is seamless and purposeful.
      </p>
      <div className="flex flex-col items-center gap-10 lg:gap-44  mt-20 ">
        <StepsCard />
      </div>
    </div>
  );
};

export default HowItWorks;
