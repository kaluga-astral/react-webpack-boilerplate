import {
  OwnerNetworkDTO,
  RequestNetworkDTO,
  RequestNetworkInputDTO,
} from '../../sources';

import { RequestStatus } from './enums';

export type RequestFullInfoDTO = Omit<
  RequestNetworkDTO,
  'ownerID' | 'status'
> & {
  status: RequestStatus;
  owner: OwnerNetworkDTO;
};

export type EditRequestInputDTO = RequestNetworkInputDTO;

export type RequestStoreInputDTO = EditRequestInputDTO;
