import React from "react";
import FadeContent from "../Animations/FadeContent/FadeContent";

type IconProps = {
  title: any;
  description: any;
  icon: any;
  hide?: boolean;
};
const IconCard = ({ title, description, icon, hide }: IconProps) => {
  return (
    <div className="flex flex-col  lg:pt-10 items-center justify-center  xl:flex-row xl:items-start xl:justify-start px-2 gap-8 pb-8">
      <div className="flex flex-col gap-8 items-center justify-center">
        <div className="border rounded-2xl border-[#1f1f1f] shadow-sm shadow-[#b6b6b6]  p-2">
          {icon}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center text-center xl:text-left xl:items-start xl:justify-start gap-3">
        <FadeContent
          blur={true}
          easing="ease-out"
          initialOpacity={0}
          className="flex flex-col gap-3"
        >
          <div className="font-extrabold text-3xl md:text-5xl ">{title}</div>
          <div className="text-subheadline md:text-xl">{description}</div>
        </FadeContent>
      </div>
    </div>
  );
};

export default IconCard;
