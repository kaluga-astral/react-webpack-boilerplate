import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

import { FormAutocomplete, FormAutocompleteProps } from '@example/shared';
import { tariffRepository } from '@example/data';

import { TariffAutocompleteOption, TariffAutocompleteStore } from './store';

export type FormTariffAutocompleteValue = TariffAutocompleteOption;

export type FormTariffAutocompleteProps = Pick<
  FormAutocompleteProps<TariffAutocompleteOption>,
  'name' | 'control' | 'label'
>;

export const FormTariffAutocomplete = observer(
  ({ name, control, label }: FormTariffAutocompleteProps) => {
    const [store] = useState(
      () => new TariffAutocompleteStore(tariffRepository),
    );

    useEffect(() => {
      store.getTariffs();
    }, []);

    return (
      <FormAutocomplete<TariffAutocompleteOption>
        name={name}
        control={control}
        label={label}
        options={store.options}
        loading={store.isLoading}
        getOptionLabel={(option) => option?.name}
      />
    );
  },
);
