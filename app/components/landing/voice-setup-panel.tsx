import Embed from "@/app/components/embed";
import type { DemoUser } from "@/lib/resources";
import { parseEmoji, parseInfo } from "@/lib/utils";
import { Button } from "../button";
import { Card, CardContent } from "../card";

export function VoiceSetupPanel(props: { user?: DemoUser }) {
  return (
    <div className="flex max-w-lg flex-col items-center justify-between place-self-center">
      <Embed reply=",voicemaster setup" user={props.user}>
        <section className="text-xs leading-relaxed sm:text-sm">
          Please take note that this will create at most{" "}
          <span className="font-bold">3</span> categories and{" "}
          <span className="font-bold">4</span> channels. If you have any
          antinuke enabled, make sure that it will not affect this process.
        </section>
      </Embed>
      <section className="flex w-full space-x-2 pt-2 pb-4">
        <Button
          className="px-2 py-2 text-xs sm:px-3 sm:py-1.5 sm:text-sm"
          variant="success"
        >
          Approve
        </Button>
        <Button
          className="px-2 py-2 text-xs sm:px-3 sm:py-1.5 sm:text-sm"
          variant="danger"
        >
          Decline
        </Button>
      </section>
      <Card className="w-full">
        <CardContent className="p-3 sm:p-6">
          <h3 className="flex flex-wrap items-center gap-2 font-semibold text-lg text-primary-foreground sm:text-xl">
            <span>Voicemaster Commands</span>
            <span className="hidden sm:inline">
              {parseEmoji("<:brew_commands:1362398411135123456>", 24)}
            </span>
          </h3>
          <section className="mt-2 space-y-0.5 text-primary-foreground/75 text-xs sm:text-sm">
            {parseInfo(
              `
<:white_unlock:1232100904367292479> \`vc unlock\` Unlocks your vc to other members.
<:lock:1250250408912490516> \`vc lock\` Locks your vc from other members.
<:ban:1250250746717536266> \`vc ban (user)\` Bans a user from joining your vc.
<:white_staff:1250966358326251592> \`vc unban (user)\` Unbans a user from your vc.
<:permit:1250251725491671102> \`vc permit (user)\` Allows a user to join your vc.
<:white_mute:1251845771318394911> \`vc stfu (user)\` Server mutes a user in your vc.
<:white_unmute:1251846619683356814> \`vc unmute (user)\` Server unmute a user in your vc.
<:white_crown:1251750590447358066> \`vc transfer (user)\` Transfers vc ownership to another user.
`,
            )}
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
