import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { User } from "@/lib/generated/prisma";
import PaymentButton from "../practiceui/PaymentButton";

type UpgradeCardProps = {
  span1?: string;
  span2?: string;
  span3?: string;
  plan?: string;
  user?: User | null;
  isUpgrade?: boolean;
  features?: string[];
};
const UpgradeCard = ({
  span1,
  span2,
  plan,
  isUpgrade = false,
  features,
  span3,
  user,
}: UpgradeCardProps) => {
  return (
    <Card className="flex flex-col gap-2">
      <CardHeader className="h-16">
        <CardTitle className="flex flex-col">
          <span className="text-sm">{span1}</span>{" "}
          {isUpgrade ? (
            <p className="text-2xl">
              {span2}
              <span className="text-sm opacity-60">{span3}</span>
            </p>
          ) : (
            <span className="text-2xl">{span2}</span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isUpgrade ? (
          <PaymentButton user={user!} />
        ) : (
          <div className="border text-center rounded-full p-2">
            <p>{plan}</p>
          </div>
        )}

        <div className="flex flex-col mt-4 gap-2">
          <p>Features</p>
          <ul className="text-sm pl-3 list-disc">
            {features?.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
            {/* <li>Limited coding challenges</li>
            <li>Limited AI mock interview credits</li>
            <li>Resume upload & parsing</li>
            <li>Basic Feedback</li> */}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default UpgradeCard;
