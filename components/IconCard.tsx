import React from "react";

type IconProps = {
  title: string;
  description: string;
  icon: any;
  hide?: boolean;
};
const IconCard = ({ title, description, icon, hide }: IconProps) => {
  return (
    <div className="flex flex-col  items-center justify-center  xl:flex-row xl:items-start xl:justify-start px-2 gap-8 pb-8">
      <div className="flex flex-col gap-8 items-center justify-center">
        <div className="border rounded-2xl border-[#1f1f1f] shadow-sm shadow-[#b6b6b6]  p-2">
          {icon}
        </div>
        {!hide && (
          <div className="max-xl:hidden w-1 h-32 rounded-xl bg-gray-50"></div>
        )}
        <div className="xl:hidden w-1 h-32 rounded-xl bg-gray-50"></div>
      </div>
      <div className="flex flex-col items-center justify-center text-center xl:text-left xl:items-start xl:justify-start gap-1">
        <h1 className="font-bold">{title}</h1>
        <p className="text-subheadline">{description}</p>
      </div>
    </div>
  );
};

export default IconCard;
