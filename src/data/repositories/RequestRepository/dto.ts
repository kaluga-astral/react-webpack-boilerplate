import {
  CreateDraftRequestNetworkInputDTO,
  OwnerNetworkDTO,
  RequestNetworkDTO,
  RequestNetworkInputDTO,
} from '../../sources';

import { RequestStatus } from './enums';

export type RequestDTO = Omit<RequestNetworkDTO, 'status'> & {
  status: RequestStatus;
};

export type RequestFullInfoDTO = Omit<RequestDTO, 'ownerID'> & {
  owner: OwnerNetworkDTO;
};

export type EditRequestInputDTO = RequestNetworkInputDTO;

export type RequestStoreInputDTO = EditRequestInputDTO;

export type CreateDraftRequestInputDTO = CreateDraftRequestNetworkInputDTO;
