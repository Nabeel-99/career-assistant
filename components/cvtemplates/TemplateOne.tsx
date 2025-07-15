import { formatTemplateDate } from "@/lib/utils";
import { resumeSchema } from "@/lib/validation";
import Link from "next/link";
import React from "react";
import {
  FaEnvelope,
  FaGithub,
  FaLink,
  FaLinkedin,
  FaPhone,
} from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FiExternalLink } from "react-icons/fi";
import { z } from "zod";

type Content = z.infer<typeof resumeSchema>;
const TemplateOne = ({
  content,
  resumeId,
}: {
  content: Content;
  resumeId?: string;
}) => {
  const userInfo = [
    {
      name: content?.location,

      icon: <FaLocationDot />,
    },
    {
      name: content?.email,
      link: `mailto:${content?.email}`,
      icon: <FaEnvelope />,
    },
    {
      name: content?.phone,
      link: `tel:${content?.phone}`,
      icon: <FaPhone />,
    },
    {
      name: "LinkedIn",
      link: content?.links?.linkedin,
      icon: <FaLinkedin />,
    },
    {
      name: "GitHub",
      link: content?.links?.github,
      icon: <FaGithub />,
    },
    {
      name: "Portfolio",
      link: content?.links?.portfolio,
      icon: <FaLink />,
    },
  ];

  return (
    <>
      <div
        id={resumeId}
        className="w-[797px]  bg-white text-black  min-h-[1123px] break-after-page p-10 flex flex-col gap-5"
      >
        {/* user info area */}
        {userInfo && userInfo.length > 0 && (
          <section className="flex flex-col gap-3">
            <div className="flex items-center gap-6">
              <h1 className="text-3xl font-bold">{content?.fullname}</h1>
              <p className="italic text-xl font-medium">{content?.title}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {userInfo.map((item, index) => {
                const Content = (
                  <div className="flex items-center gap-2">
                    <span className="text-blue-700">{item.icon}</span>
                    <span>{item.name}</span>
                  </div>
                );
                return item.link ? (
                  <Link
                    href={item.link || "#"}
                    target="_blank"
                    className="flex items-center gap-2"
                    key={index}
                  >
                    {Content}
                  </Link>
                ) : (
                  <div key={index}>{Content}</div>
                );
              })}
            </div>
          </section>
        )}

        {/* profile summary */}
        {content.summary && content.summary.length > 0 && (
          <section className="flex flex-col gap-3">
            <h1 className="font-bold">Profile</h1>
            <div className="w-full h-1 bg-blue-700"></div>

            <p>{content.summary}</p>
          </section>
        )}

        {/* education */}
        {content.education && content.education.length > 0 && (
          <section className="flex flex-col gap-3">
            <h1 className="font-bold">Education</h1>
            <div className="w-full h-1 bg-blue-700"></div>
            <div className="grid grid-cols-3">
              {content?.education?.map((item, index) => (
                <React.Fragment key={index}>
                  <div className="col-span-2">
                    <div className="flex flex-col gap-1">
                      <h1 className="font-bold">{item?.degree}</h1>
                      <p>{item?.school}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    {item?.startDate && item?.endDate && (
                      <p className="italic">
                        {formatTemplateDate(item?.startDate)} -{" "}
                        {formatTemplateDate(item?.endDate)}
                      </p>
                    )}

                    <p>{item?.location}</p>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </section>
        )}

        {/* experience */}
        {content.experience && content.experience.length > 0 && (
          <section className="flex flex-col gap-3">
            <h1 className="font-bold">Experience</h1>
            <div className="w-full h-1 bg-blue-700"></div>
            <div className="grid grid-cols-3 gap-6">
              {content?.experience?.map((item, index) => (
                <React.Fragment key={index}>
                  <div className="flex flex-col gap-1">
                    <p className="italic">
                      {item?.startDate} - {item?.endDate}
                    </p>
                    <p>{item?.company}</p>
                  </div>
                  <div className="col-span-2">
                    <div className="flex flex-col gap-1">
                      <h1 className="font-bold">{item?.title}</h1>
                      <ul className="list-disc ">
                        {item?.description
                          ?.split("\n")
                          .map((line, index) => line.trim())
                          .filter((line) => line !== "")
                          .map((line, index) => (
                            <li key={index}>{line}</li>
                          ))}
                      </ul>
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </section>
        )}

        {/* projects */}
        {content.projects && content.projects.length > 0 && (
          <section className="flex flex-col gap-3">
            <h1 className="font-bold">Projects</h1>
            <div className="w-full h-1 bg-blue-700"></div>
            <div className="flex flex-col gap-5">
              {content?.projects?.map((item, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <h1 className="font-bold">{item?.title}</h1>
                  {item?.stacks && (
                    <p className="">
                      <span className="font-bold">Stacks:</span> {item?.stacks}
                    </p>
                  )}
                  <p>{item?.description}</p>

                  <div className="flex items-center gap-2 text-blue-700">
                    <FiExternalLink />
                    <Link
                      href={item?.link!}
                      target="_blank"
                      className="text-sm italic "
                    >
                      Project Link
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* skills */}
        {content.skills && content.skills.length > 0 && (
          <section className="flex flex-col gap-3">
            <h1 className="font-bold">Skills</h1>
            <div className="w-full h-1 bg-blue-700"></div>
            {/* <div className="flex flex-wrap gap-2">
            {content.skills?.map((skill, index) => (
              <span
                key={index}
                className="bg-gray-200 text-sm px-2 py-1 rounded-md text-gray-800"
              >
                {skill}
              </span>
            ))}
          </div> */}
            <p>{content.skills?.split(", ").join(", ")}</p>
          </section>
        )}

        {/* languages */}
        {content.languages && content.languages.length > 0 && (
          <section className="flex flex-col gap-3">
            <h1 className="font-bold">Languages</h1>
            <div className="w-full h-1 bg-blue-700"></div>
            {content?.languages?.map((item, index) => (
              <p key={index}>
                <span className="font-bold">{item?.name}</span>: {item?.level}
              </p>
            ))}
          </section>
        )}

        {/* awards */}
        {content.awards && content.awards.length > 0 && (
          <section className="flex flex-col gap-3">
            <h1 className="font-bold">Awards</h1>
            <div className="w-full h-1 bg-blue-700"></div>
            {content?.awards?.map((item, index) => (
              <p key={index}>
                <span className="font-bold">{item?.title}</span>:{" "}
                {item?.description}
              </p>
            ))}
          </section>
        )}
      </div>
    </>
  );
};

export default TemplateOne;
