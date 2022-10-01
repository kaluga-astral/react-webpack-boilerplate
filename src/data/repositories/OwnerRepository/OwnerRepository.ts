import { HttpService, QueryClient, QueryClientCache } from '@example/shared';

import { OwnerDataSources, createOwnerDataSources } from '../../sources';

import { OwnerDTO } from './dto';

/**
 * @description Repository для работы с даннми владельце
 * */
export class OwnerRepository {
  constructor(
    private readonly ownerDataSources: OwnerDataSources,
    private readonly queryClient: QueryClient,
  ) {
    this.ownerDataSources = ownerDataSources;
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
      () => this.ownerDataSources.getInfo(ownerID),
      { cacheTime },
    );
}

export let ownerRepository: OwnerRepository;

export const initOwnerRepository = (
  httpService: HttpService,
  queryClient: QueryClient,
) => {
  ownerRepository = new OwnerRepository(
    createOwnerDataSources(httpService),
    queryClient,
  );
};
