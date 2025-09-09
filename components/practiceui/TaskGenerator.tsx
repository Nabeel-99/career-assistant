import React from "react";
import { GiArtificialHive } from "react-icons/gi";
import { Streamdown } from "streamdown";

const TaskGenerator = ({
  isGenerating,
  generation,
}: {
  isGenerating: boolean;
  generation: string;
}) => {
  return isGenerating && !generation ? (
    <div className="flex flex-col gap-2 items-center h-full justify-center">
      <GiArtificialHive className="text-8xl animate-spin " />
      <p className="animate-pulse">Generating Task</p>
    </div>
  ) : (
    generation && (
      <div className="prose prose-lg max-w-none ">
        <Streamdown
          components={{
            h1: ({ children }) => (
              <h1 className="text-2xl font-bold mb-4">{children}</h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-xl font-semibold mb-4">{children}</h2>
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
              <td className="border border-gray-300 px-3 py-1">{children}</td>
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
              <strong className="font-semibold mb-3">{children}</strong>
            ),
          }}
        >
          {generation.split("===JSON===")[0]}
        </Streamdown>
        {isGenerating && <span className="animate-pulse">|</span>}
      </div>
    )
  );
};

export default TaskGenerator;
