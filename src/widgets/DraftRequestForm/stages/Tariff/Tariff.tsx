import { FormTariffAutocomplete } from '@example/domain';
import { useFormContext } from '@example/shared';

import { TariffStageValues } from '../../store';

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
