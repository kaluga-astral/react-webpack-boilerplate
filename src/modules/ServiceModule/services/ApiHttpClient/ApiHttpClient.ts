import { createHttpService } from '@example/shared';

import { configService } from '../ConfigService';

/**
 * @description Http service для взаимодействия с основным api
 * */
export const apiHttpClient = createHttpService({
  baseURL: configService.config.apiUrl,
});
