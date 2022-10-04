import { TariffStageValues } from './stages/Tariff';
import { RequestInfoStageValues } from './stages/RequestInfo';

export type DraftRequestFormValues = TariffStageValues & RequestInfoStageValues;
