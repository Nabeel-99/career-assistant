import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImSpinner9 } from "react-icons/im";
import Editor from "@monaco-editor/react";
import { Card } from "../ui/card";
const CodingEditor = ({ systemTheme }: { systemTheme: any }) => {
  return (
    <>
      <div className="flex justify-start">
        <Select defaultValue="javascript">
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="javascript">Javascript</SelectItem>
              <SelectItem value="typescript">Typescript</SelectItem>
              <SelectItem value="python">Python</SelectItem>
              <SelectItem value="java">Java</SelectItem>
              <SelectItem value="c++">C++</SelectItem>
              <SelectItem value="c#">C#</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Editor
        height={"620px"}
        loading={
          <Card className="flex flex-col rounded-none   w-full items-center justify-center max-h-[620px] min-h-[620px]">
            <ImSpinner9 className="animate-spin text-xl" />
            <span className="animate-pulse">Preparing Editor</span>
          </Card>
        }
        defaultLanguage="javascript"
        defaultValue="//start coding here"
        className="rounded-lg  h-full min-h-[620px]"
        theme={`${systemTheme === "dark" ? "vs-dark" : "light"}`}
      />
    </>
  );
};

export default CodingEditor;
