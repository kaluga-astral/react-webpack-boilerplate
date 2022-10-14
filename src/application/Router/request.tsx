import { AccessDeniedScreen, RequestViewScreen } from '@example/screens';
import { useRouterParams } from '@example/shared';

const RequestPage = () => {
  const { requestID } = useRouterParams<{ requestID: string }>();

  if (!requestID) {
    return <AccessDeniedScreen />;
  }

  return <RequestViewScreen requestID={requestID} />;
};

export default RequestPage;
