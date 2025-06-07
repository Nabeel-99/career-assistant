import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React from "react";

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <main className=" w-full ">
      <Navbar />
      {children}
      <Footer />
    </main>
  );
};

export default Layout;
