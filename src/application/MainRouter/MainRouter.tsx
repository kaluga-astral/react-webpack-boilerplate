import { Suspense, lazy } from 'react';

import { APP_ROUTES, ContentState, Route, Routes } from '@example/shared';

const CreateDraftRequestScreen = lazy(
  () => import('../../screens/CreateDraftRequest'),
);
const EditDraftRequestScreen = lazy(
  () => import('../../screens/EditDraftRequest'),
);

export const MainRouter = () => {
  return (
    <Routes>
      <Route
        path={APP_ROUTES.createDraftRequest.route}
        element={
          <Suspense fallback={<ContentState isLoading>loading</ContentState>}>
            <CreateDraftRequestScreen />
          </Suspense>
        }
      />
      <Route
        path={APP_ROUTES.editDraftRequest.route}
        element={
          <Suspense fallback={<ContentState isLoading>loading</ContentState>}>
            <EditDraftRequestScreen />
          </Suspense>
        }
      />
    </Routes>
  );
};
