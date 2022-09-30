import { HttpService } from '@example/shared';

import { RequestDTO, RequestInputDTO } from './dto';

export const createRequestDataSources = (httpService: HttpService) => ({
  getRequestInfo: (requestID: string) =>
    httpService.get<void, RequestDTO>(`/request/${requestID}`),
  editRequest: (request: RequestInputDTO) =>
    httpService.put<void, void>('/request', request),
});

export type RequestDataSources = ReturnType<typeof createRequestDataSources>;
