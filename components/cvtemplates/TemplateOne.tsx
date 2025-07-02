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

const TemplateOne = () => {
  const userInfo = [
    {
      name: "Abuja, Nigeria",

      icon: <FaLocationDot />,
    },
    {
      name: "N1H5A@example.com",
      link: "mailto:N1H5A@example.com",
      icon: <FaEnvelope />,
    },
    {
      name: "+234 1234567890",
      link: "tel:+2341234567890",
      icon: <FaPhone />,
    },
    {
      name: "LinkedIn",
      link: "https://www.linkedin.com/in/nabeel-farouq/",
      icon: <FaLinkedin />,
    },
    {
      name: "GitHub",
      link: "https://github.com/Nabeel-99",
      icon: <FaGithub />,
    },
    {
      name: "Portfolio",
      link: "https://nabeelfarouq.com",
      icon: <FaLink />,
    },
  ];

  const experience = [
    {
      title: "Software Developer Intern",
      company: "ABC Company",
      tasks: [
        "Developed a web application using React, Next.js, and TypeScript.",
        "Implemented user authentication and authorization using Firebase.",
        "Optimized codebase for performance and scalability.",
        "Collaborated with team members to deliver high-quality software.",
      ],
      timeFrame: "May 2023 - July 2024",
    },
    {
      title: "Freelance Developer",
      company: "XYZ Company",
      tasks: [
        "Created a responsive website using HTML, CSS, and JavaScript.",
        "Implemented interactive features and animations.",
        "Optimized codebase for performance and accessibility.",
      ],
      timeFrame: "January 2025 - Present",
    },
  ];

  const projects = [
    {
      title: "AI Career Assistant",
      description:
        "A web application that allows users to upload resumes, practice interviews with AI voice bots, and get AI-generated feedback to improve performance.",
      tasks: [
        "Integrated Vapi voice assistant for real-time interview simulations.",
        "Used Gemini API to generate dynamic interview questions and evaluate user responses.",
        "Implemented Supabase for resume storage and retrieval.",
      ],
      link: "https://aicareerapp.vercel.app",
    },
    {
      title: "Smart Meal Connect",
      description:
        "A fullstack MERN app that suggests healthy meals based on user metrics and available ingredients using Spoonacular API.",
      tasks: [
        "Built user profile system with nutrition preferences and allergies.",
        "Fetched and filtered recipes from Spoonacular API.",
        "Created meal planner and grocery list generator.",
      ],
      link: "https://smartmeal.vercel.app",
    },
    {
      title: "NextBlog Platform",
      description:
        "A blogging platform with authentication, rich text editing, cloud image storage, and user dashboards.",
      tasks: [
        "Used Next.js, Prisma, and NextAuth for secure blogging workflow.",
        "Integrated Cloudinary for image uploads.",
        "Built custom markdown editor and post publishing pipeline.",
      ],
      link: "https://nextblog.vercel.app",
    },
  ];
  const education = [
    {
      school: "University of ABC",
      degree: "B.Sc. in Computer Science Engineering",
      location: "London, UK",
      timeframe: "2021 - 2025",
    },
    // {
    //   school: "Online Courses (freeCodeCamp, Udemy)",
    //   degree: "Fullstack Web Development Certifications",
    //   location: "Remote",
    //   timeframe: "2022 - Present",
    // },
  ];
  const skills = [
    {
      category: "Frontend",
      items: [
        "React.js",
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Framer Motion",
        "Zustand",
        "HTML",
        "CSS",
        "JavaScript",
      ],
    },
    {
      category: "Backend",
      items: [
        "Node.js",
        "Express.js",
        "Prisma",
        "REST APIs",
        "MongoDB",
        "PostgreSQL",
      ],
    },
    {
      category: "Dev Tools",
      items: ["Git", "GitHub", "Figma"],
    },
  ];

  const languages = [
    {
      name: "English",
      level: "Fluent",
    },
    {
      name: "Arabic",
      level: "Intermediate",
    },
    {
      name: "Hungarian",
      level: "Basic",
    },
  ];
  const awards = [
    {
      title: "Top 10 Finalist – Hack4Good 2024",
      description:
        "Built a health-focused meal suggestion app using AI and MERN stack, presented to judges in a live demo.",
    },
    {
      title: "Dean’s List – University of Pécs",
      description:
        "Recognized for academic excellence in Computer Science Engineering during the 2022–2023 academic year.",
    },
  ];
  return (
    <>
      <div
        id="resume-template"
        className="w-[797px]  bg-white text-black shadow-sm border min-h-[1123px] break-after-page p-8 flex flex-col gap-5"
      >
        {/* user info area */}
        <section className="flex flex-col gap-3">
          <div className="flex items-center gap-6">
            <h1 className="text-3xl font-bold">John Doe</h1>
            <p className="italic text-xl font-medium">Software Developer</p>
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
        {/* profile summary */}
        <section className="flex flex-col gap-3">
          <h1 className="font-bold">Profile</h1>
          <div className="w-full h-1 bg-blue-700"></div>

          <p>
            Self-taught and detail-oriented Frontend Developer with strong
            fullstack capabilities. Experienced in building responsive,
            high-performance web applications using React.js, Next.js, and
            Node.js. Proficient in translating Figma designs into pixel-perfect,
            accessible user interfaces. Skilled in optimizing site speed,
            improving usability, and implementing clean, maintainable code.
            Continuously learning through hands-on project work and
            problem-solving.
          </p>
        </section>
        {/* education */}
        <section className="flex flex-col gap-3">
          <h1 className="font-bold">Education</h1>
          <div className="w-full h-1 bg-blue-700"></div>
          <div className="grid grid-cols-3">
            {education.map((item, index) => (
              <React.Fragment key={index}>
                <div className="col-span-2">
                  <div className="flex flex-col gap-1">
                    <h1 className="font-bold">{item.degree}</h1>
                    <p>{item.school}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="italic">{item.timeframe}</p>
                  <p>{item.location}</p>
                </div>
              </React.Fragment>
            ))}
          </div>
        </section>
        {/* experience */}
        <section className="flex flex-col gap-3">
          <h1 className="font-bold">Experience</h1>
          <div className="w-full h-1 bg-blue-700"></div>
          <div className="grid grid-cols-3 gap-6">
            {experience.map((item, index) => (
              <React.Fragment key={index}>
                <div className="flex flex-col gap-1">
                  <p className="italic">{item.timeFrame}</p>
                  <p>{item.company}</p>
                </div>
                <div className="col-span-2">
                  <div className="flex flex-col gap-1">
                    <h1 className="font-bold">{item.title}</h1>
                    <ul className="list-disc">
                      {item.tasks.map((task, index) => (
                        <li key={index}>{task}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </section>
        {/* projects */}
        <section className="flex flex-col gap-3">
          <h1 className="font-bold">Projects</h1>
          <div className="w-full h-1 bg-blue-700"></div>
          <div className="flex flex-col gap-5">
            {projects.map((item, index) => (
              <div key={index} className="flex flex-col gap-2">
                <h1 className="font-bold">{item.title}</h1>
                <p>{item.description}</p>
                <div className="flex items-center gap-2 text-blue-700">
                  <FiExternalLink />
                  <Link href={item.link} className="text-sm italic ">
                    Project Link
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* skills */}
        <section className="flex flex-col gap-3">
          <h1 className="font-bold">Skills</h1>
          <div className="w-full h-1 bg-blue-700"></div>
          {skills.map((section, index) => (
            <p key={index}>
              <span className="font-bold">{section.category}</span>:{" "}
              {section.items.join(", ")}
            </p>
          ))}
        </section>
        {/* languages */}
        <section className="flex flex-col gap-3">
          <h1 className="font-bold">Languages</h1>
          <div className="w-full h-1 bg-blue-700"></div>
          {languages.map((item, index) => (
            <p key={index}>
              <span className="font-bold">{item.name}</span>: {item.level}
            </p>
          ))}
        </section>
        {/* awards */}
        <section className="flex flex-col gap-3">
          <h1 className="font-bold">Awards</h1>
          <div className="w-full h-1 bg-blue-700"></div>
          {awards.map((item, index) => (
            <p key={index}>
              <span className="font-bold">{item.title}</span>:{" "}
              {item.description}
            </p>
          ))}
        </section>
      </div>
    </>
  );
};

export default TemplateOne;
