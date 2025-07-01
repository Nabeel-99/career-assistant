import React from "react";

const TemplateCard = () => {
  return (
    <div className="flex flex-col border rounded gap-2">
      <div className="w-full overflow-clip max-h-[400px] rounded bg-white p-2 flex items-center justify-center">
        resume text here
      </div>
      <p>Template Name</p>
    </div>
  );
};

export default TemplateCard;
