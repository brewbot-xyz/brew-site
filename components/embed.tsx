import { cn } from "@/lib/utils";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import moment from "moment";
import Image from "next/image";
import AppTag from "./ui/app-tag";
import { Card, CardContent } from "./ui/card";
import { DialogBox } from "./ui/dialog";
import Profile from "./ui/profile";

export default function Embed({
  children,
  className,
  user,
  reply,
  header = true,
}: {
  children?: React.ReactNode;
  className?: string;
  user?: {
    name: string;
    avatarUrl: string;
  };
  reply?: string;
  header?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative flex flex-col space-x-4 break-words text-left min-w-sm w-full",
        className,
      )}
      role="article"
    >
      <Dialog>
        <DialogBox showCloseButton={false}>
          <Profile />
        </DialogBox>
        {header && (
          <DialogTrigger asChild>
            <div className="absolute -left-16 flex flex-col space-y-2" aria-hidden="true">
              {user && (
                <div className="ml-6 mt-3 h-3 w-9 rounded-tl-lg border-l-2 border-t-2 border-white/15"></div>
              )}
              <div className="relative h-12 w-12">
                <Image
                  draggable={false}
                  src="/assets/brew.png"
                  alt="Brew's Avatar"
                  fill
                  className="aspect-square cursor-pointer rounded-full hover:mt-[2px] object-cover"
                />
              </div>
            </div>
          </DialogTrigger>
        )}
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            {user && (
              <div className="flex items-center gap-1">
                <Image
                  src={user.avatarUrl}
                  alt={`@${user.name}`}
                  width={20}
                  height={20}
                  className="inline-block size-5 cursor-pointer rounded-full opacity-50"
                />
                <span className="font-normal text-white/50">@{user.name}</span>
              </div>
            )}
            {reply && <span className="text-white/70">{reply}</span>}
          </div>
          <h2
            className={cn(
              "flex items-center gap-1.5 text-base font-normal",
              header ? "" : " invisible",
            )}
          >
            <DialogTrigger asChild>
              <span className="cursor-pointer hover:underline" aria-hidden="true">
                Brew
              </span>
            </DialogTrigger>
            <AppTag />
            <span className="text-xs text-white/50">
              <span>{moment(Date.now()).calendar()}</span>
            </span>
          </h2>
          <Card>
            <CardContent>{children}</CardContent>
          </Card>
        </div>
      </Dialog>
    </div>
  );
}
