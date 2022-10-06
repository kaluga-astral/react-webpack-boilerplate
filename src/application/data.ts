import {
  initOwnerRepository,
  initRequestRepository,
  initTariffRepository,
  initUserRepository,
  ownerRepository,
  tariffRepository,
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

  initRequestRepository(
    apiHttpService,
    ownerRepository,
    tariffRepository,
    queryClient,
  );

  initUserRepository(apiHttpService, queryClient);
  initTariffRepository(apiHttpService, queryClient);
};
