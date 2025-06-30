"use client";

import React, { useState } from "react";
import Link from "next/link";

import { GiArtificialHive } from "react-icons/gi";
import { FaEye, FaEyeSlash, FaGithub, FaGoogle } from "react-icons/fa";
import { ImSpinner9 } from "react-icons/im";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import AnimatedContent from "../Animations/AnimatedContent/AnimatedContent";
import { z } from "zod";
import { signInWithGithub, signInWithGoogle } from "@/lib/action";

interface FormLayoutProps {
  title: string;
  accountPrompt: string;
  linkText: string;
  linkTo: string;
  btnText: string;
  isSignup?: boolean;
  schema?: any;
  defaultValues?: object;
  errorMessage?: string;
  loading?: boolean;
  onSubmit: (values: any) => Promise<void>;
}

const FormLayout = ({
  title,
  accountPrompt,
  linkText,
  linkTo,
  btnText,
  isSignup,
  defaultValues,
  schema,
  onSubmit,
  errorMessage,
  loading,
}: FormLayoutProps) => {
  // type SignUpFormData = z.infer<typeof SignUpSchema>;
  // type LoginFormData = z.infer<typeof LoginSchema>;
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });

  return (
    <AnimatedContent
      distance={40}
      direction="vertical"
      reverse={false}
      duration={0.8}
      ease="power3.out"
      initialOpacity={0}
      animateOpacity
      scale={1}
      threshold={0.2}
      delay={0.2}
      className="w-full flex items-center justify-center px-6 sm:min-w-[300px] sm:max-w-[400px]"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col items-center justify-center gap-4 h-screen w-full "
        >
          <Link href={"/"} className="">
            <GiArtificialHive className="text-4xl" />
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-[#ababab]">
            {title}
          </h1>
          <p className="text-subheadline">
            {accountPrompt}{" "}
            <span className="text-[#0d828a] hover:text-[#49a6ad] transition-all duration-300 ease-in-out">
              <Link href={linkTo}>{linkText}</Link>
            </span>
          </p>
          <div className="flex flex-col gap-6 w-full">
            {isSignup && (
              <>
                <FormField
                  control={form.control}
                  name="firstname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter first name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter last name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="password"
                        {...field}
                      />
                    </FormControl>
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute top-1/2 right-2 -translate-y-1/2 text-muted-foreground"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="cursor-pointer">
              {loading ? (
                <span className="animate-spin">
                  <ImSpinner9 />
                </span>
              ) : (
                btnText
              )}
            </Button>
            {errorMessage && (
              <p className="text-red-500 text-sm transition-all duration-300 ease-in-out">
                {errorMessage}
              </p>
            )}
          </div>
          <div className=" mt-10 bg-gradient-to-r from-[#0a0a0a] via-[#0d828a] to-[#0a0a0a] h-[1px] w-full"></div>
          <Button
            type="button"
            onClick={() => signInWithGoogle()}
            className="flex bg-zinc-800 hover:bg-zinc-700  text-white items-center gap-2 w-full cursor-pointer"
          >
            <FaGoogle />
            Continue with email
          </Button>
          <Button
            type="button"
            onClick={() => signInWithGithub()}
            className="flex bg-zinc-800 hover:bg-zinc-700 text-white items-center gap-2 w-full cursor-pointer"
          >
            <FaGithub />
            Continue with github
          </Button>
        </form>
      </Form>
    </AnimatedContent>
  );
};

export default FormLayout;
