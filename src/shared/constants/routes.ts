export const APP_ROUTES = {
  draftRequestList: {
    route: '/',
    getRedirectPath() {
      return '/';
    },
  },
  formedRequestList: {
    route: '/formedRequests',
    getRedirectPath() {
      return '/formedRequests';
    },
  },
  owners: {
    route: '/owners',
    getRedirectPath() {
      return '/owners';
    },
  },
  createDraftRequest: {
    route: '/createDraftRequest',
    getRedirectPath() {
      return '/createDraftRequest';
    },
  },
  editDraftRequest: {
    route: '/editDraftRequest/:requestID',
    getRedirectPath(requestID: string) {
      return `/editDraftRequest/${requestID}`;
    },
  },
} as const;
