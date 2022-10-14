import { useState } from 'react';
import { observer } from 'mobx-react-lite';

import { ContentState, NavigateFunction } from '@example/shared';
import {
  DraftRequestForm,
  createEditRequestDraftLogic,
  useRequestWithTariffQuery,
} from '@example/modules/RequestModule';
import { APP_ROUTES } from '@example/modules/ServiceModule';

import { EditDraftContentState } from './ContentState';

type Props = {
  requestID: string;
  navigate: NavigateFunction;
};

export const EditDraftRequestScreen = observer(
  ({ requestID, navigate }: Props) => {
    const [{ editRequest, retryEditRequest, editRequestState }] = useState(() =>
      createEditRequestDraftLogic(requestID, {
        onSuccessEditRequest: () => {
          setTimeout(() => {
            navigate(APP_ROUTES.createDraftRequest.getRedirectPath());
          }, 3000);
        },
      }),
    );

    const {
      isLoading: isLoadingRequest,
      isError: isErrorRequest,
      data: requestInitialValues,
    } = useRequestWithTariffQuery(requestID);

    return (
      <section>
        <ContentState isLoading={isLoadingRequest} isError={isErrorRequest}>
          <header>Редактирование заявления</header>
          <EditDraftContentState
            {...editRequestState}
            isError={Boolean(editRequestState.errorMessage)}
            onRetryEdit={retryEditRequest}
          >
            <DraftRequestForm
              initialValues={requestInitialValues}
              onSubmit={editRequest}
            />
          </EditDraftContentState>
        </ContentState>
      </section>
    );
  },
);
