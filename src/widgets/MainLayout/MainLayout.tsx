import { ReactNode } from 'react';
import logoSrc from 'images/logo.png';

import {
  DashboardLayout,
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  ProfileOutlineMd,
  QuitOutlineMd,
} from '@example/shared';

import { Sidebar } from '../Sidebar';

type Props = { children: ReactNode };

export const MainDashboard = ({ children }: Props) => (
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
    <Sidebar />
    <DashboardLayout.Main>{children}</DashboardLayout.Main>
  </DashboardLayout>
);
