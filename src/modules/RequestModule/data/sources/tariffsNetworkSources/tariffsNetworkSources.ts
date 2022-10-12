import { apiHttpClient } from '@example/modules/ServiceModule';

import { TariffListNetworkDTO } from './dto';

export const tariffsNetworkSources = {
  getTariffs: () => apiHttpClient.get<void, TariffListNetworkDTO>('/tariffs'),
};

export type TariffsNetworkSources = typeof tariffsNetworkSources;
