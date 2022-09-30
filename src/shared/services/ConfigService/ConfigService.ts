export type Config = {
  apiUrl: string;
};

export class ConfigService {
  constructor() {
    this.config = {} as Config;
  }

  init(config: Partial<Config>) {
    this.config = config as Config;
  }

  get config(): Config {
    if (!this.config) {
      throw Error('ConfigService is not initialized');
    }

    return this.config;
  }

  set config(config: Config) {
    this.config = config;
  }
}

export const configService = new ConfigService();
