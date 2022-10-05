import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

import { requestRepository } from '@example/data';
import { APP_ROUTES, ContentState, useNavigate } from '@example/shared';
import { DraftRequestForm } from '@example/widgets';

import { EditDraftContentState } from './ContentState';
import { EditDraftRequestStore } from './store';

type Props = {
  requestID: string;
};

export const EditDraftRequestScreen = observer(({ requestID }: Props) => {
  const navigate = useNavigate();

  const [
    {
      fetchRequestState,
      getRequest,
      editRequestState,
      editRequest,
      retryEditRequest,
    },
  ] = useState(
    () =>
      new EditDraftRequestStore(requestRepository, requestID, {
        onSuccessEditRequest: () => {
          setTimeout(() => {
            navigate(APP_ROUTES.draftRequestList.getRedirectPath());
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
