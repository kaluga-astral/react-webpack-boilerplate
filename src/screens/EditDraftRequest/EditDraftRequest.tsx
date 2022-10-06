import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

import {
  APP_ROUTES,
  ContentState,
  useNavigate,
  useRouterParams,
} from '@example/shared';
import { DraftRequestForm } from '@example/features';

import { EditDraftContentState } from './ContentState';
import { createEditDraftStore } from './store';

export const EditDraftRequestScreen = observer(() => {
  const { requestID } = useRouterParams<{ requestID: string }>();

  if (!requestID) {
    return <div>Нет ID заявки</div>;
  }

  const navigate = useNavigate();

  const [
    {
      fetchRequestState,
      getRequest,
      editRequestState,
      editRequest,
      retryEditRequest,
    },
  ] = useState(() =>
    createEditDraftStore(requestID, {
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
});
