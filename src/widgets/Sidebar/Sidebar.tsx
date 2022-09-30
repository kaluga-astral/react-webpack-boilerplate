import {
  APP_ROUTES,
  AppRoute,
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
            String(AppRoute.RequestsList),
            {
              icon: <ProfileOutlineMd />,
              text: 'Заявки',
              active: location.pathname === APP_ROUTES[AppRoute.RequestsList],
              component: (props) => (
                <RouterLink to={APP_ROUTES[AppRoute.RequestsList]} {...props} />
              ),
            },
          ],
          [
            String(AppRoute.Owners),
            {
              icon: <ProfileOutlineMd />,
              text: 'Владельцы',
              active: location.pathname === APP_ROUTES[AppRoute.Owners],
              component: (props) => (
                <RouterLink to={APP_ROUTES[AppRoute.Owners]} {...props} />
              ),
            },
          ],
        ],
      }}
    />
  );
};
