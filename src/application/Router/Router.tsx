import { Suspense, lazy } from 'react';

import { ContentState, Route, Routes } from '@example/shared';
import { APP_ROUTES } from '@example/shared';

const CreateDraftRequestPage = lazy(() => import('./root'));
const EditDraftRequestPage = lazy(() => import('./editRequest'));
const RequestPage = lazy(() => import('./request'));

export const MainRouter = () => {
  return (
    <Routes>
      <Route
        path={APP_ROUTES.createDraftRequest.route}
        element={
          <Suspense fallback={<ContentState isLoading>loading</ContentState>}>
            <CreateDraftRequestPage />
          </Suspense>
        }
      />
      <Route
        path={APP_ROUTES.createDraftRequest.route}
        element={
          <Suspense fallback={<ContentState isLoading>loading</ContentState>}>
            <CreateDraftRequestPage />
          </Suspense>
        }
      />
      <Route
        path={APP_ROUTES.editDraftRequest.route}
        element={
          <Suspense fallback={<ContentState isLoading>loading</ContentState>}>
            <EditDraftRequestPage />
          </Suspense>
        }
      />
      <Route
        path={APP_ROUTES.request.route}
        element={
          <Suspense fallback={<ContentState isLoading>loading</ContentState>}>
            <RequestPage />
          </Suspense>
        }
      />
    </Routes>
  );
};
