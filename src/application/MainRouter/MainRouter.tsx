import { Suspense, lazy } from 'react';

import { APP_ROUTES, ContentState, Route, Routes } from '@example/shared';

const DraftRequestListScreen = lazy(
  () => import('../../screens/DraftRequestList'),
);
const FormedRequestListScreen = lazy(
  () => import('../../screens/FormedRequestList'),
);

export const MainRouter = () => {
  return (
    <Routes>
      <Route
        path={APP_ROUTES.draftRequestList}
        element={
          <Suspense fallback={<ContentState isLoading>loading</ContentState>}>
            <DraftRequestListScreen />
          </Suspense>
        }
      />
      <Route
        path={APP_ROUTES.formedRequestList}
        element={
          <Suspense fallback={<ContentState isLoading>loading</ContentState>}>
            <FormedRequestListScreen />
          </Suspense>
        }
      />
    </Routes>
  );
};
