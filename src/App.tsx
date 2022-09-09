import {
  DashboardLayout,
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  ThemeProvider,
} from '@astral/ui';
import { ProfileOutlineMd, QuitOutlineMd } from '@astral/icons';
import logoSrc from 'images/logo.png';
import { BrowserRouter, RouterLink } from 'common/router';

import { theme } from './config/theme';
import MainPage from './pages/main';

const App = () => (
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
                          return (
                            <RouterLink to="/incoming-documents" {...props} />
                          );
                        },
                      },
                    ],
                    [
                      'outgoing-documents',
                      {
                        text: 'Исходящие документы',
                        active: false,
                        component: (props) => {
                          return (
                            <RouterLink to="/outgoing-documents" {...props} />
                          );
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
          <MainPage />
        </DashboardLayout.Main>
      </DashboardLayout>
    </ThemeProvider>
  </BrowserRouter>
);

export default App;
