import { TariffFormAutocomplete } from '@example/features';
import { useFormContext } from '@example/shared';

import { TariffStageValues } from '../../store';

export const TariffStage = () => {
  const { control } = useFormContext<TariffStageValues>();

  return (
    <div>
      <TariffFormAutocomplete
        name="tariff"
        label="Выберите тариф"
        control={control}
      />
    </div>
  );
};
