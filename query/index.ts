import { QueryClient } from "@tanstack/react-query";

const queryClientSingleton = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  });
};

declare global {
  var queryClient: undefined | ReturnType<typeof queryClientSingleton>;
}

const queryClient = globalThis.queryClient ?? queryClientSingleton();

export default queryClient;

if (process.env.NODE_ENV !== "production") globalThis.queryClient = queryClient;
