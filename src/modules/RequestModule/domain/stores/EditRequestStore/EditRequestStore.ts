import { makeAutoObservable, runInAction } from 'mobx';

import { AsyncState, AsyncStateStore } from '@example/shared';

import {
  RequestRepository,
  requestRepository as requestRepositoryInstance,
} from '../../../data';
import { DraftRequestFormValues } from '../../../features';

export type EditRequestData = DraftRequestFormValues;

type Handlers = {
  onSuccessEditRequest: () => void;
};

export class EditDraftRequestStore {
  public requestData: DraftRequestFormValues | undefined;

  private editRequestCache: EditRequestData | undefined;

  constructor(
    private readonly requestRepository: RequestRepository,
    private readonly requestID: string,
    private readonly handlers: Handlers,
    private readonly fetchRequestStateStore: AsyncStateStore,
    private readonly editRequestStateStore: AsyncStateStore,
  ) {
    this.requestRepository = requestRepository;
    this.requestID = requestID;
    this.handlers = handlers;
    this.fetchRequestStateStore = fetchRequestStateStore;
    this.editRequestStateStore = editRequestStateStore;
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get fetchRequestState(): AsyncState {
    return this.fetchRequestStateStore.state;
  }

  get editRequestState(): AsyncState {
    return this.editRequestStateStore.state;
  }

  public getRequest = () => {
    this.fetchRequestStateStore.start();

    this.requestRepository
      .getRequestWithTariff(this.requestID)
      .then((request) => {
        runInAction(() => {
          this.fetchRequestStateStore.success();
          this.requestData = request;
        });
      })
      .catch((err) => {
        runInAction(() => {
          this.fetchRequestStateStore.fail(err.message);
        });
      });
  };

  public editRequest = async (data: EditRequestData): Promise<void> => {
    this.editRequestStateStore.start();
    this.editRequestCache = data;

    const { tariff, description } = data;

    try {
      await this.requestRepository.editDraftRequest({
        id: this.requestID,
        tariffID: tariff.id,
        description,
      });

      runInAction(() => {
        this.editRequestStateStore.success();
      });

      this.handlers.onSuccessEditRequest();
    } catch (err) {
      runInAction(() => {
        this.editRequestStateStore.fail((err as Error).message);
      });
    }
  };

  public retryEditRequest = () => {
    if (this.editRequestCache) {
      this.editRequest(this.editRequestCache);
    }
  };
}

export const createEditRequestDraftStore = (
  requestID: string,
  handlers: Handlers,
) =>
  new EditDraftRequestStore(
    requestRepositoryInstance,
    requestID,
    handlers,
    new AsyncStateStore(),
    new AsyncStateStore(),
  );
