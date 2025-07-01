"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ImSpinner9 } from "react-icons/im";

type AlertDialogProps = {
  deleteLoading?: boolean;
  showDelete?: boolean;
  setShowDelete?: (showDelete: boolean) => void;
  action?: () => void;
};
export function DeleteDialog({
  showDelete,
  setShowDelete,
  action,
  deleteLoading,
}: AlertDialogProps) {
  return (
    <AlertDialog open={showDelete} onOpenChange={setShowDelete}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>No</AlertDialogCancel>
          <Button onClick={action}>
            {deleteLoading ? (
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
  );
}
