import { UserFullInfoDTO } from '@example/data';

export const getUserFullName = (
  user: Pick<UserFullInfoDTO, 'name' | 'surname'>,
): string => `${user.name} ${user.surname}`;
