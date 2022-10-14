import { QueryFetchPolicy } from '@example/shared';

import { QueryClient } from '../../services';

type Options = {
  fetchPolicy?: QueryFetchPolicy;
};

export const createCachedQuery = <TQueryFnData = unknown, TError = unknown>(
  queryClient: QueryClient,
  queryKey: string[],
  fetch: () => Promise<TQueryFnData>,
  options: Options = {
    fetchPolicy: 'networkOnly',
  },
): Promise<TQueryFnData> => {
  const { fetchPolicy } = options;

  if (fetchPolicy === 'cacheFirst') {
    return queryClient.fetchQuery<TQueryFnData, TError>(queryKey, fetch);
  }

  return fetch();
};
