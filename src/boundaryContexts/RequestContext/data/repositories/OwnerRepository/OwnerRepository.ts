import { HttpService, QueryClient } from '@example/shared';

import { OwnerNetworkSources, createOwnerNetworkSources } from '../../sources';
import { RepositoryFetchParams } from '../types';

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
