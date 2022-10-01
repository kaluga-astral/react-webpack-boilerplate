import { HttpService, QueryClient, QueryClientCache } from '@example/shared';

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
    cacheTime?: QueryClientCache,
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
      { cacheTime },
    );

  public getContactInfo = (
    cacheTime?: QueryClientCache,
  ): Promise<UserContactInfoDTO> =>
    this.queryClient.fetchQuery(
      [Symbol()],
      this.userDataSources.getContactInfo,
      { cacheTime },
    );

  public getPersonInfo = (
    cacheTime?: QueryClientCache,
  ): Promise<UserPersonInfoDTO> =>
    this.queryClient.fetchQuery(
      [Symbol()],
      this.userDataSources.getPersonInfo,
      { cacheTime },
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
