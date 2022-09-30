import { BrowserRouter, Route, RouterLink, Routes } from 'common/router';
import {
  DashboardLayout,
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  ThemeProvider,
} from 'common/ui';
import { ProfileOutlineMd, QuitOutlineMd } from 'common/icons';
import logoSrc from 'images/logo.png';

import { configService } from '@example/shared';

import { initRepositories } from './data';
import { theme } from './config/theme';
import MainPage from './pages/main';
import DocumentsPage from './pages/documents';

configService.init({
  apiUrl: process.env.API_URL,
});

// Инициализация слоя получения данных
initRepositories();

export const App = () => (
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <DashboardLayout>
        <DashboardLayout.Header
          product={{
            name: 'React-boilerplate',
            logo: () => (
              <img
                width="20px"
                height="20px"
                src={logoSrc}
                alt="Логотип React-boilerplate"
              />
            ),
          }}
          profile={{
            displayName: 'Vasya',
            menu: (props) => (
              <Menu {...props}>
                <MenuItem>
                  <ListItemIcon>
                    <ProfileOutlineMd />
                  </ListItemIcon>
                  <ListItemText>Мой профиль</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem>
                  <ListItemIcon>
                    <QuitOutlineMd />
                  </ListItemIcon>
                  <ListItemText>Выйти</ListItemText>
                </MenuItem>
              </Menu>
            ),
          }}
        />
        <DashboardLayout.Sidebar
          menu={{
            items: [
              [
                'documents',
                {
                  icon: <ProfileOutlineMd />,
                  text: 'Документы',
                  items: [
                    [
                      'incoming-documents',
                      {
                        text: 'Входящие документы',
                        active: true,
                        component: (props) => {
                          return <RouterLink to="/" {...props} />;
                        },
                      },
                    ],
                    [
                      'outgoing-documents',
                      {
                        text: 'Исходящие документы',
                        active: false,
                        component: (props) => {
                          return <RouterLink to="/documents" {...props} />;
                        },
                      },
                    ],
                  ],
                },
              ],
            ],
          }}
        />
        <DashboardLayout.Main>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/documents" element={<DocumentsPage />} />
          </Routes>
        </DashboardLayout.Main>
      </DashboardLayout>
    </ThemeProvider>
  </BrowserRouter>
);
