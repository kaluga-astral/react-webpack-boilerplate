import { HttpService, QueryClient } from '@example/shared';

import { RepositoryFetchParams } from '../types';
import {
  UserContactNetworkDTO,
  UserNetworkSources,
  UserPersonNetworkDTO,
  createUserNetworkSources,
} from '../../sources';

import { getUserFullName } from './utils';
import { UserFullInfoDTO } from './dto';

/**
 * @description Repository для работы с даннми юзере
 * */
export class UserRepository {
  constructor(
    private readonly userNetworkSources: UserNetworkSources,
    private readonly queryClient: QueryClient,
  ) {
    this.userNetworkSources = userNetworkSources;
    this.queryClient = queryClient;
  }

  /**
   * @description Получение полной информации о юзере
   * */
  public getFullInfo = async (params?: RepositoryFetchParams) =>
    this.queryClient.fetchQuery<UserFullInfoDTO>(
      [Symbol()],
      async () => {
        const [contactInfo, personInfo] = await Promise.all([
          this.getContactInfo(),
          this.getPersonInfo(),
        ]);

        return {
          ...contactInfo,
          ...personInfo,
          fullName: getUserFullName(personInfo),
        };
      },
      params?.cache,
    );

  public getContactInfo = (params?: RepositoryFetchParams) =>
    this.queryClient.fetchQuery<UserContactNetworkDTO>(
      [Symbol()],
      this.userNetworkSources.getContactInfo,
      params?.cache,
    );

  public getPersonInfo = (params?: RepositoryFetchParams) =>
    this.queryClient.fetchQuery<UserPersonNetworkDTO>(
      [Symbol()],
      this.userNetworkSources.getPersonInfo,
      params?.cache,
    );
}

export let userRepository: UserRepository;

export const initUserRepository = (
  httpService: HttpService,
  queryClient: QueryClient,
) => {
  userRepository = new UserRepository(
    createUserNetworkSources(httpService),
    queryClient,
  );
};
