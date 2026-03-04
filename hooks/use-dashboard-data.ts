import { trpc } from "@/lib/trpc";

export function useDashboardData(guildId: string) {
  const utils = trpc.useUtils();

  const {
    data: guild,
    isLoading: isGuildLoading,
    isError: isGuildError,
  } = trpc.discord.protectedGuilds.useQuery(undefined, {
    select: (guilds) => guilds.find((g) => g.id === guildId),
  });

  const {
    data: counts,
    isLoading: isCountsLoading,
    isError: isCountsError,
  } = trpc.discord.protectedCounts.useQuery({ guildId });

  const {
    data: prefix,
    isLoading: isPrefixLoading,
    isError: isPrefixError,
  } = trpc.brew.prefix.useQuery({ guildId });

  const {
    data: serverVars,
    isLoading: isServerVarsLoading,
    isError: isServerVarsError,
  } = trpc.brew.getServerVars.useQuery({
    guildId,
  });

  const setPrefix = trpc.brew.setPrefix.useMutation({
    onSuccess: () => {
      utils.brew.prefix.invalidate({ guildId });
    },
  });

  const isLoading = isGuildLoading || isCountsLoading || isPrefixLoading || isServerVarsLoading;
  const isError = isGuildError || isCountsError || isPrefixError || isServerVarsError || !guild;

  return {
    guild,
    counts,
    prefix,
    serverVars,
    setPrefix,
    isLoading,
    isError,
  };
}
