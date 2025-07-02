import React from "react";

const TemplateCard = () => {
  return (
    <div className="flex flex-col  rounded gap-2">
      <div className="w-full aspect-[3/4] overflow-clip max-h-[400px] rounded bg-white p-2 flex items-center justify-center">
        <img
          src={"/templateone.png"}
          alt="template-one"
          className="h-full w-full object-top object-cover"
        />
      </div>
      <p>Template Name</p>
    </div>
  );
};

export default TemplateCard;
