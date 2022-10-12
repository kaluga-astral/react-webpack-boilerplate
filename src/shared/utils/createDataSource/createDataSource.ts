import { HttpService } from '../../services';

/**
 * @description Фабрика для создания DataSource
 * */
export const createDataSource = <Sources extends Record<string, unknown>>(
  creator: (httpService: HttpService) => Sources,
) => creator;
