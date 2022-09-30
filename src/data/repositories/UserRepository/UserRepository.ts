import { HttpService } from '@example/shared';

import {
  UserContactInfoDTO,
  UserDataSources,
  UserPersonInfoDTO,
  createUserDataSources,
} from '../../sources';

import { UserFullInfoDTO } from './types';

/*
 * @description Repository для работы с даннми юзере
 * */
export class UserRepository {
  constructor(private readonly userDataSources: UserDataSources) {
    this.userDataSources = userDataSources;
  }

  /*
   * @description Получение полной информации о юзере
   * */
  public getFullInfo = async (): Promise<UserFullInfoDTO> => {
    const [contactInfo, personInfo] = await Promise.all([
      this.getContactInfo(),
      this.getPersonInfo(),
    ]);

    return { ...contactInfo, ...personInfo };
  };

  public getContactInfo = (): Promise<UserContactInfoDTO> =>
    this.userDataSources.getContactInfo();

  public getPersonInfo = (): Promise<UserPersonInfoDTO> =>
    this.userDataSources.getPersonInfo();
}

export let userRepository: UserRepository;

export const initUserRepository = (httpService: HttpService) => {
  userRepository = new UserRepository(createUserDataSources(httpService));
};
