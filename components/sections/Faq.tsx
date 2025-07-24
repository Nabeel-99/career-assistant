import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import AnimatedContent from "../Animations/AnimatedContent/AnimatedContent";

const Faq = () => {
  const questions = [
    {
      id: 1,
      question: "What file formats can I upload for my CV?",
      answer:
        "You can upload your CV in PDF or DOCX format. We recommend a clean, professional layout for best results.",
    },
    {
      id: 2,
      question: "Is my uploaded CV stored or shared with others?",
      answer:
        "No, your CV is not shared with any third parties. It’s processed securely to provide personalized insights, then safely stored in your account.",
    },
    {
      id: 3,
      question: "Can I use this platform without a job description?",
      answer:
        "Yes. While uploading a job description improves personalization, our AI can still analyze your CV and offer general feedback and interview questions.",
    },
    {
      id: 4,
      question: "What kind of interview questions should I expect?",
      answer:
        "You’ll get AI-generated questions based on your CV and job title. You can choose difficulty levels: Entry Level, Mid-Level, or Senior-Level.",
    },
    {
      id: 5,
      question: " Can I download my optimized CV after getting feedback?",
      answer:
        "Yes! Once you’ve refined your CV using our suggestions, you can download an improved version as a PDF.",
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
      delay={0}
      className=" flex flex-col gap-6 items-center"
    >
      <h2 className="shadow-sm shadow-[#b6b6b6] border-[#1f1f1f] px-4 py-2 border-2 rounded-4xl">
        FAQ
      </h2>
      <h3 className="text-3xl text-center">Everything you need to know</h3>
      <div className="w-full max-w-4xl">
        <Accordion
          type="single"
          collapsible
          className="w-full flex flex-col gap-4"
          defaultValue="item-1"
        >
          {questions.map((question) => (
            <AccordionItem
              className=""
              key={question.id}
              value={`item-${question.id}`}
            >
              <AccordionTrigger className="text-lg ">
                <h3 className="hover:text-white transition-all duration-300 ease-in-out">
                  {question.question}
                </h3>
              </AccordionTrigger>
              <AccordionContent className="text-lg">
                <p className="">{question.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </AnimatedContent>
  );
};

export default Faq;
