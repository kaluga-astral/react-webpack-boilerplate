export type Config = {
  apiUrl: string;
};

export class ConfigService {
  private _config: Config | undefined;

  constructor() {
    this.config = {} as Config;
  }

  init(config: Partial<Config>) {
    this.config = config as Config;
  }

  get config(): Config {
    if (!this._config) {
      throw Error('ConfigService is not initialized');
    }

    return this._config;
  }

  set config(config: Config) {
    this._config = config;
  }
}

export const configService = new ConfigService();
