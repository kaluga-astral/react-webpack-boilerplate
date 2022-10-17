import { DataError } from '@example/shared';

export class ApiDataError extends DataError<{
  errorCustomField?: string;
}> {}
