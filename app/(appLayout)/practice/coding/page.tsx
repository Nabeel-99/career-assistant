"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useSidebar } from "@/components/ui/sidebar";
import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { useTheme } from "next-themes";
import { User } from "@/lib/generated/prisma";
import { fetchUser } from "@/lib/action";
import { toast } from "sonner";

const page = () => {
  const sidebar = useSidebar();
  const { systemTheme } = useTheme();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // sidebar.setOpen(false);
    const getUserDetails = async () => {
      try {
        setLoading(true);
        const res = await fetchUser();
        setUser(res);
      } catch (error) {
        toast.error("Error fetching user details");
      } finally {
        setLoading(false);
      }
    };
    getUserDetails();
  }, []);
  return (
    <div className="flex gap-10 w-full">
      <section className="flex flex-col w-1/2 gap-2">
        <Card className="w-full min-h-[650px] ">
          <p className="px-4">Hey {user?.firstname}</p>
        </Card>
      </section>
      <section className="w-1/2 flex flex-col gap-2">
        <div className="flex justify-start">
          <Button>Javascript</Button>
        </div>
        <Editor
          height={"650px"}
          defaultLanguage="javascript"
          defaultValue="//start coding here"
          className="rounded-lg  h-full min-h-[650px]"
          theme={`${systemTheme === "dark" ? "vs-dark" : "light"}`}
        />
      </section>
    </div>
  );
};

export default page;
