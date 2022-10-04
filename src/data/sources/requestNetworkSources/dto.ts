export type RequestNetworkDTO = {
  id: string;
  status: number;
  ownerID: string;
  description: string;
  createdDate: string;
  updatedDate: string;
};

export type CreateDraftRequestNetworkInputDTO = {
  tariffID: string;
  description: string;
};

export type RequestNetworkInputDTO = {
  id: string;
  ownerID: string;
  description: string;
};

export type RequestListNetworkDTO = {
  list: RequestNetworkDTO[];
  total: number;
};
