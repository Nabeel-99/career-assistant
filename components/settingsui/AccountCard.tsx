"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User } from "@/lib/generated/prisma";
import { updateProfileSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { z } from "zod";
import { Skeleton } from "../ui/skeleton";
import axios from "axios";
import { toast } from "sonner";
import { ImSpinner9 } from "react-icons/im";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export function AccountCard({
  user,
  loading,
}: {
  user: User | null;
  loading: boolean;
}) {
  const [updating, setUpdating] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const form = useForm<z.infer<typeof updateProfileSchema>>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      currentPassword: "",
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        firstname: user.firstname || "",
        lastname: user.lastname || "",
        email: user.email || "",
        password: "",
        currentPassword: "",
      });
    }
  }, [user]);

  const onSubmit = async (data: z.infer<typeof updateProfileSchema>) => {
    try {
      setUpdating(true);
      const res = await axios.put("/api/account/profile", data);
      if (res.status === 200) {
        toast.success("Profile updated successfully");
      }
    } catch (error: any) {
      console.log("error", error);
    } finally {
      setUpdating(false);
    }
  };
  const onPasswordSubmit = async (
    data: z.infer<typeof updateProfileSchema>
  ) => {
    try {
      setUpdating(true);
      const res = await axios.put("/api/account/password", data);
      if (res.status === 200) {
        toast.success("Password updated successfully");
        form.setValue("password", "");
        form.setValue("currentPassword", "");
      }
    } catch (error: any) {
      console.log("error", error);
      if (error.response.status === 403) {
        setErrorMessage("Current password is incorrect");
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
      setUpdating(false);
    }
  };

  return (
    <div className="flex w-full  flex-col gap-6">
      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>
                Make changes to your account here. Click save when you&apos;re
                done.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              {loading ? (
                <div className="grid gap-6">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <Skeleton className="w-full h-10" key={index} />
                  ))}
                </div>
              ) : (
                <Form {...form}>
                  <form
                    className="grid gap-6"
                    onSubmit={form.handleSubmit(onSubmit)}
                  >
                    <FormField
                      name="firstname"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem className="grid gap-3">
                          <FormLabel>First name</FormLabel>
                          <FormControl>
                            <Input type="text" id="firstname" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="lastname"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem className="grid gap-3">
                          <FormLabel>Last name</FormLabel>
                          <FormControl>
                            <Input type="text" id="lastname" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="email"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem className="grid gap-3">
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" id="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex justify-start">
                      <Button type="submit" disabled={updating}>
                        {updating ? (
                          <span>
                            <ImSpinner9 className="animate-spin" />
                          </span>
                        ) : (
                          "Save changes"
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password here. Make sure it's strong and secure.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <Form {...form}>
                <form
                  className="grid gap-6"
                  onSubmit={form.handleSubmit(onPasswordSubmit)}
                >
                  {user?.password && (
                    <FormField
                      name="currentPassword"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem className="grid gap-3">
                          <FormLabel>Current Password</FormLabel>
                          <div className="relative">
                            <FormControl>
                              <Input
                                type={showCurrentPassword ? "text" : "password"}
                                id="currentPassword"
                                {...field}
                                className="pr-10"
                              />
                            </FormControl>
                            <button
                              type="button"
                              onClick={() =>
                                setShowCurrentPassword((prev) => !prev)
                              }
                              className="absolute top-1/2 right-2 -translate-y-1/2 text-muted-foreground"
                            >
                              {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    name="password"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="grid gap-3">
                        <FormLabel>New Password</FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input
                              type={showPassword ? "text" : "password"}
                              id="password"
                              {...field}
                              className="pr-10"
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
                  {errorMessage && (
                    <p className="text-red-500 text-sm transition-all duration-300 ease-in-out">
                      {errorMessage}
                    </p>
                  )}
                  <div className="flex justify-start">
                    <Button type="submit" disabled={updating}>
                      {updating ? (
                        <span>
                          <ImSpinner9 className="animate-spin" />
                        </span>
                      ) : (
                        "Save password"
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
