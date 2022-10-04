import {
  FormTariffAutocomplete,
  FormTariffAutocompleteValue,
} from '@example/domain';
import { useFormContext } from '@example/shared';

export type TariffStageValues = { tariff: FormTariffAutocompleteValue };

export const TariffStage = () => {
  const { control } = useFormContext<TariffStageValues>();

  return (
    <div>
      <FormTariffAutocomplete
        name="tariff"
        label="Выберите тариф"
        control={control}
      />
    </div>
  );
};
