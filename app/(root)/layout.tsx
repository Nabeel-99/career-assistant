import Footer from "@/components/Footer";
import LenisScroll from "@/components/LenisScroll";
import Navbar from "@/components/Navbar";
import React from "react";

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <LenisScroll>
      <main className=" w-full ">
        <Navbar />
        {children}
        <Footer />
      </main>
    </LenisScroll>
  );
};

export default Layout;
