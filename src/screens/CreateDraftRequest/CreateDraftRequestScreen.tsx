import { useState } from 'react';
import { observer } from 'mobx-react-lite';

import { APP_ROUTES, useNavigate } from '@example/shared';
import { DraftRequestForm } from '@example/widgets';

import { CreateDraftContentState } from './ContentState';
import { createDraftRequestStore } from './store';

export const CreateDraftRequestScreen = observer(() => {
  const navigate = useNavigate();

  const [
    { isSuccess, createRequest, errorMessage, isLoading, retryCreateRequest },
  ] = useState(() =>
    createDraftRequestStore({
      onSuccessCreateRequest: (requestID) => {
        setTimeout(() => {
          navigate(APP_ROUTES.editDraftRequest.getRedirectPath(requestID));
        }, 3000);
      },
    }),
  );

  return (
    <section>
      <header>Создание заявления</header>
      <CreateDraftContentState
        isError={Boolean(errorMessage)}
        errorMessage={errorMessage}
        isLoading={isLoading}
        isSuccess={isSuccess}
        onRetryCreate={retryCreateRequest}
      >
        <DraftRequestForm onSubmit={createRequest} />
      </CreateDraftContentState>
    </section>
  );
});
