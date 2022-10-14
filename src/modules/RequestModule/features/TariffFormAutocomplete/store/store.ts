import { TariffDTO, TariffListDTO } from '../../../data';

export type TariffFormAutocompleteValue = Pick<
  TariffDTO,
  'name' | 'id' | 'price'
>;

export class TariffAutocompleteStore {
  public formatTariffs = ({
    data,
  }: TariffListDTO): TariffFormAutocompleteValue[] =>
    data.map(({ name, id, price }) => ({
      name,
      id,
      price,
    }));
}

export const createTariffAutocompleteStore = () =>
  new TariffAutocompleteStore();
