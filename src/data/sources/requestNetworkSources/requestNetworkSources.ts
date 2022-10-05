import { HttpService } from '@example/shared';

import {
  CreateDraftRequestNetworkInputDTO,
  EditDraftRequestNetworkInputDTO,
  RequestNetworkDTO,
} from './dto';

export const createRequestNetworkSources = (httpService: HttpService) => ({
  getRequestInfo: (requestID: string) =>
    httpService.get<void, RequestNetworkDTO>(`/request/${requestID}`),
  createDraftRequest: (data: CreateDraftRequestNetworkInputDTO) =>
    httpService.post<CreateDraftRequestNetworkInputDTO, string>(
      '/request',
      data,
    ),
  editRequest: (data: EditDraftRequestNetworkInputDTO) =>
    httpService.put<void, void>('/request', data),
});

export type RequestNetworkSources = ReturnType<
  typeof createRequestNetworkSources
>;
