import {
  QueryClient,
  RepositoryFetchParams,
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

  /**
   * @description Получение полной информации о владельце
   * */
  public getOwnerInfo = async (
    ownerID: string,
    params?: RepositoryFetchParams,
  ) =>
    this.queryClient.fetchQuery<OwnerDTO>(
      [Symbol()],
      () => this.ownerNetworkSources.getInfo(ownerID),
      params?.cache,
    );
}

export const ownerRepository = new OwnerRepository(
  ownerNetworkSourcesInstance,
  queryClientInstance,
);
