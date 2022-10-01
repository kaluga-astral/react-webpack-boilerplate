import { makeAutoObservable } from 'mobx';

import { UserRepository } from '@example/data';

export class HeaderStore {
  isLoadingProfile: boolean = true;

  errorProfile: Error | null = null;

  displayName: string | undefined;

  constructor(private readonly userRepository: UserRepository) {
    this.userRepository = userRepository;
    makeAutoObservable(this, {}, { autoBind: true });
  }

  public getProfile = async () => {
    try {
      this.errorProfile = null;
      this.isLoadingProfile = true;

      const personInfo = await this.userRepository.getPersonInfo();

      this.displayName = personInfo.displayName;
    } catch (err) {
      this.isLoadingProfile = false;
      this.errorProfile = err as Error;
    }
  };
}
