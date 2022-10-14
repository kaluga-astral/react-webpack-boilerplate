import {
  QueryClient,
  RepositoryFetchParams,
  createCachedQuery,
  queryClient as queryClientInstance,
} from '@example/modules/ServiceModule';

import {
  OwnerNetworkSources,
  ownerNetworkSources as ownerNetworkSourcesInstance,
} from '../../sources';

import { OwnerDTO } from './dto';

/**
 * @description Repository для работы с даннми владельце
 * */
export class OwnerRepository {
  constructor(
    private readonly ownerNetworkSources: OwnerNetworkSources,
    private readonly queryClient: QueryClient,
  ) {
    this.ownerNetworkSources = ownerNetworkSources;
    this.queryClient = queryClient;
  }

  public getOwnerInfoCacheKey = (ownerID: string) => [
    'ownerInfoCacheKey',
    ownerID,
  ];

  /**
   * @description Получение полной информации о владельце
   * */
  public getOwnerInfo = async (
    ownerID: string,
    params?: RepositoryFetchParams,
  ) =>
    createCachedQuery<OwnerDTO>(
      this.queryClient,
      this.getOwnerInfoCacheKey(ownerID),
      () => this.ownerNetworkSources.getInfo(ownerID),
      params,
    );
}

export const ownerRepository = new OwnerRepository(
  ownerNetworkSourcesInstance,
  queryClientInstance,
);
