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

interface FormLayoutProps {
  title: string;
  accountPrompt: string;
  linkText: string;
  linkTo: string;
  btnText: string;
}
const FormLayout = ({
  title,
  accountPrompt,
  linkText,
  linkTo,
  btnText,
}: FormLayoutProps) => {
  const form = useForm({
    resolver: undefined,
    defaultValues: {
      email: "",
      password: "",
    },
  });
  return (
    <Form {...form}>
      <form className="flex flex-col items-center justify-center gap-4 h-screen">
        <Link href={"/"} className="">
          <GiArtificialHive className="text-4xl" />
        </Link>
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-subheadline">
          {accountPrompt}{" "}
          <span className="text-[#0d828a] hover:text-[#49a6ad] transition-all duration-300 ease-in-out">
            <Link href={linkTo}>{linkText}</Link>
          </span>
        </p>
        <div className="flex flex-col gap-6 w-full">
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
  );
};

export default FormLayout;
