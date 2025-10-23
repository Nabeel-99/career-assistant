"use client";

import React, { useEffect, useState } from "react";
import { Textarea } from "../ui/textarea";
import { IoMicOutline } from "react-icons/io5";
import { FaArrowUp } from "react-icons/fa6";
import { FaStop } from "react-icons/fa";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { RiVoiceprintLine } from "react-icons/ri";
type ChatInputProps = {
  input: string;
  setInput: (input: string) => void;
  stop: () => void;
  handleSubmit: (e: React.FormEvent) => void;
  hasStarted: boolean;
  status: string;
  setHasStarted: (hasStarted: boolean) => void;
};
const ChatInput = ({
  input,
  setInput,
  stop,
  handleSubmit,
  hasStarted,
  setHasStarted,
  status,
}: ChatInputProps) => {
  const [mounted, setMounted] = useState(false);
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    if (listening && transcript) {
      setInput(transcript);
    }
  }, [transcript, listening]);

  const handleMicClick = () => {
    console.log("clicked");
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      // resetTranscript();
      // setInput("");
      //   setHasStarted(true);
      SpeechRecognition.startListening({ continuous: true });
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="border mb-4 p-2 rounded-xl bg-white/90   dark:bg-[#171717]  backdrop-blur-md w-full  flex  gap-4 items-end "
    >
      <Textarea
        placeholder="type here..."
        value={input}
        disabled={!hasStarted}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
          }
        }}
        className="max-h-60 bg-transparent dark:bg-[#171717] border-none border-0 w-full min-h-0 flex items-center focus-visible:ring-0 resize-none shadow-none"
      />
      <div className="flex items-center gap-1">
        {mounted && (
          <button
            onClick={handleMicClick}
            type="button"
            className="p-2 rounded-full cursor-pointer"
          >
            {listening ? (
              <RiVoiceprintLine className="size-5 animate-pulse text-blue-300" />
            ) : (
              <IoMicOutline className="size-5" />
            )}

            <span className="sr-only">mic</span>
          </button>
        )}

        {status === "streaming" ? (
          <button
            type="button"
            onClick={stop}
            disabled={!hasStarted || (!input.trim() && status !== "streaming")}
            className="p-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-black/60 rounded-full bg-black"
          >
            <FaStop className="size-3 text-white" />
            <span className="sr-only">stop</span>
          </button>
        ) : (
          <button
            type="submit"
            onClick={() => SpeechRecognition.stopListening()}
            disabled={!hasStarted || !input.trim()}
            className="p-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-black/60 rounded-full bg-black"
          >
            <FaArrowUp className="size-3 text-white" />
            <span className="sr-only">send</span>
          </button>
        )}
      </div>
    </form>
  );
};

export default ChatInput;
