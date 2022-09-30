import { HttpService } from '@example/shared';

import { OwnerDTO } from './dto';

export const createOwnerDataSources = (httpService: HttpService) => ({
  getInfo: (ownerID: string) =>
    httpService.get<void, OwnerDTO>(`/owner/${ownerID}`),
});

export type OwnerDataSources = ReturnType<typeof createOwnerDataSources>;
