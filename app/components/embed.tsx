import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import moment from "moment";
import Image from "next/image";
import { cn } from "@/lib/utils";
import AppTag from "./app-tag";
import { Card, CardContent } from "./card";
import { DialogBox } from "./dialog";
import Profile from "./profile";

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
    <article
      className={cn(
        "relative flex w-full min-w-sm flex-col space-x-4 break-words text-left",
        className,
      )}
    >
      <Dialog>
        <DialogBox showCloseButton={false}>
          <Profile />
        </DialogBox>
        {header && (
          <DialogTrigger asChild>
            <div
              aria-hidden="true"
              className="absolute -left-16 flex flex-col space-y-2"
            >
              {user && (
                <div className="mt-3 ml-6 h-3 w-9 rounded-tl-lg border-white/15 border-t-2 border-l-2" />
              )}
              <div className="relative h-12 w-12">
                <Image
                  alt="Brew's Avatar"
                  className="aspect-square cursor-pointer rounded-full object-cover hover:mt-[2px]"
                  draggable={false}
                  fill
                  src="/assets/brew.png"
                />
              </div>
            </div>
          </DialogTrigger>
        )}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            {user && (
              <div className="flex items-center gap-1">
                <Image
                  alt={`@${user.name}`}
                  className="inline-block size-5 cursor-pointer rounded-full opacity-50"
                  height={20}
                  src={user.avatarUrl}
                  width={20}
                />
                <span className="font-normal text-white/50">@{user.name}</span>
              </div>
            )}
            {reply && <span className="text-white/70">{reply}</span>}
          </div>
          <h2
            className={cn(
              "flex items-center gap-1.5 font-normal text-base",
              header ? "" : "invisible",
            )}
          >
            <DialogTrigger asChild>
              <span
                aria-hidden="true"
                className="cursor-pointer hover:underline"
              >
                Brew
              </span>
            </DialogTrigger>
            <AppTag />
            <span className="text-white/50 text-xs">
              <span>{moment(Date.now()).calendar()}</span>
            </span>
          </h2>
          <Card>
            <CardContent>{children}</CardContent>
          </Card>
        </div>
      </Dialog>
    </article>
  );
}
