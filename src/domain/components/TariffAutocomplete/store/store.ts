import { makeAutoObservable, runInAction } from 'mobx';

import { RepositoryCache, TariffDTO, TariffRepository } from '@example/data';

export type TariffAutocompleteOption = Pick<TariffDTO, 'name' | 'id'>;

export class TariffAutocompleteStore {
  public isLoading = false;

  public error: Error | null = null;

  public options: TariffAutocompleteOption[] = [];

  constructor(private readonly tariffRepository: TariffRepository) {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  public getTariffs = async (): Promise<void> => {
    try {
      this.isLoading = true;

      const result = await this.tariffRepository.getTariffs({
        cache: { cacheTime: RepositoryCache.Infinity },
      });

      runInAction(() => {
        this.options = result.data.map(({ name, id }) => ({ name, id }));
      });
    } catch (err) {
      runInAction(() => {
        this.error = err as Error;
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };
}
