export type RequestDTO = {
  id: string;
  status: number;
  ownerID: string;
  description: string;
  createdDate: string;
  updatedDate: string;
};

export type RequestInputDTO = {
  id: string;
  ownerID: string;
  description: string;
};

export type RequestListDTO = {
  list: RequestDTO[];
  total: number;
};
