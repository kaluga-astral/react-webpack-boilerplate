import { AccessDeniedScreen, EditDraftRequestScreen } from '@example/screens';
import { useNavigate, useRouterParams } from '@example/shared';

const CreateRequestPage = () => {
  const navigate = useNavigate();
  const { requestID } = useRouterParams<{ requestID: string }>();

  if (!requestID) {
    return <AccessDeniedScreen />;
  }

  return <EditDraftRequestScreen requestID={requestID} navigate={navigate} />;
};

export default CreateRequestPage;
