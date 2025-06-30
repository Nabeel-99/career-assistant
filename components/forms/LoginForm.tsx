"use client";

import React, { useState } from "react";

import FormLayout from "./FormLayout";
import { LoginSchema } from "@/lib/validation";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
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
      if (res?.ok && !res.error) {
        router.push("/dashboard");
      } else {
        if (res?.error) {
          setErrorMessage("Invalid email or password");
          setTimeout(() => {
            setErrorMessage("");
          }, 5000);
        }
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
      errorMessage={errorMessage}
    />
  );
};

export default LoginForm;
