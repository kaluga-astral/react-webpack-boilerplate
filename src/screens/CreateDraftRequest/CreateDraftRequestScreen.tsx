import { useState } from 'react';
import { observer } from 'mobx-react-lite';

import { requestRepository } from '@example/data';
import { APP_ROUTES, useNavigate } from '@example/shared';
import { DraftRequestForm } from '@example/widgets';

import { CreateDraftContentState } from './ContentState';
import { CreateDraftRequestStore } from './store';

export const CreateDraftRequestScreen = observer(() => {
  const navigate = useNavigate();

  const [
    { isSuccess, createRequest, errorMessage, isLoading, retryCreateRequest },
  ] = useState(
    () =>
      new CreateDraftRequestStore(requestRepository, {
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
