import React from "react";
import { Button } from "../ui/button";
import { Streamdown } from "streamdown";

type CodingProps = {
  generateTask: () => void;
  isGenerating: boolean;
  generation: string;
};
const coding = ({ generateTask, isGenerating, generation }: CodingProps) => {
  return (
    <>
      <Button onClick={generateTask} disabled={isGenerating}>
        {isGenerating ? "Generating..." : "Generate Coding Challenge"}
      </Button>

      {/* Show streaming markdown */}
      {generation && (
        <div className="mt-6">
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
                  <strong className="font-semibold mb-3">{children}</strong>
                ),
              }}
            >
              {generation.split("===JSON===")[0]}
            </Streamdown>
            {isGenerating && <span className="animate-pulse">|</span>}
          </div>
        </div>
      )}
    </>
  );
};

export default coding;
