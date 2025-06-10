import React from "react";
import TestimonialCard from "./TestimonialCard";
import MarqueeEffect from "./MarqueeEffect";

const Testimonials = () => {
  const reviews = [
    {
      id: 1,
      initials: "FN",
      name: "Farouq Nabeel",
      title: "Product Designer",
      review:
        "Honestly, this tool made job hunting way less stressful. The AI feedback after mock interviews? Super useful.",
    },
    {
      id: 2,
      initials: "SJ",
      name: "Sarah Johnson",
      title: "Frontend Developer",
      review:
        "I wasn’t sure at first, but wow — the interview practice feels *real*. And the CV feedback? Spot on!",
    },
    {
      id: 3,
      initials: "KM",
      name: "Kelechi M.",
      title: "Data Analyst",
      review:
        "I literally landed 2 interviews within a week of using this. The AI insights helped me clean up my CV big time.",
    },
    {
      id: 4,
      initials: "AL",
      name: "Anika Lopez",
      title: "Marketing Strategist",
      review:
        "Super smooth UX, love the dashboard. The career tips feel personalized, not generic. Big win.",
    },
    {
      id: 5,
      initials: "DR",
      name: "Daniel R.",
      title: "Software Engineer Intern",
      review:
        "I used this to prep for my Google interview — no cap, it helped me stay calm and focused. Definitely recommending!",
    },
    {
      id: 6,
      initials: "MO",
      name: "Muna Olayemi",
      title: "UX Researcher",
      review:
        "CV templates are clean and modern. I finally feel confident sending mine out. The interview prep? Gold.",
    },
  ];
  return (
    <div className=" flex flex-col gap-6  overflow-hidden items-center">
      <h1 className="shadow-sm shadow-[#b6b6b6] border-[#1f1f1f] px-4 py-2 border-2 rounded-4xl">
        Testimonials
      </h1>
      <h1 className="text-3xl lg:text-6xl text-center">
        Here's what our clients say
      </h1>
      <div>
        <MarqueeEffect>
          {reviews.map((review, index) => (
            <TestimonialCard {...review} key={index} />
          ))}
        </MarqueeEffect>
      </div>
    </div>
  );
};

export default Testimonials;
