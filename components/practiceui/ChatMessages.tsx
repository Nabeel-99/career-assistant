"use client";

import { UIMessage } from "ai";
import React from "react";
import { Streamdown } from "streamdown";

type ChatMessagesProps = {
  messages: UIMessage[];
  status: string;
  messagesEndRef: any;
};
const ChatMessages = ({
  messages,
  status,
  messagesEndRef,
}: ChatMessagesProps) => {
  return (
    <div className="mt-60 pt-10 md:mt-40 pb-[50vh] lg:pb-[40vh] ">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`mb-4 flex ${
            msg.role === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`inline-block max-w-[80%] h-full p-3 rounded-lg whitespace-pre-wrap ${
              msg.role === "user"
                ? "bg-black dark:bg-[#171717]  text-white"
                : "bg-gray-100 dark:bg-zinc-800"
            }`}
          >
            {msg.parts.map((part, i) => {
              if (part.type === "text") {
                const cleanText = part.text.replace(/\n{2,}/g, "\n\n");
                return (
                  <Streamdown
                    key={i}
                    components={{
                      h1: ({ children }) => (
                        <h1 className="text-2xl font-bold mb-4">{children}</h1>
                      ),
                      h2: ({ children }) => (
                        <h2 className="text-xl font-semibold mb-4">
                          {children}
                        </h2>
                      ),
                      p: ({ children }) => (
                        <p className="leading-relaxed mb-3">{children}</p>
                      ),
                      li: ({ children }) => (
                        <ul>
                          <li className="mb-2">{children}</li>
                        </ul>
                      ),
                      table: ({ children }) => (
                        <table className="border-collapse border border-gray-300 my-4">
                          {children}
                        </table>
                      ),
                      th: ({ children }) => (
                        <th className="border border-gray-300 px-3 py-1 bg-gray-100">
                          {children}
                        </th>
                      ),
                      td: ({ children }) => (
                        <td className="border border-gray-300 px-3 py-1">
                          {children}
                        </td>
                      ),
                      code: ({ children, className }) => {
                        const isInline = !className;
                        return isInline ? (
                          <code className="bg-[#eeeeee]  mb-3 dark:bg-[#151515] border px-1 py-0.5 rounded text-sm font-mono">
                            {children}
                          </code>
                        ) : (
                          <pre className="bg-[#eeeeee] mb-3 dark:bg-[#151515] border p-4 rounded-lg overflow-x-auto">
                            <code className="text-sm">{children}</code>
                          </pre>
                        );
                      },
                      strong: ({ children }) => (
                        <strong className="font-semibold mb-3">
                          {children}
                        </strong>
                      ),
                    }}
                  >
                    {cleanText}
                  </Streamdown>
                );
              }
              return null;
            })}
          </div>
        </div>
      ))}

      {status === "submitted" && (
        <div className="flex items-center gap-2 justify-start mb-4">
          <div className="w-4 h-4 bg-gray-500 dark:bg-gray-300 rounded-full animate-pulse"></div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;
