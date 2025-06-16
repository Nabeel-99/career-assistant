"use client";

import React from "react";
import FormLayout from "../FormLayout";

const SignupForm = () => {
  return (
    <FormLayout
      title="Create an account"
      accountPrompt="Already have an account?"
      linkText="Login"
      linkTo="/login"
      btnText="Sign up"
      isSignup={true}
    />
  );
};

export default SignupForm;
