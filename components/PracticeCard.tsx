import React from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
const PracticeCard = () => {
  return (
    <div className="flex flex-col border rounded-lg p-4 xl:h-[400px]">
      <div className="border rounded-lg p-4">
        <img
          src={"https://seekvectors.com/files/download/Amazon-Logo-07.png"}
          alt=""
          className="h-[100px] w-full object-contain"
        />
      </div>
      <div className="flex flex-col justify-between text-sm h-full">
        <div className="mt-2 flex flex-col gap-2">
          <p className="text-base font-bold">Frontend Developer Interview</p>
          <p>
            Level: <span>Entry Level</span>
          </p>
          <p>
            {" "}
            A mock session tailored for a frontend role at Amazon, focusing on
            React and UI performance.
          </p>
          <div className="flex items-center gap-10 text-sm">
            <div className="flex items-center gap-1">
              <FaRegCalendarAlt />
              <p className="text-nowrap">June 22, 2025</p>
            </div>
            <div className="flex items-center gap-1">
              <FaStar />
              <p>83/100</p>
            </div>
          </div>
        </div>
        <div className="flex items-center mt-6 xl:mt-0 justify-between">
          <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 ">
            <Avatar>
              <AvatarImage
                src="https://img.icons8.com/fluent-systems-filled/200/FFFFFF/nextjs.png"
                alt="@shadcn"
                className=""
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlGmKtrnxElpqw3AExKXPWWBulcwjlvDJa1Q&s"
                alt="@leerob"
                className=" "
              />
              <AvatarFallback>LR</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage
                src="https://icon2.cleanpng.com/20180810/ekz/11448a7a96ee808a3cdbaf0df9570976.webp"
                alt="@evilrabbit"
                className="  "
              />
              <AvatarFallback>ER</AvatarFallback>
            </Avatar>
          </div>
          <Button>Start Practice</Button>
        </div>
      </div>

      {/* <p>8 Questions</p> */}
    </div>
  );
};

export default PracticeCard;
