import { signOutAction } from "@/lib/action";
import React from "react";
import { IoMdLogOut } from "react-icons/io";

const LogoutBtn = () => {
  return (
    <>
      <div
        className="flex items-center cursor-pointer w-full gap-2"
        onClick={signOutAction}
      >
        <span className="text-xl">
          {" "}
          <IoMdLogOut />
        </span>

        <span className="pl-1">Logout</span>
      </div>
    </>
  );
};

export default LogoutBtn;
