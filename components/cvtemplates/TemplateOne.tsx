import React from "react";
import {
  FaEnvelope,
  FaGithub,
  FaLink,
  FaLinkedin,
  FaPhone,
} from "react-icons/fa";
import { FaLocationPin } from "react-icons/fa6";
import { FiExternalLink } from "react-icons/fi";

const TemplateOne = () => {
  const userInfo = [
    {
      name: "Abuja, Nigeria",
      icon: <FaLocationPin />,
    },
    {
      name: "N1H5A@example.com",
      icon: <FaEnvelope />,
    },
    {
      name: "+234 1234567890",
      icon: <FaPhone />,
    },
    {
      name: "https://www.linkedin.com/in/nabeel-farouq/",
      icon: <FaLinkedin />,
    },
    {
      name: "https://github.com/Nabeel-99",
      icon: <FaGithub />,
    },
    {
      name: "https://nabeelfarouq.com",
      icon: <FaLink />,
    },
  ];

  return (
    <>
      <div
        id="resume-template"
        className="w-[797px]  bg-white/30 text-black min-h-[1123px] break-after-page p-8 flex flex-col gap-5"
      >
        {/* user info area */}
        <section className="flex flex-col gap-3">
          <div className="flex items-center gap-6">
            <h1 className="text-3xl font-bold">Nabeel Farouq</h1>
            <p className="italic text-xl font-medium">Software Developer</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {userInfo.map((item, index) => (
              <div className="flex items-center gap-2" key={index}>
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        </section>
        {/* profile summary */}
        <section className="flex flex-col gap-3">
          <h1 className="font-bold">Profile</h1>
          <div className="w-full h-1 bg-black"></div>
          {Array.from({ length: 10 }).map((_, index) => (
            <p key={index}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consequatur, accusantium.
            </p>
          ))}
        </section>
        {/* experience */}
        <section className="flex flex-col gap-3">
          <h1 className="font-bold">Experience</h1>
          <div className="w-full h-1 bg-black"></div>
          <div className="grid grid-cols-3">
            <div className="flex flex-col gap-2">
              <p>2018 - 2020</p>
              <p>Company Name</p>
            </div>
            <div className="col-span-2">
              <div className="flex flex-col gap-2">
                <h1 className="font-bold">Software Developer</h1>
                <ul>
                  {Array.from({ length: 3 }).map((_, index) => (
                    <li key={index}>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
        {/* projects */}
        <section className="flex flex-col gap-3">
          <h1 className="font-bold">Projects</h1>
          <div className="w-full h-1 bg-black"></div>
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-2">
              <h1 className="font-bold">Project Name</h1>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              <div className="flex items-center gap-2">
                <FiExternalLink />
                <span>Project link</span>
              </div>
            </div>
          </div>
        </section>
        {/* education */}
        <section className="flex flex-col gap-3">
          <h1 className="font-bold">Education</h1>
          <div className="w-full h-1 bg-black"></div>
          <div className="grid grid-cols-3">
            <div className="col-span-2">
              <div className="flex flex-col gap-2">
                <h1 className="font-bold">University of Pecs</h1>
                <p>Course name</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p>2021 - 2025</p>
              <p>College Name</p>
            </div>
          </div>
        </section>
        {/* skills */}
        <section className="flex flex-col gap-3">
          <h1 className="font-bold">Skills</h1>
          <div className="w-full h-1 bg-black"></div>
          <p className="">
            <span className="font-bold">Frontend</span>:
          </p>
        </section>
        {/* languages */}
        <section className="flex flex-col gap-3">
          <h1 className="font-bold">Languages</h1>
          <div className="w-full h-1 bg-black"></div>
          <p className="">
            <span className="font-bold">English</span>: Fluent
          </p>
        </section>
        {/* awards */}
        <section className="flex flex-col gap-3">
          <h1 className="font-bold">Awards</h1>
          <div className="w-full h-1 bg-black"></div>
          <p className="">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </section>
      </div>
      {/* <div className=" bottom-10 right-10 fixed z-[9999]">
        <Button onClick={convertToPdf}>Print</Button>
      </div> */}
    </>
  );
};

export default TemplateOne;
