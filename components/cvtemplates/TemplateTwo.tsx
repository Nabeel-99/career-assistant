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
import { z } from "zod";

type Content = z.infer<typeof resumeSchema>;

const TemplateTwo = ({
  content,
  resumeId,
}: {
  content: Content;
  resumeId?: string;
}) => {
  const userInfo = [
    {
      name: content?.location,
      icon: <FaLocationDot className="text-green-600" />,
    },
    {
      name: content?.email,
      link: `mailto:${content?.email}`,
      icon: <FaEnvelope className="text-green-600" />,
    },
    {
      name: content?.phone,
      link: `tel:${content?.phone}`,
      icon: <FaPhone className="text-green-600" />,
    },
    {
      name: "LinkedIn",
      link: content?.links?.linkedin,
      icon: <FaLinkedin className="text-green-600" />,
    },
    {
      name: "GitHub",
      link: content?.links?.github,
      icon: <FaGithub className="text-green-600" />,
    },
    {
      name: "Portfolio",
      link: content?.links?.portfolio,
      icon: <FaLink className="text-green-600" />,
    },
  ].filter((item) => item.name);

  return (
    <div
      id={resumeId}
      className="w-[797px] bg-white text-black min-h-[1123px] p-10 grid grid-cols-[40%_60%] gap-5"
    >
      {/* Header */}
      <div className="col-span-2 text-center">
        <h1 className="text-4xl font-bold">{content?.fullname}</h1>
        <p className="text-2xl italic">{content?.title}</p>
      </div>

      {/* Left Column */}
      <div className="bg-gray-50 p-4 border-r border-gray-300">
        <ul className="flex flex-col gap-2">
          {userInfo.map((item, index) => {
            const Content = (
              <div className="flex items-center gap-2">
                {item.icon}
                <span>{item.name}</span>
              </div>
            );
            return item.link ? (
              <li key={index}>
                <Link href={item.link} target="_blank">
                  {Content}
                </Link>
              </li>
            ) : (
              <li key={index}>{Content}</li>
            );
          })}
        </ul>

        {content.skills && content.skills.length > 0 && (
          <div className="mt-4">
            <h2 className="font-bold text-green-600">Skills</h2>
            <p>{content.skills.split(",").join(", ")}</p>
          </div>
        )}

        {content.languages && content.languages.length > 0 && (
          <div className="mt-4">
            <h2 className="font-bold text-green-600">Languages</h2>
            {content.languages.map((lang, index) => (
              <p key={index}>
                {lang.name}: {lang.level}
              </p>
            ))}
          </div>
        )}

        {content.awards && content.awards.length > 0 && (
          <div className="mt-4">
            <h2 className="font-bold text-green-600">Awards</h2>
            {content.awards.map((award, index) => (
              <p key={index}>
                {award?.title}: {award?.description}
              </p>
            ))}
          </div>
        )}
      </div>

      {/* Right Column */}
      <div>
        {content.summary && (
          <div className="mb-5">
            <h2 className="bg-gray-100 p-2 font-bold">Profile</h2>
            <p>{content.summary}</p>
          </div>
        )}

        {content.education && content.education.length > 0 && (
          <div className="mb-5">
            <h2 className="bg-gray-100 p-2 font-bold">Education</h2>
            {content.education.map((edu, index) => (
              <div key={index} className="mb-2">
                <h3 className="font-bold">{edu?.degree}</h3>
                <p>{edu?.school}</p>
                {edu?.startDate && edu?.endDate && (
                  <p>
                    {formatTemplateDate(edu?.startDate)} -{" "}
                    {formatTemplateDate(edu?.endDate)}
                  </p>
                )}

                <p>{edu?.location}</p>
              </div>
            ))}
          </div>
        )}

        {content.experience && content.experience.length > 0 && (
          <div className="mb-5">
            <h2 className="bg-gray-100 p-2 font-bold">Experience</h2>
            {content.experience.map((exp, index) => (
              <div key={index} className="mb-2">
                <h3 className="font-bold">{exp?.title}</h3>
                <p>{exp?.company}</p>
                <p>
                  {formatTemplateDate(exp?.startDate!)} -{" "}
                  {formatTemplateDate(exp?.endDate!)}
                </p>
                <p>{exp?.location}</p>
                <ul className="list-disc ml-5">
                  {exp?.description.split("\n").map((desc, i) => (
                    <li key={i}>{desc}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {content.projects && content.projects.length > 0 && (
          <div className="mb-5">
            <h2 className="bg-gray-100 p-2 font-bold">Projects</h2>
            {content.projects.map((proj, index) => (
              <div key={index} className="mb-2">
                <h3 className="font-bold">{proj?.title}</h3>
                <p>{proj?.description}</p>
                <p>Stacks: {proj?.stacks}</p>
                <Link
                  href={proj?.link!}
                  target="_blank"
                  className="text-blue-600"
                >
                  Project Link
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplateTwo;
