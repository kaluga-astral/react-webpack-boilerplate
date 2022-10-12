import { HttpService } from '@example/shared';

import { TariffListNetworkDTO } from './dto';

export const createTariffsNetworkSources = (httpService: HttpService) => ({
  getTariffs: () => httpService.get<void, TariffListNetworkDTO>('/tariffs'),
});

export type TariffsNetworkSources = ReturnType<
  typeof createTariffsNetworkSources
>;
