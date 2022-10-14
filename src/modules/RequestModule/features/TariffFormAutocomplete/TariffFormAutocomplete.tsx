import { useState } from 'react';
import { observer } from 'mobx-react-lite';

import { FormAutocomplete, FormAutocompleteProps } from '@example/shared';

import { useTariffsQuery } from '../../data';

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
    const [{ formatTariffs }] = useState(createTariffAutocompleteStore);

    const { isLoading, data: tariffs = [] } = useTariffsQuery<
      TariffFormAutocompleteValue[]
    >({ select: formatTariffs });

    return (
      <FormAutocomplete<TariffFormAutocompleteValue>
        name={name}
        control={control}
        label={label}
        options={tariffs}
        loading={isLoading}
        getOptionLabel={(option) => option?.name}
      />
    );
  },
);
