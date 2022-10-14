import { UseQueryOptions, useQuery } from '@example/shared';

import { requestRepository } from './RequestRepository';
import { RequestWithTariffDTO } from './dto';

export const useRequestWithTariffQuery = <SelectResult = RequestWithTariffDTO>(
  requestID: string,
  options?: Pick<
    UseQueryOptions<RequestWithTariffDTO, Error, SelectResult>,
    'select'
  >,
) =>
  useQuery<RequestWithTariffDTO, Error, SelectResult>(
    requestRepository.getRequestWithTariffCacheID(requestID),
    () => requestRepository.getRequestWithTariff(requestID),
    options,
  );
