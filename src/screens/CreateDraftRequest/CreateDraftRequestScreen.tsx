import { useState } from 'react';
import { observer } from 'mobx-react-lite';

import { NavigateFunction } from '@example/shared';
import { APP_ROUTES } from '@example/modules/ServiceModule';
import {
  DraftRequestForm,
  createDraftRequestStore,
} from '@example/modules/RequestModule';

import { CreateDraftContentState } from './ContentState';

type Props = { navigate: NavigateFunction };

export const CreateDraftRequestScreen = observer(({ navigate }: Props) => {
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
