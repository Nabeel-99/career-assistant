import React from "react";

type CardProps = {
  title: string;
  description: string;
  icon?: any;
};
const FeatureCard = ({ title, description, icon }: CardProps) => {
  return (
    <div className="bg-radial-[at_50%_0%]  min-h-[240px] rounded-2xl  lg:h-[200px] from-white/50 to-[#0a0a0a] to-[40%] p-[0.5px]  ">
      <div className="bg-[#0a0a0a] border border-[#1f1f1f] rounded-2xl flex flex-col justify-between p-6 h-full">
        <div className="flex justify-start">
          <div className="text-4xl  border border-[#1f1f1f] p-2 rounded-full shadow-sm shadow-[#b6b6b6]">
            {icon}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <h1>{title}</h1>
          <p className="text-subheadline">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
