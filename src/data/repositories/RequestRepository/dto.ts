import {
  OwnerNetworkDTO,
  RequestNetworkDTO,
  RequestNetworkInputDTO,
} from '../../sources';

export type RequestFullInfoDTO = Omit<RequestNetworkDTO, 'ownerID'> & {
  owner: OwnerNetworkDTO;
};

export type EditRequestInputDTO = RequestNetworkInputDTO;

export type RequestStoreInputDTO = EditRequestInputDTO;
