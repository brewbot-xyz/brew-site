/**
 * Creates context for an incoming request
 * @see https://trpc.io/docs/v11/context
 */
export const createContext = async () => {
  return {};
};

export type Context = Awaited<ReturnType<typeof createContext>>;
