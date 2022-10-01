import { HttpService, QueryClient, QueryClientCache } from '@example/shared';

import { OwnerNetworkSources, createOwnerNetworkSources } from '../../sources';

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
    cacheTime?: QueryClientCache,
  ): Promise<OwnerDTO> =>
    this.queryClient.fetchQuery(
      [Symbol()],
      () => this.ownerNetworkSources.getInfo(ownerID),
      { cacheTime },
    );
}

export let ownerRepository: OwnerRepository;

export const initOwnerRepository = (
  httpService: HttpService,
  queryClient: QueryClient,
) => {
  ownerRepository = new OwnerRepository(
    createOwnerNetworkSources(httpService),
    queryClient,
  );
};
