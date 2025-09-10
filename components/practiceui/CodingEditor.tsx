"use client";

import React, { useRef, useState } from "react";
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
import axios from "axios";
import { LANGUAGE_VERSIONS } from "@/lib/utils";
import { Button } from "../ui/button";

type Language = keyof typeof LANGUAGE_VERSIONS;
const languages = Object.entries(LANGUAGE_VERSIONS);
const CodingEditor = ({ systemTheme }: { systemTheme: any }) => {
  const [value, setValue] = useState("");
  const [showEditor, setShowEditor] = useState(true);
  const [showOutput, setShowOutput] = useState(false);
  const [output, setOutput] = useState<string[]>([]);
  const [error, setError] = useState<string[]>([]);
  const [language, setLanguage] = useState<Language>("javascript");
  const [executing, setExecuting] = useState(false);
  const editorRef = useRef<null>(null);
  const onMount = (editor: any) => {
    editorRef.current = editor;
    editor.focus();
  };
  const runCode = async () => {
    setShowEditor(false);
    setExecuting(true);
    // setShowOutput(true);
    if (!value) return;
    try {
      const res = await axios.post("https://emkc.org/api/v2/piston/execute", {
        language: language,
        version: LANGUAGE_VERSIONS[language],
        files: [
          {
            content: value,
          },
        ],
      });
      console.log("res", res.data);

      setOutput(res.data.run.stdout.split("\n"));
      setError(res.data.run.stderr.split("\n"));
    } catch (error) {
      console.log("err", error);
    } finally {
      setShowOutput(true);
      setExecuting(false);
    }
  };

  return (
    <>
      <div className="flex justify-start gap-4">
        <Select
          // defaultValue="javascript"
          value={language}
          onValueChange={(selectedLanguage) => {
            console.log("selectedLanguage", selectedLanguage);
            setLanguage(selectedLanguage as Language);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {languages.map(([lang, version]) => (
                <SelectItem key={lang} value={lang} className="capitalize">
                  <span className="capitalize">{lang}</span> {version}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button disabled={executing} onClick={runCode}>
          {executing ? <ImSpinner9 className="animate-spin" /> : "Run Code"}
        </Button>
        <Button
          onClick={() => {
            setShowEditor(true);
            setShowOutput(false);
          }}
        >
          Show Code
        </Button>
      </div>
      {showEditor && (
        <Editor
          height={"620px"}
          loading={
            <Card className="flex  flex-col rounded-none   w-full items-center justify-center max-h-[620px] min-h-[620px]">
              <ImSpinner9 className="animate-spin text-xl" />
              <span className="animate-pulse">Preparing Editor</span>
            </Card>
          }
          value={value}
          onChange={(v) => setValue(v ?? "")}
          onMount={onMount}
          language={language}
          defaultValue="//start coding here"
          className=" border h-full min-h-[620px]"
          theme={`${systemTheme === "dark" ? "vs-dark" : "light"}`}
        />
      )}
      {/* {executing && (
        <Card className="flex  flex-col rounded-none   w-full items-center justify-center max-h-[620px] min-h-[620px]">
          <ImSpinner9 className="animate-spin text-xl" />
          <span className="animate-pulse">Executing Code</span>
        </Card>
      )} */}
      {showOutput && (
        <Card className="w-full min-h-[620px] max-h-[620px] overflow-scroll hide-scrollbar px-4">
          {output && (
            <pre className="whitespace-pre-wrap">{output.join("\n")}</pre>
          )}
          {error && (
            <pre className="whitespace-pre-wrap text-red-500">
              {error.join("\n")}
            </pre>
          )}
        </Card>
      )}
    </>
  );
};

export default CodingEditor;
