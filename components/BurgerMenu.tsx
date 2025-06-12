"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { TbMenu } from "react-icons/tb";
import { VscChromeClose } from "react-icons/vsc";

const BurgerMenu = () => {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const openMenu = () => setIsBurgerOpen((prev) => !prev);
  const closeMenu = () => setIsBurgerOpen(false);
  useEffect(() => {
    if (isBurgerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isBurgerOpen]);
  return (
    <>
      <div className=" lg:hidden text-2xl border border-[#1f1f1f] p-2 flex items-center justify-center rounded-full">
        {isBurgerOpen ? (
          <button title="close" onClick={closeMenu}>
            {" "}
            <VscChromeClose />
          </button>
        ) : (
          <button title="open" onClick={openMenu}>
            {" "}
            <TbMenu />
          </button>
        )}
      </div>
      {isBurgerOpen && (
        <div className="absolute top-16 lg:hidden inset-0 bg-[#0a0a0a] z-50 h-screen right-0 left-0">
          <ul className="flex flex-col items-left px-4 p-4 gap-8 w-full">
            <li className="text-lg">
              <Link href={"/"}>Features</Link>
            </li>
            <li className="text-lg">
              {" "}
              <Link href={"/"}>How it works</Link>
            </li>
            <li className="text-lg">
              {" "}
              <Link href={"/"}>FAQ</Link>
            </li>
            <li className="text-lg">
              {" "}
              <Link href={"/"}>Contact</Link>
            </li>
            <li className="text-lg text-center border border-[#1f1f1f] p-2 rounded-xl">
              {" "}
              <Link href={"/"} className="">
                Login
              </Link>
            </li>
            <li className="text-lg text-center bg-white text-black border border-[#1f1f1f] p-2 rounded-xl">
              {" "}
              <Link href={"/"} className="">
                Sign up
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default BurgerMenu;
