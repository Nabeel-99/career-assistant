import { auth } from "@/auth";
import React from "react";
import CvTemplatesContainer from "@/components/cvtemplatesui/CvTemplatesContainer";
import UserCVTemplates from "@/components/cvtemplatesui/UserCVTemplates";
import { templates } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AtsAnalyzerCard from "@/components/cvtemplatesui/AtsAnalyzerCard";
import prisma from "@/lib/prisma";

const page = async () => {
  const session = await auth();
  if (!session?.user?.id) return null;

  return (
    <>
      <Tabs defaultValue="cv-analyzer">
        <TabsList>
          <TabsTrigger value="cv-builder">CV Builder</TabsTrigger>
          <TabsTrigger value="cv-analyzer">CV Analyzer</TabsTrigger>
        </TabsList>
        <TabsContent value="cv-builder">
          <div className="flex flex-col gap-4 mt-4">
            <UserCVTemplates userId={session?.user?.id!} />
            <div className="flex flex-col gap-1 mt-4">
              <h1 className="text-sm">Browse CV Templates</h1>
              <CvTemplatesContainer
                templates={templates}
                userId={session?.user?.id!}
              />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="cv-analyzer">
          <div className="flex flex-col">
            <AtsAnalyzerCard userId={session.user.id} />
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default page;
