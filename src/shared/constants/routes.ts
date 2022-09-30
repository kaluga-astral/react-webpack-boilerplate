export enum AppRoute {
  RequestsList,
  Owners,
}

export const APP_ROUTES: Record<AppRoute, string> = {
  [AppRoute.RequestsList]: '/requests',
  [AppRoute.Owners]: '/owners',
};
