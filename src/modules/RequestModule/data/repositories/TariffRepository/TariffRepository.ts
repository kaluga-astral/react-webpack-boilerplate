import {
  QueryClient,
  RepositoryFetchParams,
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
  constructor(
    private readonly tariffNetworkSources: TariffsNetworkSources,
    private readonly queryClient: QueryClient,
  ) {
    this.tariffNetworkSources = tariffNetworkSources;
    this.queryClient = queryClient;
  }

  /**
   * @description Получение списка всех тарифов
   * */
  public getTariffs = async (params?: RepositoryFetchParams) =>
    this.queryClient.fetchQuery<TariffListDTO>(
      [Symbol()],
      async () => this.tariffNetworkSources.getTariffs(),
      params?.cache,
    );
}

export const tariffRepository = new TariffRepository(
  tariffsNetworkStubSources,
  queryClientInstance,
);
