import { HttpService } from '@example/shared';

import { TariffListNetworkDTO } from './dto';

// eslint-disable-next-line
export const createTariffsNetworkSources = (httpService: HttpService) => ({
  // getTariffs: () => httpService.get<void, TariffListNetworkDTO>('/tariffs'),
  getTariffs: async (): Promise<TariffListNetworkDTO> => ({
    data: [{ id: '1', name: 'Tariff1', price: 2000, description: 'Tariff1' }],
    total: 1,
  }),
});

export type TariffsNetworkSources = ReturnType<
  typeof createTariffsNetworkSources
>;
