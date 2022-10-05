import { BrowserRouter, ThemeProvider, theme } from '@example/shared';
import { configService } from '@example/shared';
import { MainLayout } from '@example/widgets';

import { MainRouter } from './MainRouter';
import { initRepositories } from './data';

configService.init({
  apiUrl: process.env.API_URL as string,
});

// Инициализация слоя получения данных
initRepositories();

export const App = () => (
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <MainLayout>
        <MainRouter />
      </MainLayout>
    </BrowserRouter>
  </ThemeProvider>
);
