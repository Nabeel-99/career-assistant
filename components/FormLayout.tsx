"use client";

import React from "react";
import Link from "next/link";

import { GiArtificialHive } from "react-icons/gi";
import { FaGoogle } from "react-icons/fa";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import AnimatedContent from "./Animations/AnimatedContent/AnimatedContent";

interface FormLayoutProps {
  title: string;
  accountPrompt: string;
  linkText: string;
  linkTo: string;
  btnText: string;
  isSignup?: boolean;
}
const FormLayout = ({
  title,
  accountPrompt,
  linkText,
  linkTo,
  btnText,
  isSignup,
}: FormLayoutProps) => {
  const form = useForm({
    resolver: undefined,
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    },
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
      className="w-full flex items-center justify-center px-6 lg:min-w-[300px] lg:max-w-[400px]"
    >
      <Form {...form}>
        <form className="flex flex-col items-center justify-center gap-4 h-screen w-full ">
          <Link href={"/"} className="">
            <GiArtificialHive className="text-4xl" />
          </Link>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-[#ababab]">
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="cursor-pointer">
              {btnText}
            </Button>
          </div>
          <div className=" mt-10 bg-gradient-to-r from-[#0a0a0a] via-[#0d828a] to-[#0a0a0a] h-[1px] w-full"></div>
          <Button
            type="button"
            className="flex items-center gap-2 w-full cursor-pointer"
          >
            <FaGoogle />
            Continue with email
          </Button>
        </form>
      </Form>
    </AnimatedContent>
  );
};

export default FormLayout;
