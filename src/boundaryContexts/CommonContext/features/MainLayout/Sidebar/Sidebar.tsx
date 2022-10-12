import {
  APP_ROUTES,
  DashboardLayout,
  ProfileOutlineMd,
  RouterLink,
  useLocation,
} from '@example/shared';

export const Sidebar = () => {
  const location = useLocation();

  return (
    <DashboardLayout.Sidebar
      menu={{
        items: [
          [
            APP_ROUTES.draftRequestList,
            {
              icon: <ProfileOutlineMd />,
              text: 'Заявки',
              active: location.pathname === APP_ROUTES.draftRequestList,
              component: (props) => (
                <RouterLink to={APP_ROUTES.draftRequestList} {...props} />
              ),
            },
          ],
          [
            APP_ROUTES.owners,
            {
              icon: <ProfileOutlineMd />,
              text: 'Владельцы',
              active: location.pathname === APP_ROUTES.owners,
              component: (props) => (
                <RouterLink to={APP_ROUTES.owners} {...props} />
              ),
            },
          ],
        ],
      }}
    />
  );
};
