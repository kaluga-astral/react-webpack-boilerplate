import { HttpService } from '@example/shared';

import { OwnerDataSources, createOwnerDataSources } from '../../sources';

import { OwnerDTO } from './dto';

/*
 * @description Repository для работы с даннми владельце
 * */
export class OwnerRepository {
  constructor(private readonly ownerDataSources: OwnerDataSources) {
    this.ownerDataSources = ownerDataSources;
  }

  /*
   * @description Получение полной информации о владельце
   * */
  public getOwnerInfo = async (ownerID: string): Promise<OwnerDTO> =>
    this.ownerDataSources.getInfo(ownerID);
}

export let ownerRepository: OwnerRepository;

export const initOwnerRepository = (httpService: HttpService) => {
  ownerRepository = new OwnerRepository(createOwnerDataSources(httpService));
};
