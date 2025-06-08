import Link from "next/link";
import React from "react";
import { FaGithub } from "react-icons/fa";

type SocialIconProps = {
  title: string;
  icon: any;
  to?: string;
};
const SocialIcon = ({ title, icon, to }: SocialIconProps) => {
  return (
    <li className=" border-2 p-2 px-4 rounded-xl bg-gradient-to-tr cursor-pointer from-[#343333] transition-colors duration-300 to-[#0a0a0a] hover:from-[#0a0a0a] hover:text-white ">
      <Link
        href="https://github.com"
        target="_blank"
        className="flex items-center gap-2"
      >
        {icon}
        <span className="lg:text-3xl font-bold"> {title}</span>
      </Link>
    </li>
  );
};

export default SocialIcon;
