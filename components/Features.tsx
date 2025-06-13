"use client";

import React from "react";
import FeatureCard from "./FeatureCard";
import { MdOutlineFileUpload } from "react-icons/md";
import { FaMicrophoneAlt } from "react-icons/fa";
import { FaFileAlt } from "react-icons/fa";
import { PiMagnifyingGlassBold } from "react-icons/pi";
import { LuLayoutTemplate } from "react-icons/lu";
import { FaChartLine } from "react-icons/fa";
import FadeContent from "./Animations/FadeContent/FadeContent";
import { delay } from "framer-motion";
import AnimatedContent from "./Animations/AnimatedContent/AnimatedContent";
const Features = () => {
  const featuresDetails = [
    {
      title: "Smart CV Parser",
      description:
        " Upload your existing resume — our tool will extract the data and make it editable and AI-ready.",
      icon: <MdOutlineFileUpload />,
      delay: 0.1,
    },
    {
      title: "Realistic Interview Prep",
      description:
        "Practice with AI-generated questions tailored to the job, complete with real-time feedback to improve your answers.",
      icon: <FaMicrophoneAlt />,
      delay: 0.2,
    },
    {
      title: "Stunning CV Templates",
      description:
        "Choose from wide range of beautiful and professional templates. Export your CV in a polished PDF format.",
      icon: <LuLayoutTemplate />,
      delay: 0.3,
    },
    {
      title: "Job Description Optimization",
      description:
        "Paste a job post, and our tool rewrites your resume to match — optimizing for ATS and relevance. ",
      icon: <PiMagnifyingGlassBold />,
      delay: 0.4,
    },
    {
      title: "AI-Powered CV Generator",
      description:
        "No CV? Answer a few questions about your experience and education, and our tool will create a professional resume from scratch.",
      icon: <FaFileAlt />,
      delay: 0.5,
    },
    {
      title: "Progress Tracker",
      description:
        "Track your mock interviews, review, and improve your performance with personalized trends and tips for every role.",
      icon: <FaChartLine />,
      delay: 0.6,
    },
  ];
  return (
    <AnimatedContent
      distance={40}
      direction="vertical"
      reverse={false}
      duration={1.2}
      ease="power3.out"
      initialOpacity={0}
      animateOpacity
      scale={1}
      threshold={0.2}
      delay={0.2}
      className=" flex flex-col gap-6 items-center"
    >
      <h1 className="shadow-sm shadow-[#b6b6b6] border-[#1f1f1f] px-4 py-2 border-2 rounded-4xl">
        Features
      </h1>
      <FadeContent
        blur={true}
        easing="ease-out"
        initialOpacity={0}
        className="flex flex-col gap-3"
      >
        <h1 className="text-4xl lg:text-6xl text-center">
          Everything you <br /> need to stand out
        </h1>
        <p className="text-base lg:text-lg max-w-lg text-center text-subheadline">
          From AI-powered CV creation to realistic interview prep &mdash; get
          fully prepared, build confidence, and stand out in your job hunt.
        </p>
      </FadeContent>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4 lg:mt-20 gap-4 md:gap-10">
        {featuresDetails.map((feature, index) => (
          <FeatureCard
            key={index}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
            delay={feature.delay}
          />
        ))}
      </div>
    </AnimatedContent>
  );
};

export default Features;
