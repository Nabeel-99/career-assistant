import React from "react";
import TestimonialCard from "../cards/TestimonialCard";
import MarqueeEffect from "../MarqueeEffect";
import FadeContent from "../Animations/FadeContent/FadeContent";
import AnimatedContent from "../Animations/AnimatedContent/AnimatedContent";

const Testimonials = () => {
  const reviews = [
    {
      id: 1,
      initials: "FN",
      name: "Farouq Nabeel",
      title: "Product Designer",
      review:
        "Made the job hunt easier. Helpful suggestions, quick setup, and clean layout. Not overwhelming like other platforms.",
    },
    {
      id: 2,
      initials: "DR",
      name: "Daniel R.",
      title: "Software Engineer Intern",
      review:
        "I prepped for my Google interview using this. The mock questions were realistic, and the feedback made me more structured. I passed the first round. Would recommend to any intern prepping for tech interviews.",
    },
    {
      id: 3,
      initials: "SJ",
      name: "Sarah Johnson",
      title: "Frontend Developer",
      review:
        "Didn’t expect much, but the feedback was surprisingly detailed. Helped tighten my CV and spot weak points in minutes.",
    },
    {
      id: 4,
      initials: "AL",
      name: "Anika Lopez",
      title: "Marketing Strategist",
      review:
        "Honestly one of the best UX flows I’ve seen for a career tool. Dashboard’s intuitive, and the guidance actually feels like it adapts to your role. Super polished end-to-end.",
    },
    {
      id: 5,
      initials: "KM",
      name: "Kelechi M.",
      title: "Data Analyst",
      review:
        "Two interviews in a week. The resume edits and interview prep actually work. It’s focused and fast.",
    },

    {
      id: 6,
      initials: "MO",
      name: "Muna Olayemi",
      title: "UX Researcher",
      review:
        "The resume templates are modern, simple, and actually highlight your skills. I sent mine out with confidence. The AI feedback nailed tone and structure too.",
    },
    {
      id: 7,
      initials: "LC",
      name: "Lena Chen",
      title: "Technical Writer",
      review:
        "Straight to the point. Clean UI. Smart feedback suggestions. Helped my resume get seen.",
    },
    {
      id: 8,
      initials: "BA",
      name: "Bilal Adebayo",
      title: "Cloud Architect",
      review:
        "From CV feedback to mock interviews, it all felt practical. It’s not fluff content. You get real output — faster, clearer, and job-focused. My only regret was not using it sooner.",
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
      delay={0.3}
      className=" flex flex-col gap-6  overflow-hidden items-center"
    >
      <h2 className="shadow-sm shadow-[#b6b6b6] border-[#1f1f1f] px-4 py-2 border-2 rounded-4xl">
        Testimonials
      </h2>
      <h3 className="text-3xl lg:text-6xl text-center">
        Here's what our clients say
      </h3>
      {/* small screen */}
      <div className="flex flex-col gap-4 md:hidden">
        {reviews.slice(0, 3).map((review, index) => (
          <TestimonialCard {...review} key={index} />
        ))}
      </div>
      {/* large screen */}
      <FadeContent
        blur={true}
        easing="ease-out"
        initialOpacity={0}
        delay={0.2}
        duration={2000}
        className="flex flex-col gap-6 items-center"
      >
        <div className="hidden md:block p-4  mask-radial-from-90% mask-x-from-90% mx-auto container  overflow-hidden   border-white">
          <MarqueeEffect>
            {reviews.map((review, index) => (
              <TestimonialCard {...review} key={index} />
            ))}
          </MarqueeEffect>
        </div>
      </FadeContent>
    </AnimatedContent>
  );
};

export default Testimonials;
