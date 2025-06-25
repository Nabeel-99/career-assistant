import { signOutAction } from "@/lib/action";
import React from "react";
import { IoMdLogOut } from "react-icons/io";

const LogoutBtn = () => {
  return (
    <>
      <form className="" action={signOutAction}>
        <button
          type="submit"
          className="flex  hover:bg-sidebar-accent py-2 px-2 rounded-lg items-center cursor-pointer w-full gap-2"
        >
          <span className="text-xl">
            <IoMdLogOut />
          </span>
          <span className="pl-1">Logout</span>
        </button>
      </form>
    </>
  );
};

export default LogoutBtn;
