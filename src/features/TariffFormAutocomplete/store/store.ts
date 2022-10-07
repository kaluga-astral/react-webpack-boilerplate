import { makeAutoObservable, runInAction } from 'mobx';

import {
  RepositoryCache,
  TariffDTO,
  TariffRepository,
  tariffRepository as tariffRepositoryInstance,
} from '@example/data';

export type TariffFormAutocompleteValue = Pick<
  TariffDTO,
  'name' | 'id' | 'price'
>;

export class TariffAutocompleteStore {
  public isLoading = false;

  public error: Error | null = null;

  public options: TariffFormAutocompleteValue[] = [];

  constructor(private readonly tariffRepository: TariffRepository) {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  public getTariffs = () => {
    this.isLoading = true;

    this.tariffRepository
      .getTariffs({
        cache: { cacheTime: RepositoryCache.Infinity },
      })
      .then(({ data }) => {
        runInAction(() => {
          this.options = data.map(({ name, id, price }) => ({
            name,
            id,
            price,
          }));
        });
      })
      .catch((err) => {
        runInAction(() => {
          this.error = err as Error;
        });
      })
      .finally(() => {
        runInAction(() => {
          this.isLoading = false;
        });
      });
  };
}

export const createTariffAutocompleteStore = () =>
  new TariffAutocompleteStore(tariffRepositoryInstance);
