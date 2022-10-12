import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

import { APP_ROUTES, ContentState, NavigateFunction } from '@example/shared';
import {
  DraftRequestForm,
  createEditRequestDraftStore,
} from '@example/modules/RequestModule';

import { EditDraftContentState } from './ContentState';

type Props = {
  requestID: string;
  navigate: NavigateFunction;
};

export const EditDraftRequestScreen = observer(
  ({ requestID, navigate }: Props) => {
    const [
      {
        fetchRequestState,
        getRequest,
        editRequestState,
        editRequest,
        retryEditRequest,
      },
    ] = useState(() =>
      createEditRequestDraftStore(requestID, {
        onSuccessEditRequest: () => {
          setTimeout(() => {
            navigate(APP_ROUTES.createDraftRequest.getRedirectPath());
          }, 3000);
        },
      }),
    );

    useEffect(() => {
      getRequest();
    }, []);

    return (
      <section>
        <ContentState
          isLoading={fetchRequestState.isLoading}
          isError={Boolean(fetchRequestState.errorMessage)}
        >
          <header>Редактирование заявления</header>
          <EditDraftContentState
            {...editRequestState}
            isError={Boolean(editRequestState.errorMessage)}
            onRetryEdit={retryEditRequest}
          >
            <DraftRequestForm onSubmit={editRequest} />
          </EditDraftContentState>
        </ContentState>
      </section>
    );
  },
);
