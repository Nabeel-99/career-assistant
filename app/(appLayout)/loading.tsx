import React from "react";
import { ImSpinner9 } from "react-icons/im";

const loading = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <ImSpinner9 className="animate-spin text-xl" />
    </div>
  );
};

export default loading;
