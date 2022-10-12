import {
  HttpService,
  LocalStorageService,
  QueryClient,
  localStorageService,
} from '@example/shared';

import { RepositoryFetchParams } from '../types';
import {
  RequestNetworkSources,
  createRequestNetworkSources,
} from '../../sources';
import { OwnerRepository } from '../OwnerRepository';
import { TariffDTO, TariffRepository } from '../TariffRepository';

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

export let requestRepository: RequestRepository;

export const initRequestRepository = (
  httpService: HttpService,
  ownerRepository: OwnerRepository,
  tariffRepository: TariffRepository,
  queryClient: QueryClient,
) => {
  requestRepository = new RequestRepository(
    createRequestNetworkSources(httpService),
    ownerRepository,
    tariffRepository,
    localStorageService,
    queryClient,
  );
};
