import { cn } from "@/lib/utils";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import moment from "moment";
import Image from "next/image";
import AppTag from "./app-tag";
import { Card } from "./card";
import { DialogBox } from "./dialog";
import Profile from "./profile";

export default function Embed({
  children,
  className,
  user,
  reply,
}: {
  children?: React.ReactNode;
  className?: string;
  user?: {
    name: string;
    avatarUrl: string;
  };
  reply?: string;
}) {
  return (
    <div className={cn("relative flex space-x-4 break-words text-left", className)} role="article">
      <Dialog>
        <DialogBox showCloseButton={false}>
          <Profile />
        </DialogBox>
        <DialogTrigger asChild>
          <div className="absolute -left-16 flex flex-col space-y-2" aria-hidden="true">
            {user && (
              <div className="ml-6 mt-3 h-3 w-9 rounded-tl-lg border-l-2 border-t-2 border-white/15"></div>
            )}
            <div className="relative h-12 w-12">
              <Image
                draggable={false}
                src="/brew.png"
                alt="Brew's Avatar"
                fill
                className="aspect-square cursor-pointer rounded-full hover:mt-[2px] object-cover"
              />
            </div>
          </div>
        </DialogTrigger>
        <div>
          <div className="flex flex-col">
            <div className="flex gap-2">
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
            <h2 className="flex items-center space-x-1.5 text-base font-normal">
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
          </div>
          {/* <article
            className={cn(
              "mt-2 rounded-3xl bg-primary-accent/25 p-4 backdrop-blur-3xl",
              "border border-primary-accent/10 text-white/90",
            )}
          > */}
          <Card>{children}</Card>
        </div>
      </Dialog>
    </div>
  );
}
