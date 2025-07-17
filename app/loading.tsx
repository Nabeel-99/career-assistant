import React from "react";
import { GiArtificialHive } from "react-icons/gi";

const Loading = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-black text-white">
      <div className="relative flex flex-col items-center justify-center gap-4">
        <div className="absolute w-32 h-32 rounded-full bg-gradient-to-b from-[#0d828a] from-60%  to-[#613e05] to-20% blur-2xl opacity-70 animate-pulse-glow" />
        <GiArtificialHive className="relative z-10 text-5xl animate-logo-pulse" />
        <p className="text-sm font-extrabold text-gray-300 mt-2  animate-fade-in">
          Getting things ready...
        </p>
      </div>
    </div>
  );
};

export default Loading;
