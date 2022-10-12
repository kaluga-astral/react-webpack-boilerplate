import { HttpService } from '@example/shared';

import { UserContactNetworkDTO, UserPersonNetworkDTO } from './dto';

export const createUserNetworkSources = (httpService: HttpService) => ({
  getContactInfo: () =>
    httpService.get<void, UserContactNetworkDTO>('/user/contactInfo'),
  getPersonInfo: () =>
    httpService.get<void, UserPersonNetworkDTO>('/user/personInfo'),
});

export type UserNetworkSources = ReturnType<typeof createUserNetworkSources>;
