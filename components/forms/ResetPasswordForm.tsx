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
import { z } from "zod";
import { strongPassword } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ImSpinner9 } from "react-icons/im";
import { FaEye, FaEyeSlash } from "react-icons/fa";
const FormSchema = z.object({
  newPassword: strongPassword,
  confirmPassword: strongPassword,
});
const ResetPasswordForm = ({ token }: { token: string }) => {
  const [loading, setLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error("Password must match");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post("/api/auth/reset-password", {
        token,
        newPassword: data.newPassword,
      });
      console.log("res", res);
      if (res.status === 200) {
        toast.success("Password updated successfully.");
        form.setValue("newPassword", "");
        form.setValue("confirmPassword", "");
        router.push("/login");
      }
    } catch (error: any) {
      console.log("error", error);
      if (error.response.status === 400) {
        toast.error("Reset link has expired. Please request a new one.");
        router.push("/forgot-password");
      } else {
        toast.error("Something went wrong. Please try again later.");
      }
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
            Reset Your Password
          </h1>
          <p className="text-subheadline text-center">
            Enter your new password below.
          </p>
          <div className="flex flex-col gap-6 w-full">
            <FormField
              name="newPassword"
              control={form.control}
              render={({ field }) => (
                <FormItem className="grid gap-3">
                  <FormLabel>New Password</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        type={showNewPassword ? "text" : "password"}
                        id="newPassword"
                        {...field}
                        className="pr-10"
                      />
                    </FormControl>
                    <button
                      type="button"
                      onClick={() => setShowNewPassword((prev) => !prev)}
                      className="absolute top-1/2 right-2 -translate-y-1/2 text-muted-foreground"
                    >
                      {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="confirmPassword"
              control={form.control}
              render={({ field }) => (
                <FormItem className="grid gap-3">
                  <FormLabel>Confirm Password</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        {...field}
                        className="pr-10"
                      />
                    </FormControl>
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      className="absolute top-1/2 right-2 -translate-y-1/2 text-muted-foreground"
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
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
                "Submit"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </AnimatedContent>
  );
};

export default ResetPasswordForm;
