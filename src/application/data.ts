import {
  initOwnerRepository,
  initRequestRepository,
  initUserRepository,
  ownerRepository,
} from '@example/data';
import { configService, createHttpService } from '@example/shared';

/*
 * @description Функция для инициализации слоя получения данных
 * */
export const initRepositories = () => {
  const { apiUrl } = configService.config;

  const apiHttpService = createHttpService({ baseURL: apiUrl });

  initOwnerRepository(apiHttpService);
  initRequestRepository(apiHttpService, ownerRepository);
  initUserRepository(apiHttpService);
};
