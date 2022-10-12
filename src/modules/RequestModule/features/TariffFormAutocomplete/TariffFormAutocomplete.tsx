import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

import { FormAutocomplete, FormAutocompleteProps } from '@example/shared';

import {
  TariffFormAutocompleteValue,
  createTariffAutocompleteStore,
} from './store';

export type TariffFormAutocompleteProps = Pick<
  FormAutocompleteProps<TariffFormAutocompleteValue>,
  'name' | 'control' | 'label'
>;

export const TariffFormAutocomplete = observer(
  ({ name, control, label }: TariffFormAutocompleteProps) => {
    const [{ getTariffs, isLoading, options }] = useState(
      createTariffAutocompleteStore,
    );

    useEffect(() => {
      getTariffs();
    }, []);

    return (
      <FormAutocomplete<TariffFormAutocompleteValue>
        name={name}
        control={control}
        label={label}
        options={options}
        loading={isLoading}
        getOptionLabel={(option) => option?.name}
      />
    );
  },
);
