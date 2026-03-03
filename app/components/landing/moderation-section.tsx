import Image from "next/image";
import { BsTools } from "react-icons/bs";

import Embed from "@/app/components/embed";
import type { DemoUser } from "@/lib/resources";
import { parseInfo } from "@/lib/utils";
import { SectionHeader } from "./section-header";

function CommandUser(props: { user: DemoUser }) {
  return (
    <span className="mb-3 flex items-center font-semibold">
      <Image
        alt={`${props.user.name}'s avatar`}
        className="mr-2 inline-block size-6 shrink-0 rounded-full sm:size-7"
        draggable={false}
        height={160}
        sizes="28px"
        src={props.user.avatarUrl}
        width={160}
      />
      <span className="font-medium text-sm sm:text-base">
        {props.user.name}
      </span>
    </span>
  );
}

export function ModerationSection({ users }: { users: DemoUser[] }) {
  const userC = users.at(2);
  const userD = users.at(3);

  return (
    <>
      <SectionHeader
        className="lg:col-span-2"
        description="Kick, ban, mute, and warn users with ease. View user information and audit logs."
        icon={BsTools}
        title="General Moderation"
      />
      <Embed className="max-w-md place-self-center lg:place-self-end">
        {userC ? <CommandUser user={userC} /> : null}
        <div className="flex flex-col space-y-1.5 text-base">
          <h3 className="font-semibold text-base sm:text-lg">Command: ban</h3>
          <span className="text-white/80">Bans a member from the guild.</span>
          <span>{parseInfo("<:brew_dev:1302358810458984491> **Syntax**")}</span>
          <code className="rounded bg-black/20 p-3">ban (member) (reason)</code>
          <span className="text-white/60 text-xs">Page 1/1 (1 page)</span>
        </div>
      </Embed>
      <Embed className="max-w-md place-self-center lg:place-self-start">
        {userD ? <CommandUser user={userD} /> : null}
        <div className="flex flex-col space-y-1.5 text-base">
          <h3 className="font-semibold text-base sm:text-lg">Command: mute</h3>
          <span className="text-white/80">Mutes a member in the guild.</span>
          <span>{parseInfo("<:brew_dev:1302358810458984491> **Syntax**")}</span>
          <code className="rounded bg-black/20 p-4">
            mute (member) (reason)
          </code>
          <span className="text-white/60 text-xs">Page 1/1 (1 page)</span>
        </div>
      </Embed>
    </>
  );
}
