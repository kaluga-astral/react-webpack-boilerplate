import { Suspense, lazy } from 'react';

import { ContentState, Route, Routes } from '@example/shared';
import { APP_ROUTES } from '@example/modules/ServiceModule';

const CreateDraftRequestPage = lazy(() => import('./root'));
const EditDraftRequestPage = lazy(() => import('./editRequest'));

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
        path={APP_ROUTES.editDraftRequest.route}
        element={
          <Suspense fallback={<ContentState isLoading>loading</ContentState>}>
            <EditDraftRequestPage />
          </Suspense>
        }
      />
    </Routes>
  );
};
