import {
  HttpService,
  LocalStorageService,
  localStorageService,
} from '@example/shared';

import { RequestDataSources, createRequestDataSources } from '../../sources';
import { OwnerRepository } from '../OwnerRepository';

import { RequestFullInfoDTO, RequestStoreInputDTO } from './dto';

/*
 * @description Repository для работы с даннми заявке
 * */
export class RequestRepository {
  private readonly requestStoreID = 'request';

  constructor(
    private readonly requestDataSources: RequestDataSources,
    private readonly ownerRepository: OwnerRepository,
    private readonly storageService: LocalStorageService,
  ) {
    this.requestDataSources = requestDataSources;
    this.ownerRepository = ownerRepository;
    this.storageService = storageService;
  }

  /*
   * @description Получение полной информации о заявке
   * */
  public getRequestFullInfoDTO = async (
    requestID: string,
  ): Promise<RequestFullInfoDTO> => {
    const { ownerID, ...request } =
      await this.requestDataSources.getRequestInfo(requestID);
    const owner = await this.ownerRepository.getOwnerInfo(ownerID);

    return {
      ...request,
      owner,
    };
  };

  public saveRequestToStore = (request: RequestStoreInputDTO) =>
    this.storageService.setItem(this.requestStoreID, JSON.stringify(request));
}

export let requestRepository: RequestRepository;

export const initRequestRepository = (
  httpService: HttpService,
  ownerRepository: OwnerRepository,
) => {
  requestRepository = new RequestRepository(
    createRequestDataSources(httpService),
    ownerRepository,
    localStorageService,
  );
};
