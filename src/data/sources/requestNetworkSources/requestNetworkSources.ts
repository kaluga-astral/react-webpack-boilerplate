import { HttpService } from '@example/shared';

import { RequestNetworkDTO, RequestNetworkInputDTO } from './dto';

export const createRequestNetworkSources = (httpService: HttpService) => ({
  getRequestInfo: (requestID: string) =>
    httpService.get<void, RequestNetworkDTO>(`/request/${requestID}`),
  editRequest: (request: RequestNetworkInputDTO) =>
    httpService.put<void, void>('/request', request),
});

export type RequestNetworkSources = ReturnType<
  typeof createRequestNetworkSources
>;
