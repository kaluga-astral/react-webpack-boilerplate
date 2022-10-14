import { UserFullInfoDTO } from '@example/modules/AuthModule';

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

  public getState = ({
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

export const createHeaderLogic = () => new HeaderLogic();