import { QueryClient, QueryObserver } from '@tanstack/react-query';

import { QueryClientCache } from './enums';

export const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
        cacheTime: QueryClientCache.NoCache,
        refetchOnWindowFocus: false,
      },
    },
  });

export { QueryClient, QueryObserver };
