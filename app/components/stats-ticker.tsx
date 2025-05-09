import { trpc } from "@/lib/trpc";
import { AnimationScope } from "motion/react";
import React from "react";
import { BsPeopleFill } from "react-icons/bs";
import DiscordServer from "./icons/discord-server";

function NumberTicker({
  scope,
  animate,
  duration = 3000,
}: {
  scope: AnimationScope;
  animate: (element: AnimationScope, props: unknown) => void;
  duration?: number;
}) {
  const [counters, setCounters] = React.useState({
    users: 0,
    guilds: 0,
  });

  const { data: stats } = trpc.brew.stats.useQuery(void 0, {
    initialData: { shards: [] },
    refetchOnMount: "always",
    select: ({ shards }) =>
      !shards.length
        ? { guilds: 0, users: 0 }
        : shards.reduce(
            (acc: typeof counters, shard) => {
              acc.guilds += shard.server_count;
              acc.users += shard.user_count;
              return acc;
            },
            { guilds: 0, users: 0 }
          ),
  });

  React.useEffect(() => {
    if ([stats.guilds, stats.users].some((v) => v > 0))
      animate(scope.current, { y: 0, opacity: 1 });
    else return;

    const start = performance.now();
    const increment = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);

      setCounters({
        users: Math.max(Math.floor(stats.users * progress), 0),
        guilds: Math.max(Math.floor(stats.guilds * progress), 0),
      });

      if (progress < 1) requestAnimationFrame(increment);
    };

    requestAnimationFrame(increment);
  }, [duration, stats, scope, animate, setCounters]);

  return (
    <section className="text-center text-secondary-foreground/70">
      Serving{" "}
      <span className="font-bold text-white">
        {counters.users.toLocaleString()} <BsPeopleFill className="inline-block size-5" />
      </span>
      <span> within </span>
      <span className="font-bold text-white">
        {counters.guilds.toLocaleString()} <DiscordServer className="inline-block size-5" />
      </span>
    </section>
  );
}

export default React.memo(NumberTicker);
