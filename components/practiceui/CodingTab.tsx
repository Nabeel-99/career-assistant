import Image from "next/image";
import React from "react";
import Orb from "../Animations/AnimatedContent/Orb";
import Link from "next/link";
import { Button } from "../ui/button";

const CodingTab = () => {
  return (
    <div className="dark-code-bg light-code-bg relative  border rounded-lg overflow-hidden min-h-[500px] md:min-h-[600px] md:max-h-[600px] h-full flex items-center w-full justify-center">
      <Orb
        hoverIntensity={0}
        hue={0}
        forceHoverState={true}
        className="hidden md:flex items-center justify-center"
      />
      {/* <div className="absolute  top-1/2 left-0 w-[300px] h-[300px] rounded-full rotate-45 blur-[70px] bg-radial-[at_75%_25%] from-[#fcfcfc] dark:from-[#0a0a0a] from-0% to-[#d8c1f6] dark:to-[#5227FF] to-100%"></div>
    <div className="absolute -top-10 -right-20 w-[300px] h-[300px] rounded-full rotate-45 blur-[100px] bg-radial-[at_75%_25%] from-[#fcfcfc] dark:from-[#0a0a0a] from-0% to-[#d8c1f6] dark:to-[#5227FF]  to-100%"></div> */}
      <div className="md:absolute md:-translate-x-1/2 md:-translate-y-1/2 md:top-1/2 md:left-1/2 flex flex-col  gap-2 items-center">
        <Image
          src={"/codingicon.webp"}
          width={200}
          height={200}
          alt="coding icon"
        />
        <h2 className="text-2xl font-bold">AI-Powered Coding Room</h2>
        <p className="text-center">
          Get challenges generated just for <br /> you and code in real time.
        </p>
        <Link href={"/practice/coding"}>
          <Button className="mt-4">Enter Room</Button>
        </Link>
      </div>
    </div>
  );
};

export default CodingTab;
