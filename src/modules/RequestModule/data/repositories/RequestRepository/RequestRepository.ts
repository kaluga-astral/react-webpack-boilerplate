import { LocalStorageService, localStorageService } from '@example/shared';
import {
  QueryClient,
  RepositoryFetchParams,
  queryClient as queryClientInstance,
} from '@example/modules/ServiceModule';

import {
  RequestNetworkSources,
  requestNetworkSources as requestNetworkSourcesInstance,
} from '../../sources';
import {
  OwnerRepository,
  ownerRepository as ownerRepositoryInstance,
} from '../OwnerRepository';
import {
  TariffDTO,
  TariffRepository,
  tariffRepository as tariffRepositoryInstance,
} from '../TariffRepository';

import {
  CreateDraftRequestInputDTO,
  EditRequestInputDTO,
  RequestDTO,
  RequestFullInfoDTO,
  RequestStoreInputDTO,
  RequestWithTariffDTO,
} from './dto';

/**
 * @description Repository для работы с даннми заявке
 * */
export class RequestRepository {
  private readonly requestStoreID = 'request';

  constructor(
    private readonly requestNetworkSources: RequestNetworkSources,
    private readonly ownerRepository: OwnerRepository,
    private readonly tariffRepository: TariffRepository,
    private readonly storageService: LocalStorageService,
    private readonly queryClient: QueryClient,
  ) {
    this.requestNetworkSources = requestNetworkSources;
    this.ownerRepository = ownerRepository;
    this.tariffRepository = tariffRepository;
    this.storageService = storageService;
    this.queryClient = queryClient;
  }

  /**
   * @description Получение полной информации о заявке
   * */
  public getRequestFullInfo = async (
    requestID: string,
    params?: RepositoryFetchParams,
  ) =>
    this.queryClient.fetchQuery<RequestFullInfoDTO>(
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

  public getRequestInfo = (requestID: string, params?: RepositoryFetchParams) =>
    this.queryClient.fetchQuery<RequestDTO>(
      [requestID],
      () => this.requestNetworkSources.getRequestInfo(requestID),
      params?.cache,
    );

  public getRequestWithTariff = async (
    requestID: string,
    params?: RepositoryFetchParams,
  ) =>
    this.queryClient.fetchQuery<RequestWithTariffDTO>(
      [requestID],
      async () => {
        const [request, tariffs] = await Promise.all([
          this.getRequestInfo(requestID),
          this.tariffRepository.getTariffs(),
        ]);

        const { tariffID, ...requestData } = request;

        return {
          ...requestData,
          tariff: tariffs.data.find(({ id }) => id === tariffID) as TariffDTO,
        };
      },
      params?.cache,
    );

  public createDraftRequest = (
    data: CreateDraftRequestInputDTO,
  ): Promise<string> => this.requestNetworkSources.createDraftRequest(data);

  public editDraftRequest = (data: EditRequestInputDTO): Promise<void> =>
    this.requestNetworkSources.editRequest(data);

  public saveRequestToStore = (request: RequestStoreInputDTO) =>
    this.storageService.setItem(this.requestStoreID, JSON.stringify(request));
}

export const requestRepository = new RequestRepository(
  requestNetworkSourcesInstance,
  ownerRepositoryInstance,
  tariffRepositoryInstance,
  localStorageService,
  queryClientInstance,
);
