import { apiHttpClient } from '@example/modules/ServiceModule';

import { UserContactNetworkDTO, UserPersonNetworkDTO } from './dto';

export const userNetworkSources = {
  getContactInfo: () =>
    apiHttpClient.get<void, UserContactNetworkDTO>('/my/contactInfo'),
  getPersonInfo: () =>
    apiHttpClient.get<void, UserPersonNetworkDTO>('/my/personInfo'),
};

export type UserNetworkSources = typeof userNetworkSources;
