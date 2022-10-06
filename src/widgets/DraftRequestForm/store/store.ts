import { makeAutoObservable } from 'mobx';

import { validationService } from '@example/shared';

import { DraftRequestStage } from '../enums';
import { TariffStageValues } from '../stages/Tariff';
import { DraftRequestFormValues } from '../types';

const REQUEST_INFO_STAGE_VALIDATION_SCHEMA = {
  description: validationService.string().required('Обязательное поле'),
};

export const TARIFF_STAGE_VALIDATION_SCHEMA = {
  tariff: validationService.object().required('Обязательное поле'),
};

type Handlers = {
  onFinishSubmit: (values: DraftRequestFormValues) => Promise<void>;
};

export class DraftRequestFormStore {
  public currentStage = DraftRequestStage.tariff;

  public isLastStage = false;

  // eslint-disable-next-line
  public validationSchema: Record<string, any> = TARIFF_STAGE_VALIDATION_SCHEMA;

  public isSelectedExpensiveTariff = false;

  public tariffStageValues: TariffStageValues | undefined;

  constructor(private readonly handlers: Handlers) {
    this.handlers = handlers;
    makeAutoObservable(this, {}, { autoBind: true });
  }

  private onNextStage = (tariffStageValues: TariffStageValues) => {
    this.isSelectedExpensiveTariff = tariffStageValues.tariff.price > 200;
    this.tariffStageValues = tariffStageValues;
    this.currentStage = DraftRequestStage.info;
    this.isLastStage = true;
    this.validationSchema = REQUEST_INFO_STAGE_VALIDATION_SCHEMA;
  };

  public onSubmitRequest = (
    values: TariffStageValues | DraftRequestFormValues,
  ) => {
    if (!this.isLastStage) {
      this.onNextStage(values);

      return;
    }

    this.handlers.onFinishSubmit(values as DraftRequestFormValues);
  };
}

export const createDraftRequestFormStore = (handlers: Handlers) =>
  new DraftRequestFormStore(handlers);
