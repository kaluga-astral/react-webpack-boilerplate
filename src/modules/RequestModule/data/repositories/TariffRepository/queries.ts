import { UseQueryOptions, useQuery } from '@example/shared';

import { tariffRepository } from './TariffRepository';
import { TariffListDTO } from './dto';

export const useTariffsQuery = <SelectResult = TariffListDTO>(
  options?: Pick<UseQueryOptions<TariffListDTO, Error, SelectResult>, 'select'>,
) =>
  useQuery<TariffListDTO, Error, SelectResult>(
    tariffRepository.getTariffsCacheKey(),
    () => tariffRepository.getTariffs(),
    options,
  );
