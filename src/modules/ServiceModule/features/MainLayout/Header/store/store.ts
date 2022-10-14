import { makeAutoObservable } from 'mobx';

import { UserFullInfoDTO } from '@example/modules/AuthModule';

export class HeaderStore {
  public displayName: string = '...';

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  public setData = (data: UserFullInfoDTO) => {
    this.displayName = data.displayName;
  };
}

export const createHeaderStore = () => new HeaderStore();
