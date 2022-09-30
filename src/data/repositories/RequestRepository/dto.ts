import { OwnerDTO, RequestDTO, RequestInputDTO } from '../../sources';

export type RequestFullInfoDTO = Omit<RequestDTO, 'ownerID'> & {
  owner: OwnerDTO;
};

export type EditRequestInputDTO = RequestInputDTO;

export type RequestStoreInputDTO = EditRequestInputDTO;
