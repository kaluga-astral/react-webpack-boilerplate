import { HttpService } from '@example/shared';

import { TariffListNetworkDTO } from './dto';
import { TariffsNetworkSources } from './tariffsNetworkSources';

// eslint-disable-next-line
export const createTariffsNetworkStubSources = (httpService: HttpService): TariffsNetworkSources => ({
  getTariffs: async (): Promise<TariffListNetworkDTO> => ({
    data: [{ id: '1', name: 'Tariff1', price: 2000, description: 'Tariff1' }],
    total: 1,
  }),
});
