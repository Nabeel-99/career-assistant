import React from "react";
import { FaDiscord, FaEnvelope, FaGithub } from "react-icons/fa";
import { GiArtificialHive } from "react-icons/gi";
import SocialIcon from "./SocialIcon";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="relative z-10 mt-20">
      <div className="absolute left-0 -z-10">
        <div className="h-[200px] w-[200px] lg:h-[300px] lg:w-[300px] bg-gradient-to-l from-[#0a0a0a] via-[#613e05] to-[#0d828a] blur-3xl opacity-30" />
      </div>
      <div className="absolute  right-0 -z-10">
        <div className="h-[200px] w-[200px] lg:h-[300px] lg:w-[300px] bg-gradient-to-l from-[#0a0a0a] via-[#232aea] to-[#0d828a] blur-3xl opacity-30" />
      </div>

      {/* Main Footer Content */}
      <div className="border-t backdrop-blur-xl bg-[#0a0a0a]/80  rounded-t-[100px] p-10 lg:p-32 flex flex-col gap-10  border-[#113123]">
        <div className="flex flex-col items-center  2xl:container 2xl:mx-auto lg:flex-row lg:justify-between gap-10 ">
          <div className="flex items-center gap-3">
            <GiArtificialHive className="size-24 " />
            <span className="font-extrabold text-2xl lg:text-4xl leading-tight">
              AI-Powered <br /> Career Assistant
            </span>
          </div>

          {/* Contact / Social */}
          <div className="flex flex-col gap-3">
            <h4 className="font-extrabold text-2xl lg:text-5xl md:text-center xl:text-left text-white ">
              Get In Touch{" "}
            </h4>
            <ul className="flex flex-col md:flex-row  gap-3 text-subheadline text-gray-400 w-full">
              <SocialIcon
                icon={<FaGithub className="size-6" />}
                title="Github"
                href={"https://github.com/Nabeel-99/career-assistant.git"}
              />
              <SocialIcon
                icon={<FaDiscord className="size-6" />}
                title="Discord"
                href={"https://discord.gg/pG8mVHFHGS"}
              />
              <SocialIcon
                icon={<FaEnvelope className="size-6" />}
                title="Email"
                href={
                  "https://mail.google.com/mail/?view=cm&fs=1&to=codingacademy599@gmail.com"
                }
              />
              <SocialIcon
                icon={<FaXTwitter className="size-6" />}
                title="Twitter"
                href={"https://x.com/Nabeel_umarr"}
              />
            </ul>
          </div>
        </div>
        <div className="w-full h-0.5 bg-gradient-to-r from-[#0a0a0a] 2xl:container 2xl:mx-auto via-[#113123] to-[#0a0a0a]"></div>
        <div className=" text-center 2xl:container 2xl:mx-auto text-gray-500 text-sm">
          &copy;2025{" "}
          <span className="font-bold text-white">AI Career Assistant.</span> All
          rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
