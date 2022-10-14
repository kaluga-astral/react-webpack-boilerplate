import {
  QueryClient,
  RepositoryFetchParams,
  createCachedQuery,
  queryClient as queryClientInstance,
} from '@example/modules/ServiceModule';

import {
  TariffsNetworkSources,
  tariffsNetworkStubSources,
} from '../../sources';

import { TariffListDTO } from './dto';

/**
 * @description Repository для работы с даннми тарифов
 * */
export class TariffRepository {
  private readonly tariffsCacheID = 'tariffsCacheID';

  constructor(
    private readonly tariffNetworkSources: TariffsNetworkSources,
    private readonly queryClient: QueryClient,
  ) {
    this.tariffNetworkSources = tariffNetworkSources;
    this.queryClient = queryClient;
  }

  public getTariffsCacheKey = () => [this.tariffsCacheID];

  /**
   * @description Получение списка всех тарифов
   * */
  public getTariffs = async (params?: RepositoryFetchParams) =>
    createCachedQuery<TariffListDTO>(
      this.queryClient,
      this.getTariffsCacheKey(),
      () => this.tariffNetworkSources.getTariffs(),
      params,
    );
}

export const tariffRepository = new TariffRepository(
  tariffsNetworkStubSources,
  queryClientInstance,
);
