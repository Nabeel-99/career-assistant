import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import UpgradeCard from "../cards/UpgradeCard";
import { User } from "@/lib/generated/prisma";

type UpgradeModalProps = {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  user: User | null;
};
const UpgradeModal = ({ showModal, setShowModal, user }: UpgradeModalProps) => {
  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Upgrade to Premium</DialogTitle>
          <DialogDescription>
            Unlock unlimited practice and exclusive AI features by upgrading
            your account.
          </DialogDescription>
        </DialogHeader>
        <div className="grid md:grid-cols-2 gap-4">
          <UpgradeCard
            span1="Basic"
            span2="Free"
            plan="Current Plan"
            features={[
              "Limited coding challenges",
              "Limited AI mock interview credits",
              "Resume upload & parsing",
              "Basic Feedback",
            ]}
          />
          <UpgradeCard
            span1="Premium"
            span2="$10"
            span3=" / month"
            isUpgrade={true}
            user={user}
            features={[
              "Unlimited coding challenges",
              "Unlimited AI mock interview credits",
              "Advanced feedback & hints",
              "CV template customization",
            ]}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpgradeModal;
