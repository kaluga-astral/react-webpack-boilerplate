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
            APP_ROUTES.createDraftRequest.route,
            {
              icon: <ProfileOutlineMd />,
              text: 'Создать заявку',
              active: location.pathname === APP_ROUTES.createDraftRequest.route,
              component: (props) => (
                <RouterLink
                  to={APP_ROUTES.createDraftRequest.route}
                  {...props}
                />
              ),
            },
          ],
        ],
      }}
    />
  );
};
