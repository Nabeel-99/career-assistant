"use client";

import React, { useState } from "react";

import FormLayout from "./FormLayout";
import { LoginSchema } from "@/lib/validation";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const defaultValues = {
    email: "",
    password: "",
  };
  const onSubmit = async (values: { email: string; password: string }) => {
    try {
      setLoading(true);
      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });
      if (res?.ok) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <FormLayout
      title="Sign into your account"
      accountPrompt="Don't have an account?"
      linkText="Sign up"
      linkTo="/signup"
      btnText="Login"
      schema={LoginSchema}
      defaultValues={defaultValues}
      onSubmit={onSubmit}
      loading={loading}
    />
  );
};

export default LoginForm;
