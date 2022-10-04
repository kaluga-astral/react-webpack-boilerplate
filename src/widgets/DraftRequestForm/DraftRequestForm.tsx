import { Suspense, lazy, useState } from 'react';
import { observer } from 'mobx-react-lite';

import {
  ContentState,
  FormProvider,
  SubmitButton,
  useForm,
} from '@example/shared';

import { TariffStage } from './stages/Tariff';
import { DraftRequestFormStore } from './store';
import { DraftRequestStage } from './enums';
import { DraftRequestFormValues } from './types';

const RequestInfoStage = lazy(() => import('./stages/RequestInfo'));

export type DraftRequestFormProps = {
  onSubmit: (values: DraftRequestFormValues) => Promise<void>;
  initialValues?: Partial<DraftRequestFormValues>;
};

export const DraftRequestForm = observer(
  ({ initialValues, onSubmit }: DraftRequestFormProps) => {
    const [
      {
        isLastStage,
        currentStage,
        isSelectedExpensiveTariff,
        onSubmitRequest,
        validationSchema,
        tariffStageValues,
      },
    ] = useState(() => new DraftRequestFormStore({ onFinishSubmit: onSubmit }));

    const form = useForm<DraftRequestFormValues>({
      defaultValues: initialValues,
      validationSchema,
    });

    return (
      <FormProvider {...form}>
        <form noValidate onSubmit={form.handleSubmit(onSubmitRequest)}>
          {currentStage === DraftRequestStage.tariff && <TariffStage />}
          <Suspense fallback={<ContentState isLoading>loading</ContentState>}>
            {tariffStageValues && currentStage === DraftRequestStage.info && (
              <RequestInfoStage
                isShowTariffPrice={isSelectedExpensiveTariff}
                tariffPrice={tariffStageValues.tariff.price}
              />
            )}
          </Suspense>
          <footer>
            <SubmitButton>{isLastStage ? 'Создать' : 'Далее'}</SubmitButton>
          </footer>
        </form>
      </FormProvider>
    );
  },
);
