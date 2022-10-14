import { useState } from 'react';
import { observer } from 'mobx-react-lite';
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
import { useUserFullInfoQuery } from '@example/modules/AuthModule';

import { HeaderStore } from './store';

export const Header = observer(() => {
  const [{ setData, displayName }] = useState(() => new HeaderStore());

  useUserFullInfoQuery({ onSuccess: setData });

  return (
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
        displayName,
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
  );
});
