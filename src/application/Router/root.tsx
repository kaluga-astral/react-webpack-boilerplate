import { CreateDraftRequestScreen } from '@example/screens';
import { useNavigate } from '@example/shared';

const CreateRequestPage = () => {
  const navigate = useNavigate();

  return <CreateDraftRequestScreen navigate={navigate} />;
};

export default CreateRequestPage;
