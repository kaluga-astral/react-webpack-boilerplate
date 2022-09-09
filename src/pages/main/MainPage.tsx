import { Typography } from '@astral/ui';
import { API_URL } from 'config';

import { UserInfo } from './UserInfo';

const MainPage = () => {
  return (
    <>
      <UserInfo title="title" userName="ivan" userEmail="ivan@ivan.com" />
      <Typography>{API_URL}</Typography>
    </>
  );
};

export default MainPage;
