import { TariffDTO, TariffListDTO } from '../../../data';

export type TariffFormAutocompleteValue = Pick<
  TariffDTO,
  'name' | 'id' | 'price'
>;

export type TariffAutocompleteState = {
  isLoading: boolean;
  tariffs: TariffFormAutocompleteValue[];
};

export class TariffAutocompleteStore {
  private formatTariffs = ({
    data,
  }: TariffListDTO): TariffFormAutocompleteValue[] =>
    data.map(({ name, id, price }) => ({
      name,
      id,
      price,
    }));

  public getState = ({
    isLoading,
    data,
  }: {
    isLoading: boolean;
    data?: TariffListDTO;
  }): TariffAutocompleteState => ({
    isLoading,
    tariffs: data ? this.formatTariffs(data) : [],
  });
}

export const createTariffAutocompleteStore = () =>
  new TariffAutocompleteStore();
