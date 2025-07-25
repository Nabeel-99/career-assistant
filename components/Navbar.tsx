"use client";

import Link from "next/link";
import React from "react";
import { GiArtificialHive } from "react-icons/gi";
import BurgerMenu from "./BurgerMenu";
import { motion } from "motion/react";
const Navbar = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex 2xl:container 2xl:mx-auto max-sm:fixed max-sm:p-4 p-8 max-sm:bg-black/40  max-sm:backdrop-blur-md max-lg:border-b border-b-[#1f1f1f] items-center justify-between lg:justify-center w-full z-50"
    >
      {/* logo */}
      <Link
        href={"/"}
        aria-label="home"
        className="lg:fixed z-50 lg:top-12 lg:left-10"
      >
        <GiArtificialHive className="text-3xl" />
      </Link>
      {/* nav links */}
      <nav className="flex max-lg:hidden items-center gap-2 border py-4 max-w-md w-full rounded-4xl border-[#1f1f1f]">
        <ul className="flex items-center justify-center gap-10 w-full">
          <li className="nav-link">
            <Link href={"#features"}>Features</Link>
          </li>
          <li className="nav-link">
            {" "}
            <Link href={"#how-it-works"}>How it works</Link>
          </li>
          <li className="nav-link">
            {" "}
            <Link href={"#testimonials"}>Testimonials</Link>
          </li>
          <li className="nav-link">
            {" "}
            <Link href={"#faq"}>FAQ</Link>
          </li>
        </ul>
      </nav>
      {/* auth btns */}
      <div className="max-lg:hidden z-50 lg:fixed top-8 right-10">
        <div className="flex items-center border p-2 px-4 border-transparent rounded-4xl backdrop-blur-lg gap-4">
          <Link href={"/login"} className="nav-link">
            Login
          </Link>
          <Link href={"/signup"} className="sign-up-btn">
            Sign up
          </Link>
        </div>
      </div>
      {/* button burger menu */}

      <BurgerMenu />
    </motion.div>
  );
};

export default Navbar;
