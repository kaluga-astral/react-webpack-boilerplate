export type TariffNetworkDTO = {
  id: string;
  name: string;
  price: string;
  description: string;
};

export type TariffListNetworkDTO = {
  data: TariffNetworkDTO[];
  total: number;
};
