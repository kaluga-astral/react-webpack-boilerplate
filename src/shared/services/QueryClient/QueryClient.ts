import {
  FetchQueryOptions,
  QueryClient,
  QueryFunction,
} from '@tanstack/react-query';

import { QueryClientCache } from './enums';

export const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: QueryClientCache.MaxLong,
        cacheTime: QueryClientCache.MaxLong,
        refetchOnWindowFocus: false,
      },
    },
  });

export { QueryClient, QueryFunction, FetchQueryOptions };
