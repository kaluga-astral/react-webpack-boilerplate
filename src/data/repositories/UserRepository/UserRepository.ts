import { HttpService, QueryClient } from '@example/shared';

import { RepositoryFetchParams } from '../types';
import {
  UserContactNetworkDTO,
  UserNetworkSources,
  UserPersonNetworkDTO,
  createUserNetworkSources,
} from '../../sources';

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
  public getFullInfo = async (
    params?: RepositoryFetchParams,
  ): Promise<UserFullInfoDTO> =>
    this.queryClient.fetchQuery(
      [Symbol()],
      async () => {
        const [contactInfo, personInfo] = await Promise.all([
          this.getContactInfo(),
          this.getPersonInfo(),
        ]);

        return { ...contactInfo, ...personInfo };
      },
      params?.cache,
    );

  public getContactInfo = (
    params?: RepositoryFetchParams,
  ): Promise<UserContactNetworkDTO> =>
    this.queryClient.fetchQuery(
      [Symbol()],
      this.userNetworkSources.getContactInfo,
      params?.cache,
    );

  public getPersonInfo = (
    params?: RepositoryFetchParams,
  ): Promise<UserPersonNetworkDTO> =>
    this.queryClient.fetchQuery(
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
