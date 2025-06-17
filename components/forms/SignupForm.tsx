"use client";

import React, { useState } from "react";
import FormLayout from "../FormLayout";
import { SignUpSchema } from "@/lib/validation";
import { signup } from "@/lib/action";
import { useRouter } from "next/navigation";

const SignupForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const defaultValues = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  };

  const onSubmit = async (values: {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
  }) => {
    try {
      setLoading(true);
      const data = values;
      const user = await signup(data);
      if (user) {
        console.log("user", user);
        router.push("/login");
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <FormLayout
      title="Create an account"
      accountPrompt="Already have an account?"
      linkText="Login"
      linkTo="/login"
      btnText="Sign up"
      isSignup={true}
      schema={SignUpSchema}
      defaultValues={defaultValues}
      onSubmit={onSubmit}
      loading={loading}
    />
  );
};

export default SignupForm;
