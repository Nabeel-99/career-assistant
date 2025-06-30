"use client";

import React, { useState } from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "sonner";
import { ImSpinner9 } from "react-icons/im";
import { signOut } from "next-auth/react";

const DeleteAccountCard = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const deleteAccount = async () => {
    try {
      setLoading(true);
      const res = await axios.delete("/api/account/profile");
      if (res.status === 200) {
        await signOut({ callbackUrl: "/" });
        setOpen(false);
      }
    } catch (err) {
      console.log(err);
      toast.error("Error deleting account");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Delete Account</CardTitle>
        <CardDescription>
          Once deleted, your account and all associated data will be gone
          forever.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogTrigger asChild>
            <Button className="bg-red-600 hover:bg-red-500 text-white">
              Delete account
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>No</AlertDialogCancel>
              <Button disabled={loading} onClick={deleteAccount}>
                {loading ? (
                  <span className="animate-spin">
                    <ImSpinner9 />
                  </span>
                ) : (
                  "Yes"
                )}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
};

export default DeleteAccountCard;
