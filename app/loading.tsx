import React from "react";
import { ImSpinner9 } from "react-icons/im";

const loading = () => {
  return (
    <div className="flex h-screen justify-center items-center">
      <div className="flex flex-col gap-2 text-center justify-center items-center">
        <ImSpinner9 className="animate-spin text-xl" />
        <p>Loading</p>
      </div>
    </div>
  );
};

export default loading;
