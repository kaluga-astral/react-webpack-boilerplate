import { useEffect, useState } from 'react';

import {
  FormAutocomplete,
  FormAutocompleteProps,
  useFormContext,
} from '@example/shared';
import { tariffRepository } from '@example/data';

import { TariffAutocompleteOption, TariffAutocompleteStore } from './store';

export type TariffAutocompleteProps = Pick<
  FormAutocompleteProps<TariffAutocompleteOption>,
  'name'
>;

export const TariffAutocomplete = ({ name }: TariffAutocompleteProps) => {
  const [store] = useState(() => new TariffAutocompleteStore(tariffRepository));

  const { control } = useFormContext();

  useEffect(() => {
    store.getTariffs();
  }, []);

  return (
    <FormAutocomplete
      name={name}
      control={control}
      options={store.options}
      loading={store.isLoading}
    />
  );
};
