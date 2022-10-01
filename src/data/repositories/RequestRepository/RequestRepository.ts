import {
  HttpService,
  LocalStorageService,
  QueryClient,
  QueryClientCache,
  RepositoryFetchParams,
  localStorageService,
} from '@example/shared';

import { RequestDataSources, createRequestDataSources } from '../../sources';
import { OwnerRepository } from '../OwnerRepository';

import { RequestFullInfoDTO, RequestStoreInputDTO } from './dto';

/**
 * @description Repository для работы с даннми заявке
 * */
export class RequestRepository {
  private readonly requestStoreID = 'request';

  constructor(
    private readonly requestDataSources: RequestDataSources,
    private readonly ownerRepository: OwnerRepository,
    private readonly storageService: LocalStorageService,
    private readonly queryClient: QueryClient,
  ) {
    this.requestDataSources = requestDataSources;
    this.ownerRepository = ownerRepository;
    this.storageService = storageService;
    this.queryClient = queryClient;
  }

  /**
   * @description Получение полной информации о заявке
   * */
  public getRequestFullInfo = async (
    requestID: string,
    params?: RepositoryFetchParams,
  ): Promise<RequestFullInfoDTO> =>
    this.queryClient.fetchQuery(
      [requestID],
      async () => {
        const { ownerID, ...request } = await this.getRequestInfo(requestID);
        const owner = await this.ownerRepository.getOwnerInfo(ownerID);

        return {
          ...request,
          owner,
        };
      },
      params?.cache,
    );

  public getRequestInfo = (requestID: string, cacheTime?: QueryClientCache) =>
    this.queryClient.fetchQuery(
      [requestID],
      () => this.requestDataSources.getRequestInfo(requestID),
      { cacheTime },
    );

  public saveRequestToStore = (request: RequestStoreInputDTO) =>
    this.storageService.setItem(this.requestStoreID, JSON.stringify(request));
}

export let requestRepository: RequestRepository;

export const initRequestRepository = (
  httpService: HttpService,
  ownerRepository: OwnerRepository,
  queryClient: QueryClient,
) => {
  requestRepository = new RequestRepository(
    createRequestDataSources(httpService),
    ownerRepository,
    localStorageService,
    queryClient,
  );
};
