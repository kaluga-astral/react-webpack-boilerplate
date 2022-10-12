import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

import { BrowserRouter, ThemeProvider, theme } from '@example/shared';
import {
  MainLayout,
  apiHttpClient,
  configService,
} from '@example/modules/ServiceModule';
import { authStore } from '@example/modules/AuthModule';

import { MainRouter } from './Router';

configService.init({
  apiUrl: process.env.API_URL as string,
});

export const App = observer(() => {
  const [store] = useState(() => authStore);

  useEffect(() => {
    store.addProtectedHttpClients([apiHttpClient]);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <MainLayout>
          <MainRouter />
        </MainLayout>
      </BrowserRouter>
    </ThemeProvider>
  );
});
