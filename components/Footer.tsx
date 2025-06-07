import Link from "next/link";
import React from "react";
import { FaGithub } from "react-icons/fa";
import { GiArtificialHive } from "react-icons/gi";

const Footer = () => {
  return (
    <footer className="border-t p-10 rounded-t-4xl flex flex-col  border-[#113123] backdrop-blur-3xl">
      <div className="grid grid-cols-3 gap-10">
        <div className="">
          <GiArtificialHive className="size-24" />
        </div>
        <div className="flex flex-col gap-3">
          <p className="font-bold">Quick Links</p>
          <ul className="flex flex-col gap-4 text-subheadline">
            <li>
              <Link href={"/"} className="hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link href={"/"} className="hover:text-white">
                Features
              </Link>
            </li>
            <li>
              <Link href={"/"} className="hover:text-white">
                How it works
              </Link>
            </li>
            <li>
              <Link href={"/"} className="hover:text-white">
                FAQ
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-3">
          <p className="font-bold">Contact Us</p>
          <ul className="flex flex-col gap-4 text-subheadline">
            <li>
              <Link href={"/"} className="hover:text-white">
                <FaGithub className="size-8" />
              </Link>
            </li>
            <li>
              <Link href={"/"} className="hover:text-white">
                Features
              </Link>
            </li>
            <li>
              <Link href={"/"} className="hover:text-white">
                How it works
              </Link>
            </li>
            <li>
              <Link href={"/"} className="hover:text-white">
                FAQ
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
