import {
  HttpService,
  QueryClient,
  RepositoryFetchParams,
} from '@example/shared';

import {
  UserContactInfoDTO,
  UserDataSources,
  UserPersonInfoDTO,
  createUserDataSources,
} from '../../sources';

import { UserFullInfoDTO } from './dto';

/**
 * @description Repository для работы с даннми юзере
 * */
export class UserRepository {
  constructor(
    private readonly userDataSources: UserDataSources,
    private readonly queryClient: QueryClient,
  ) {
    this.userDataSources = userDataSources;
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
  ): Promise<UserContactInfoDTO> =>
    this.queryClient.fetchQuery(
      [Symbol()],
      this.userDataSources.getContactInfo,
      params?.cache,
    );

  public getPersonInfo = (
    params?: RepositoryFetchParams,
  ): Promise<UserPersonInfoDTO> =>
    this.queryClient.fetchQuery(
      [Symbol()],
      this.userDataSources.getPersonInfo,
      params?.cache,
    );
}

export let userRepository: UserRepository;

export const initUserRepository = (
  httpService: HttpService,
  queryClient: QueryClient,
) => {
  userRepository = new UserRepository(
    createUserDataSources(httpService),
    queryClient,
  );
};
