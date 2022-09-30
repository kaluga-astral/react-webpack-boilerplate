import { HttpService } from '@example/shared';

import { UserContactInfoDTO, UserPersonInfoDTO } from './dto';

export const createUserDataSources = (httpService: HttpService) => ({
  getContactInfo: () =>
    httpService.get<void, UserContactInfoDTO>('/user/contactInfo'),
  getPersonInfo: () =>
    httpService.get<void, UserPersonInfoDTO>('/user/personInfo'),
});

export type UserDataSources = ReturnType<typeof createUserDataSources>;
