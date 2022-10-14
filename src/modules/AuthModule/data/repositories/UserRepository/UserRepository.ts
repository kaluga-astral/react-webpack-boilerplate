import {
  QueryClient,
  queryClient as queryClientInstance,
} from '@example/modules/ServiceModule/services';
import {
  RepositoryFetchParams,
  createCachedQuery,
} from '@example/modules/ServiceModule';

import {
  UserContactNetworkDTO,
  UserNetworkSources,
  UserPersonNetworkDTO,
  userNetworkSources as userNetworkSourcesInstance,
} from '../../sources';

import { UserFullInfoDTO } from './dto';

/**
 * @description Repository для работы с даннми юзере
 * */
export class UserRepository {
  public fullInfoCacheKey = ['fullInfoCacheKey'];

  public contactInfoCacheKey = ['contactInfoCacheKey'];

  public personInfoCacheKey = ['personInfoCacheKey'];

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
  public getFullInfo = (params?: RepositoryFetchParams) =>
    createCachedQuery<UserFullInfoDTO>(
      this.queryClient,
      this.fullInfoCacheKey,
      async () => {
        const [contactInfo, personInfo] = await Promise.all([
          this.getContactInfo(params),
          this.getPersonInfo(params),
        ]);

        return {
          ...contactInfo,
          ...personInfo,
        };
      },
      params,
    );

  public getContactInfo = (params?: RepositoryFetchParams) =>
    createCachedQuery<UserContactNetworkDTO>(
      this.queryClient,
      this.contactInfoCacheKey,
      this.userNetworkSources.getContactInfo,
      params,
    );

  public getPersonInfo = (params?: RepositoryFetchParams) =>
    createCachedQuery<UserPersonNetworkDTO>(
      this.queryClient,
      this.personInfoCacheKey,
      this.userNetworkSources.getPersonInfo,
      params,
    );
}

export const userRepository = new UserRepository(
  userNetworkSourcesInstance,
  queryClientInstance,
);
