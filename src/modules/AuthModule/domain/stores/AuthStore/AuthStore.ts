import { makeAutoObservable } from 'mobx';

import { HttpService } from '@example/shared';

export class AuthStore {
  public isAuthored: boolean = false;

  private accessToken: string | undefined;

  private protectedHttpClients: HttpService[] = [];

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  public signIn = (accessToken: string) => {
    this.isAuthored = true;
    this.accessToken = accessToken;
    this.initHttpClients();
  };

  public addProtectedHttpClients = (clients: HttpService[]) => {
    this.protectedHttpClients = clients;
  };

  private initHttpClients = () => {
    this.protectedHttpClients.forEach((client) => {
      client.defaults.headers.common.Authorization = this.accessToken as string;
    });
  };
}

export const authStore = new AuthStore();
