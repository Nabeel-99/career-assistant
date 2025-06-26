import FeedbackCard from "@/components/practiceui/FeedbackCard";
import React from "react";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  return <FeedbackCard id={id} />;
};

export default page;
