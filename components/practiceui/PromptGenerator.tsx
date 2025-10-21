import { User } from "@/lib/generated/prisma";
import React from "react";
import TextType from "../Animations/TextType";
import { levels, suggestedStacks } from "@/lib/utils";
import { Button } from "../ui/button";

type PromptGeneratorProps = {
  user: User | null;
  typingDone: boolean;
  levelSelected: string | null;
  isLevel: boolean;
  stackSelected: string | null;
  isYes: boolean;
  generateTask: (level: string) => void;
  setStackSelected: (stackSelected: string) => void;
  showLevel: () => void;
  setIsYes: (isYes: boolean) => void;
  setTypingDone: (typingDone: boolean) => void;
  setLevelTypingDone: (levelTypingDone: boolean) => void;
};

const PromptGenerator = ({
  user,
  typingDone,
  setTypingDone,
  stackSelected,
  setStackSelected,
  isYes,
  setIsYes,
  levelSelected,
  isLevel,
  showLevel,
  generateTask,
  setLevelTypingDone,
}: PromptGeneratorProps) => {
  return (
    <div className="flex flex-col gap-4 ">
      {user && (
        <TextType
          text={`Hey ${user.firstname} 👋 What programming language would you like to practice? (You can only select one.)`}
          showCursor={false}
          hideCursorWhileTyping={true}
          typingSpeed={15}
          className=""
          onSentenceComplete={() => {
            setTypingDone(true);
          }}
        />
      )}
      {typingDone && (
        <div className="flex flex-wrap gap-2">
          {suggestedStacks.map((stack, index) => (
            <Button
              type="button"
              key={index}
              disabled={isYes}
              onClick={() => {
                if (isYes) return;

                setStackSelected(stack);
              }}
              className={`${
                stackSelected === stack && "bg-blue-600 text-white"
              } border cursor-pointer  stack px-4 py-1 rounded-lg opacity-0`}
            >
              {stack}
              {/* <span className="">stack</span> */}
            </Button>
          ))}
        </div>
      )}
      {stackSelected && (
        <div className="flex items-center gap-3">
          <p className="">Continue with {stackSelected}?</p>
          <Button
            onClick={() => {
              showLevel();
              setIsYes(true);
            }}
            disabled={isLevel}
            className={`${isYes && "bg-blue-600 text-white"} `}
          >
            Yes
          </Button>
        </div>
      )}
      {isLevel && (
        <div className="flex flex-col gap-3">
          <TextType
            text={`Great! Now pick your level.`}
            showCursor={false}
            hideCursorWhileTyping={true}
            className=""
            typingSpeed={15}
            onSentenceComplete={() => {
              setLevelTypingDone(true);
            }}
          />

          <div className="flex flex-wrap gap-2">
            {levels.map((level, index) => (
              <Button
                type="button"
                key={index}
                disabled={levelSelected === level}
                onClick={() => generateTask(level)}
                className={`${
                  levelSelected === level && "bg-blue-600 text-white"
                } border cursor-pointer level px-4 py-1 rounded-lg opacity-0`}
              >
                {level}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PromptGenerator;
