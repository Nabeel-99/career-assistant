import { Template } from "@/lib/types";
import React from "react";

const TemplateCard = ({ template }: { template: Template }) => {
  console.log("template name", template.name);
  return (
    <div className="flex flex-col  rounded gap-2">
      <div className="w-full aspect-[3/4] border overflow-clip max-h-[400px] rounded bg-white hover:border-2 transition-all duration-300 ease-in-out hover:border-gray-400 p-2 flex items-center justify-center">
        <img
          src={template.image}
          alt={template.name}
          className="h-full w-full object-top object-cover"
        />
      </div>
      <p>{template.name}</p>
    </div>
  );
};

export default TemplateCard;
