import { useState } from 'react';

import {
  UserFullInfoDTO,
  useUserFullInfoQuery,
} from '@example/modules/AuthModule';

type UserViewModel = {
  displayName: string;
};

type ResultInterface = {
  isLoading: boolean;
  user: UserViewModel;
};

class HeaderLogic {
  private getUserModel = (data?: UserFullInfoDTO): UserViewModel => ({
    displayName: data?.displayName || '...',
  });

  public getResultLogic = ({
    isLoading,
    data,
  }: {
    isLoading: boolean;
    data?: UserFullInfoDTO;
  }): ResultInterface => ({
    isLoading,
    user: this.getUserModel(data),
  });
}

export const useLogic = (): ResultInterface => {
  const [{ getResultLogic }] = useState(() => new HeaderLogic());

  const query = useUserFullInfoQuery();

  return getResultLogic(query);
};
