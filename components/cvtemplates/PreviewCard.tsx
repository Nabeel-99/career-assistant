import React from "react";

const PreviewCard = () => {
  return (
    <div className="w-full  overflow-y-auto max-h-[650px] rounded bg-white p-2 hide-scrollbar">
      <img src={"/templateone.png"} alt="template-one" className=" w-full " />
    </div>
  );
};

export default PreviewCard;
