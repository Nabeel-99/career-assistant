"use client";

import { formatTemplateDate } from "@/lib/utils";
import { resumeSchema } from "@/lib/validation";
import React, { useEffect, useState } from "react";
import {
  FaEnvelope,
  FaGithub,
  FaLink,
  FaLinkedin,
  FaPhone,
} from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { toast } from "sonner";
import { z } from "zod";

type Content = z.infer<typeof resumeSchema>;

const TemplateThree = ({
  content,
  resumeId,
}: {
  content: Content;
  resumeId?: string;
}) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const renderImage = async () => {
    try {
      setImageUrl(content.image);
    } catch (error) {
      toast.error("Error fetching image");
    }
  };

  useEffect(() => {
    renderImage();
  }, [content.image]);
  return (
    <div
      id={resumeId}
      className="w-[797px] bg-white text-black min-h-[1123px] p-10"
    >
      {/* Header */}
      <div className="text-center mb-5">
        {content.image && (
          <img
            src={`${imageUrl}?v=${Date.now()}`}
            alt="Profile"
            className="w-32 h-32 rounded-full mx-auto mb-3 object-cover"
          />
        )}
        <h1 className="text-4xl font-bold">{content.fullname}</h1>
        <p className="text-2xl italic">{content.title}</p>
      </div>

      {/* Summary (Description) */}
      {content.summary && (
        <div className="mb-5">
          <h2 className="bg-[#2980b9] text-white p-2 font-bold">Profile</h2>
          <p>{content.summary}</p>
        </div>
      )}

      {/* Two Columns */}
      <div className="flex gap-5">
        {/* Left Column */}
        <div className="w-1/3 bg-gray-100 p-4 text-sm">
          {/* Contact */}
          <h2 className="text-lg font-bold text-[#2980b9] mb-2">Contact</h2>
          <ul className="mb-4">
            {content.location && (
              <li className="flex items-center gap-2">
                <FaLocationDot className="text-[#2980b9]" /> {content.location}
              </li>
            )}
            {content.email && (
              <li className="flex items-center gap-2">
                <FaEnvelope className="text-[#2980b9]" />{" "}
                <a href={`mailto:${content.email}`}>{content.email}</a>
              </li>
            )}
            {content.phone && (
              <li className="flex items-center gap-2">
                <FaPhone className="text-[#2980b9]" />{" "}
                <a href={`tel:${content.phone}`}>{content.phone}</a>
              </li>
            )}
          </ul>

          {/* Links */}
          <h2 className="text-lg font-bold text-[#2980b9] mb-2">Links</h2>
          <ul className="mb-4">
            {content.links?.linkedin && (
              <li className="flex items-center gap-2">
                <FaLinkedin className="text-[#2980b9]" />{" "}
                <a href={content.links.linkedin} target="_blank">
                  LinkedIn
                </a>
              </li>
            )}
            {content.links?.github && (
              <li className="flex items-center gap-2">
                <FaGithub className="text-[#2980b9]" />{" "}
                <a href={content.links.github} target="_blank">
                  GitHub
                </a>
              </li>
            )}
            {content.links?.portfolio && (
              <li className="flex items-center gap-2">
                <FaLink className="text-[#2980b9]" />{" "}
                <a href={content.links.portfolio} target="_blank">
                  Portfolio
                </a>
              </li>
            )}
          </ul>

          {/* Skills */}
          {content.skills && (
            <div className="mb-4">
              <h2 className="text-lg font-bold text-[#2980b9] mb-2">Skills</h2>
              <p>{content.skills.split(",").join(", ")}</p>
            </div>
          )}

          {/* Languages */}
          {content.languages && content.languages.length > 0 && (
            <div className="mb-4">
              <h2 className=" mb-2">Languages</h2>
              {content.languages.map((lang, index) => (
                <p key={index}>
                  {lang.name}: {lang.level}
                </p>
              ))}
            </div>
          )}

          {/* Awards */}
          {content.awards && content.awards.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-[#2980b9] mb-2">Awards</h2>
              {content.awards.map((award, index) => (
                <p key={index}>
                  {award?.title}: {award?.description} ({award?.year})
                </p>
              ))}
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="w-2/3">
          {/* Education */}
          {content.education && content.education.length > 0 && (
            <div className="mb-5">
              <h2 className="bg-[#2980b9] text-white p-2 font-bold">
                Education
              </h2>
              {content.education.map((edu, index) => (
                <div key={index} className="mb-2">
                  <h3 className="font-bold">{edu?.degree}</h3>
                  <p>{edu?.school}</p>
                  {edu?.startDate && edu.endDate && (
                    <p>
                      {formatTemplateDate(edu.startDate)} -{" "}
                      {edu.endDate === "Present"
                        ? "Present"
                        : formatTemplateDate(edu.endDate)}
                    </p>
                  )}

                  <p>{edu?.location}</p>
                </div>
              ))}
            </div>
          )}

          {/* Experience */}
          {content.experience && content.experience.length > 0 && (
            <div className="mb-5">
              <h2 className="bg-[#2980b9] text-white p-2 font-bold">
                Experience
              </h2>
              {content.experience.map((exp, index) => (
                <div key={index} className="mb-2">
                  <h3 className="font-bold">{exp?.title}</h3>
                  <p>{exp?.company}</p>
                  {exp?.startDate && exp.endDate && (
                    <p>
                      {formatTemplateDate(exp?.startDate)} -{" "}
                      {exp?.endDate === "Present"
                        ? "Present"
                        : formatTemplateDate(exp?.endDate)}
                    </p>
                  )}

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

          {/* Projects */}
          {content.projects && content.projects.length > 0 && (
            <div className="mb-5">
              <h2 className="bg-[#2980b9] text-white p-2 font-bold">
                Projects
              </h2>
              {content.projects.map((proj, index) => (
                <div key={index} className="mb-2">
                  <h3 className="font-bold">{proj?.title}</h3>
                  <p>{proj?.description}</p>
                  <p>Stacks: {proj?.stacks}</p>
                  <a
                    href={proj?.link}
                    target="_blank"
                    className="text-blue-600"
                  >
                    Project Link
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TemplateThree;
