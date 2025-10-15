import React from "react";
import CVupload from "../public/cvupload.png";
import Practice from "../public/practice.png";
import Feedback from "../public/feedback.png";
import { MdOutlineFileUpload } from "react-icons/md";
import { FaMicrophoneAlt } from "react-icons/fa";
import { motion } from "motion/react";
import IconCard from "./cards/IconCard";
const Steps = () => {
  return (
    <>
      <div className="flex flex-col xl:flex-row justify-between items-center xl:items-start w-full lg:gap-10">
        <div className=" lg:w-lg xl:w-1/2 ">
          <IconCard
            icon={<MdOutlineFileUpload size={40} />}
            title={
              <>
                <span className="bg-gradient-to-r from-[#1ea572] from-40%  to-[#238aea]  bg-clip-text text-transparent">
                  Upload
                </span>{" "}
                Your Resume
              </>
            }
            description={
              <>
                <span className="text-left md:text-2xl">
                  {" "}
                  Start by uploading your CV. Our system scans and prepares it
                  for personalized analysis.
                </span>

                <ul className="mt-4 list-disc text-left list-inside md:text-xl  space-y-1">
                  <li>Instant parsing of your experience</li>
                  <li>Matches skills to job descriptions</li>
                  <li>Highlights missing keywords</li>
                </ul>
              </>
            }
          />
        </div>
        <div className="bg-radial-[at_50%_0%] from-white/90 to-[#0a0a0a] to-[40%] p-[0.5px]">
          <div className=" border-4 border-[#171717] mask-radial-at-bottom-right   mask-b-from-60% bg-gradient-to-t from-transparent to-[#040303] max-w-xl h-[400px] md:h-[500px] rounded-lg p-6 overflow-hidden">
            <motion.img
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{
                duration: 0.5,
                ease: "anticipate",
                type: "spring",
                stiffness: 100,
                delay: 0.2,
              }}
              src={CVupload.src}
              alt="cv-upload"
              className=" translate-y-20 translate-x-14   scale-120   "
            />
          </div>
        </div>
      </div>

      {/* second */}
      <div className="flex flex-col xl:flex-row justify-between items-center xl:items-start  w-full lg:gap-10">
        <div className=" lg:w-lg xl:order-2 xl:w-1/2 ">
          <IconCard
            icon={<FaMicrophoneAlt size={40} />}
            title={
              <>
                <span className="bg-gradient-to-r from-[#1ea572] from-40%  to-[#238aea]  bg-clip-text text-transparent">
                  Prepare
                </span>{" "}
                For Interviews
              </>
            }
            description={
              <>
                <span className="text-left md:text-2xl">
                  {" "}
                  Get AI-personalized mock interviews tailored to your career
                  goals.
                </span>

                <ul className="mt-4 list-disc text-left list-inside md:text-xl  space-y-1">
                  <li>Paste a job description to begin</li>
                  <li>AI aligns your CV with job requirements</li>
                  <li>Choose your experience level</li>
                  <li>Practice with targeted AI-generated questions</li>
                </ul>
              </>
            }
          />
        </div>
        <div className="bg-radial-[at_50%_0%]  from-white/90 to-[#0a0a0a] to-[40%] p-[0.5px]">
          <div className="  border-4 border-[#171717] mask-radial-at-bottom-right   mask-b-from-60% bg-gradient-to-t from-transparent to-[#040303] max-w-xl h-[400px] md:h-[500px] rounded-lg p-6 overflow-hidden">
            <motion.img
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                ease: "anticipate",
                type: "spring",
                stiffness: 100,
                delay: 0.2,
              }}
              src={Practice.src}
              alt="practice"
              className=" translate-y-20 -translate-x-10   scale-120   "
            />
          </div>
        </div>
      </div>

      {/* third */}
      <div className="flex flex-col xl:flex-row justify-between items-center xl:items-start mb-20  w-full lg:gap-10">
        <div className=" lg:w-lg xl:w-1/2 ">
          <IconCard
            icon={<FaMicrophoneAlt size={40} />}
            title={
              <>
                <h3>
                  Get
                  <span className="pl-3  bg-gradient-to-r from-[#1ea572] from-40%  to-[#238aea]  bg-clip-text text-transparent">
                    Feedback
                  </span>{" "}
                  & Track{" "}
                  <span className="bg-gradient-to-r from-[#1ea572] from-40%  to-[#238aea]  bg-clip-text text-transparent">
                    Progress
                  </span>{" "}
                </h3>
              </>
            }
            description={
              <>
                <span className="text-left md:text-2xl">
                  {" "}
                  Understand your interview performance with clear feedback and
                  progress tracking.
                </span>

                <ul className="mt-4 list-disc text-left list-inside md:text-xl  space-y-1">
                  <li>AI scores each mock session instantly</li>
                  <li>View breakdowns by question type</li>
                  <li>Monitor improvement over time</li>
                  <li>See personalized tips after each session</li>
                </ul>
              </>
            }
          />
        </div>
        <div className="bg-radial-[at_50%_0%] from-white/90 to-[#0a0a0a] to-[40%] p-[0.5px]">
          <div className=" border-4 border-[#171717] mask-radial-at-bottom-right   mask-b-from-60% bg-gradient-to-t from-transparent to-[#040303] max-w-xl h-[350px] md:h-[500px] rounded-lg p-6 overflow-hidden">
            <motion.img
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{
                duration: 0.5,
                ease: "anticipate",
                type: "spring",
                stiffness: 100,
                delay: 0.2,
              }}
              src={Feedback.src}
              alt="feedback"
              className=" translate-y-20 translate-x-14   scale-120   "
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Steps;
