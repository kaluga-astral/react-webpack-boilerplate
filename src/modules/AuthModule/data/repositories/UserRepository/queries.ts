import { UseQueryOptions, useQuery } from '@example/shared';

import { userRepository } from './UserRepository';
import { UserFullInfoDTO } from './dto';

export const useUserFullInfoQuery = <SelectResult = UserFullInfoDTO>(
  options?: Pick<
    UseQueryOptions<UserFullInfoDTO, Error, SelectResult>,
    'select' | 'onSuccess' | 'onError'
  >,
) =>
  useQuery<UserFullInfoDTO, Error, SelectResult>(
    userRepository.fullInfoCacheKey,
    () => userRepository.getFullInfo(),
    options,
  );
