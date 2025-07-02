import Link from "next/link";
import React from "react";
import { PiCaretRightBold } from "react-icons/pi";

type NavButtonProps = {
  url: string;
  icon: any;
  title: string;
  description: string;
};

const NavButton = ({ url, icon, title, description }: NavButtonProps) => {
  return (
    <Link
      href={url}
      className="border flex hover:bg-sidebar-accent dark:hover:bg-[#1f1f1f] transition-all duration-300 ease-in-out py-4 px-4 items-center justify-between dark:border-[#343333] dark:bg-[#151515] p-2 rounded-lg"
    >
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center p-2 border dark:border-[#343333] dark:bg-[#1f1f1f] rounded-md">
          {icon}
        </div>
        <div className="flex flex-col">
          <p>{title}</p>
          <p className="text-sm text-subheadline">{description}</p>
        </div>
      </div>
      <div className="">
        <PiCaretRightBold className="size-6 text-subheadline" />
      </div>
    </Link>
  );
};

export default NavButton;
