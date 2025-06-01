import React from "react";
import FeatureCard from "./FeatureCard";
import { MdOutlineFileUpload } from "react-icons/md";
import { FaMicrophoneAlt } from "react-icons/fa";
import { FaFileAlt } from "react-icons/fa";
import { PiMagnifyingGlassBold } from "react-icons/pi";
import { LuLayoutTemplate } from "react-icons/lu";
import { FaChartLine } from "react-icons/fa";
const Features = () => {
  const featuresDetails = [
    {
      title: "Smart CV Parser",
      description:
        " Upload your existing resume — our tool will extract the data and make it editable and AI-ready.",
      icon: <MdOutlineFileUpload />,
    },
    {
      title: "Realistic Interview Prep",
      description:
        "Practice with AI-generated questions tailored to the job, complete with real-time feedback to improve your answers.",
      icon: <FaMicrophoneAlt />,
    },
    {
      title: "Stunning CV Templates",
      description:
        "Choose from wide range of beautiful and professional templates. Export your CV in a polished PDF format.",
      icon: <LuLayoutTemplate />,
    },
    {
      title: "Job Description Optimization",
      description:
        "Paste a job post, and our tool rewrites your resume to match — optimizing for ATS and relevance. ",
      icon: <PiMagnifyingGlassBold />,
    },
    {
      title: "AI-Powered CV Generator",
      description:
        "No CV? Answer a few questions about your experience and education, and our tool will create a professional resume from scratch.",
      icon: <FaFileAlt />,
    },
    {
      title: "Progress Tracker",
      description:
        "Track your mock interviews by job—save, review, and improve your performance with personalized trends and tips for every role",
      icon: <FaChartLine />,
    },
  ];
  return (
    <div className=" flex flex-col gap-6 items-center">
      <h1 className="shadow-sm shadow-[#b6b6b6] border-[#1f1f1f] px-4 py-2 border-2 rounded-4xl">
        Features
      </h1>
      <h1 className="text-4xl lg:text-6xl text-center">
        Everything you <br /> need to stand out
      </h1>
      <p className="text-base lg:text-lg max-w-lg text-center text-subheadline">
        From AI-powered CV creation to realistic interview prep &mdash; get
        fully prepared, build confidence, and stand out in your job hunt.
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-3 mt-4 lg:mt-20 gap-10">
        {featuresDetails.map((feature, index) => (
          <FeatureCard
            key={index}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default Features;
