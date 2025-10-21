"use client";

import React, { useState } from "react";
import FormLayout from "./FormLayout";
import { SignUpSchema } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { signup } from "@/lib/actions/authHelpers";

const SignupForm = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
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
        router.push("/login");
      }
    } catch (error: any) {
      if (error?.message === "EMAIL_EXISTS") {
        setErrorMessage("Email already exists");
        setTimeout(() => {
          setErrorMessage("");
        }, 5000);
      } else {
        setErrorMessage("Something went wrong. Please try again later.");
        setTimeout(() => {
          setErrorMessage("");
        }, 5000);
      }
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
      errorMessage={errorMessage}
    />
  );
};

export default SignupForm;
