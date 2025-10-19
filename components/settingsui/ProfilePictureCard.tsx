import React, { ChangeEvent } from "react";
import { Skeleton } from "../ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
type ProfilePictureCardProps = {
  uploading: boolean;
  avatarUrl: string;
  user: any;
  handleFileUpload: (e: ChangeEvent<HTMLInputElement>) => void;
};
const ProfilePictureCard = ({
  uploading,
  avatarUrl,
  user,
  handleFileUpload,
}: ProfilePictureCardProps) => {
  return (
    <div className="flex items-center gap-6">
      {uploading ? (
        <Skeleton className="w-full rounded-full size-20 xl:size-29" />
      ) : (
        <Avatar className="size-20 xl:size-28">
          <AvatarImage
            src={`${avatarUrl}?v=${Date.now()}`}
            alt={user?.firstname!}
            className="backdrop-blur-lg rounded-full object-cover bg-white/40"
          />
          <AvatarFallback>{user?.firstname}</AvatarFallback>
        </Avatar>
      )}
      <Label
        htmlFor="file"
        className=" px-4 py-3  rounded-md cursor-pointer bg-primary text-white hover:bg-primary/90 dark:text-black"
      >
        Edit Profile picture
      </Label>
      <Input
        id="file"
        type="file"
        accept="image/*"
        hidden
        onChange={handleFileUpload}
      />
    </div>
  );
};

export default ProfilePictureCard;
