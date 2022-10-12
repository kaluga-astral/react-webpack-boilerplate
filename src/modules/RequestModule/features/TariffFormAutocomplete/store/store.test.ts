import { TariffAutocompleteStore } from './store';

describe('TariffAutocompleteStore', () => {
  it('Добавляет в options правильный формат после успешного получения тарифов', async () => {
    const networkTariffs = [
      { id: '1', name: 'one', price: 2000, description: 'one' },
      { id: '2', name: 'two', price: 2000, description: 'two' },
    ];

    const store = new TariffAutocompleteStore({
      getTariffs: async () => ({ data: networkTariffs }),
      //  eslint-disable-next-line
    } as any);

    await store.getTariffs();

    expect(store.options).toEqual([
      { id: '1', name: 'one', price: 2000 },
      { id: '2', name: 'two', price: 2000 },
    ]);
  });

  it('После успешного получения тарифов устаналивает все статусы', async () => {
    const store = new TariffAutocompleteStore({
      getTariffs: async () => ({ data: [] }),
      //  eslint-disable-next-line
    } as any);

    await store.getTariffs();
    expect(store.isLoading).toBe(false);
    expect(store.error).toBe(null);
  });
});
