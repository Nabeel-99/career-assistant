import React from "react";

type IconProps = {
  title: string;
  description: any;
  icon: any;
  hide?: boolean;
};
const IconCard = ({ title, description, icon, hide }: IconProps) => {
  return (
    <div className="flex flex-col  pt-10 items-center justify-center  xl:flex-row xl:items-start xl:justify-start px-2 gap-8 pb-8">
      <div className="flex flex-col gap-8 items-center justify-center">
        <div className="border rounded-2xl border-[#1f1f1f] shadow-sm shadow-[#b6b6b6]  p-2">
          {icon}
        </div>
        {/* {!hide && (
          <div className="max-xl:hidden w-1 h-32 rounded-xl bg-gray-50"></div>
        )}
        <div className="xl:hidden w-1 h-32 rounded-xl bg-gray-50"></div> */}
      </div>
      <div className="flex flex-col items-center justify-center text-center xl:text-left xl:items-start xl:justify-start gap-3">
        <h1 className="font-extrabold text-5xl ">{title}</h1>
        <div className="text-subheadline text-xl">{description}</div>
      </div>
    </div>
  );
};

export default IconCard;
