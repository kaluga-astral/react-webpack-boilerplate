import { HttpService, QueryClient } from '@example/shared';

import { RepositoryFetchParams } from '../types';
import {
  TariffsNetworkSources,
  createTariffsNetworkStubSources,
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

export let tariffRepository: TariffRepository;

export const initTariffRepository = (
  httpService: HttpService,
  queryClient: QueryClient,
) => {
  tariffRepository = new TariffRepository(
    createTariffsNetworkStubSources(httpService),
    queryClient,
  );
};
