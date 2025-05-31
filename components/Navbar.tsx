import Link from "next/link";
import React from "react";
import { GiArtificialHive } from "react-icons/gi";
import BurgerMenu from "./BurgerMenu";

const Navbar = () => {
  return (
    <div className="flex  max-sm:fixed max-sm:p-4 p-8  max-sm:backdrop-blur-md max-lg:border-b border-b-[#1f1f1f] items-center justify-between lg:justify-center w-full z-50">
      {/* logo */}
      <div className="lg:fixed z-50 lg:top-12 lg:left-10">
        <GiArtificialHive className="text-3xl" />
      </div>
      {/* nav links */}
      <nav className="flex max-sm:hidden items-center gap-2 border py-4 max-w-md w-full rounded-4xl border-[#1f1f1f]">
        <ul className="flex items-center justify-center gap-10 w-full">
          <li className="nav-link">
            <Link href={"/"}>Features</Link>
          </li>
          <li className="nav-link">
            {" "}
            <Link href={"/"}>How it works</Link>
          </li>
          <li className="nav-link">
            {" "}
            <Link href={"/"}>FAQ</Link>
          </li>
          <li className="nav-link">
            {" "}
            <Link href={"/"}>Contact</Link>
          </li>
        </ul>
      </nav>
      {/* auth btns */}
      <div className="max-sm:hidden z-50 lg:fixed top-8 right-10">
        <div className="flex items-center border p-2 border-transparent rounded-4xl backdrop-blur-lg gap-4">
          <Link href={"/"} className="nav-link">
            Login
          </Link>
          <Link href={"/"} className="sign-up-btn">
            Sign up
          </Link>
        </div>
      </div>
      {/* button burger menu */}

      <BurgerMenu />
    </div>
  );
};

export default Navbar;
