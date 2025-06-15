"use client";

import React from "react";

import { useForm } from "react-hook-form";

import FormLayout from "../FormLayout";
const LoginForm = () => {
  const form = useForm({
    resolver: undefined,
    defaultValues: {
      email: "",
      password: "",
    },
  });
  return (
    <FormLayout
      title="Sign into your account"
      accountPrompt="Don't have an account?"
      linkText="Sign up"
      linkTo="/signup"
      btnText="Login"
    />
  );
};

export default LoginForm;
