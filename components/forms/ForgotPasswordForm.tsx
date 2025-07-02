"use client";

import React, { useState } from "react";
import AnimatedContent from "@/components/Animations/AnimatedContent/AnimatedContent";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { GiArtificialHive } from "react-icons/gi";
import { ImSpinner9 } from "react-icons/im";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "sonner";

const FormSchema = z.object({
  email: z.string().email(),
});
const ForgotPasswordForm = () => {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      setLoading(true);
      const res = await axios.post("/api/auth/forgot-password", {
        email: data.email,
      });
      console.log("res", res);
      if (res.status === 200) {
        toast.success("Password reset link has been sent.");
      }
    } catch (error) {
      console.log("error", error);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
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
      className="w-full flex  mx-auto items-center justify-center px-6 sm:min-w-[300px] sm:max-w-[400px]"
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
            Forgot Password?
          </h1>
          <p className="text-subheadline text-center">
            Enter your email and we’ll send you a password reset link.
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

            <Button type="submit" className="cursor-pointer">
              {loading ? (
                <span className="animate-spin">
                  <ImSpinner9 />
                </span>
              ) : (
                " Submit"
              )}
            </Button>
          </div>
          <div className=" mt-10 bg-gradient-to-r from-[#0a0a0a] via-[#0d828a] to-[#0a0a0a] h-[1px] w-full"></div>
          <p className="text-white">
            Already have an account?
            <span className="text-[#0d828a] pl-1 hover:text-[#49a6ad] transition-all duration-300 ease-in-out">
              <Link href="/login">Login</Link>
            </span>
          </p>
        </form>
      </Form>
    </AnimatedContent>
  );
};

export default ForgotPasswordForm;
