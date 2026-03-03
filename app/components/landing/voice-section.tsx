import { BsMusicNoteList } from "react-icons/bs";
import type { DemoUser } from "@/lib/resources";
import { SectionHeader } from "./section-header";
import { VoiceManagementPanel } from "./voice-management-panel";
import { VoiceSetupPanel } from "./voice-setup-panel";

export function VoiceSection({ users }: { users: DemoUser[] }) {
  const user = users.at(0);

  return (
    <>
      <SectionHeader
        className="lg:col-span-2"
        description={
          <>
            <span>Create, manage, and customize voice channels with ease.</span>
            <span className="inline px-1 md:block">
              Incorporate our music features for a seamless experience.
            </span>
          </>
        }
        icon={BsMusicNoteList}
        title={["Top Notch", "Voice Management"]}
      />
      <div className="grid grid-cols-1 gap-6 lg:col-span-2 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          <VoiceSetupPanel user={user} />
        </div>
        <div className="order-1 lg:order-2">
          <VoiceManagementPanel users={users} />
        </div>
      </div>
    </>
  );
}
