import React from "react";

type TestimonialProps = {
  review: string;
  initials: string;
  name: string;
  title: string;
};
const TestimonialCard = ({
  review,
  initials,
  name,
  title,
}: TestimonialProps) => {
  return (
    <div className="backdrop-blur-2xl bg-black/40 md:hover:scale-105 transition-all duration-300 ease-in-out  rounded-xl h-full  md:hover:outline-4 md:hover:outline-offset-2 md:hover:shadow-2xs">
      <div className="flex flex-col   text-subheadline cursor-pointer hover:text-white w-full md:w-sm md:max-w-sm transition-all duration-300 ease-in-out border h-full border-[#1f1f1f] rounded-xl">
        <div className="p-4  ">
          <p className="">{review}</p>
        </div>
        <div className="border-t pt-3">
          <div className="flex px-4 pb-4 items-center  gap-2 ">
            <div className="h-12 w-12 rounded-full p-2 flex items-center justify-center font-bold border">
              {initials}
            </div>
            <div className="flex flex-col">
              <p>{name}</p>
              <p className="text-sm">{title}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
