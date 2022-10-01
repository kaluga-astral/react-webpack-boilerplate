import { HttpService } from '@example/shared';

import { OwnerNetworkDTO } from './dto';

export const createOwnerNetworkSources = (httpService: HttpService) => ({
  getInfo: (ownerID: string) =>
    httpService.get<void, OwnerNetworkDTO>(`/owner/${ownerID}`),
});

export type OwnerNetworkSources = ReturnType<typeof createOwnerNetworkSources>;
