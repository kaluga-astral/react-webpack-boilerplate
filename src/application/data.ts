import {
  initOwnerRepository,
  initRequestRepository,
  initUserRepository,
  ownerRepository,
} from '@example/data';
import {
  configService,
  createHttpService,
  createQueryClient,
} from '@example/shared';

/**
 * @description Функция для инициализации слоя получения данных
 * */
export const initRepositories = () => {
  const { apiUrl } = configService.config;

  const apiHttpService = createHttpService({ baseURL: apiUrl });
  const queryClient = createQueryClient();

  initOwnerRepository(apiHttpService, queryClient);
  initRequestRepository(apiHttpService, ownerRepository, queryClient);
  initUserRepository(apiHttpService, queryClient);
};
