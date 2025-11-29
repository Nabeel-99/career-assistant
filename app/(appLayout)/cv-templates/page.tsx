"use client";

import React, { useEffect, useState } from "react";
import CvTemplatesContainer from "@/components/cvtemplatesui/CvTemplatesContainer";
import UserCVTemplates from "@/components/cvtemplatesui/UserCVTemplates";
import { templates } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AtsAnalyzerCard from "@/components/cvtemplatesui/AtsAnalyzerCard";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { fetchUser } from "@/lib/actions/user";
import { User } from "@/lib/generated/prisma";
import { toast } from "sonner";

const page = () => {
  const [user, setUser] = useState<User | null>(null);
  const [showBetaModal, setShowBetaModal] = useState(true);
  const userDetails = async () => {
    try {
      const res = await fetchUser();
      setUser(res);
    } catch (error) {
      toast.error("Error fetching user details");
    }
  };
  useEffect(() => {
    userDetails();
  }, []);

  if (!user) {
    return null;
  }

  return (
    <>
      <Tabs defaultValue="cv-builder">
        <TabsList>
          <TabsTrigger value="cv-builder">CV Builder</TabsTrigger>
          <TabsTrigger value="cv-analyzer">CV Analyzer</TabsTrigger>
        </TabsList>
        <TabsContent value="cv-builder">
          <div className="flex flex-col gap-4 mt-4">
            <UserCVTemplates userId={user?.id!} />
            <div className="flex flex-col gap-1 mt-4">
              <h1 className="text-sm">Browse CV Templates</h1>
              <CvTemplatesContainer templates={templates} userId={user?.id!} />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="cv-analyzer">
          {!user.betaUser ? (
            <Dialog open={showBetaModal} onOpenChange={setShowBetaModal}>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Beta Access Required</DialogTitle>
                  <DialogDescription>
                    ATS Analyzer is currently in beta testing. Want early
                    access?
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                  <p className="text-sm text-muted-foreground">
                    DM or comment on Twitter/X to request beta access and be
                    among the first to try our ATS Analyzer tool.
                  </p>
                  <Button
                    onClick={() =>
                      window.open("https://x.com/ndev_99", "_blank")
                    }
                    className="w-full"
                  >
                    Request Beta Access on Twitter
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          ) : (
            <div className="flex flex-col">
              <AtsAnalyzerCard userId={user.id} />
            </div>
          )}
        </TabsContent>
      </Tabs>
    </>
  );
};

export default page;
