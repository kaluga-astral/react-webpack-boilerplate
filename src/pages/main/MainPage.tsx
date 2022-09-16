import { Typography } from '@astral/ui';
import { API_URL } from 'config';

import { ArrowIcon } from 'common/icons';

import { UserInfo } from './UserInfo';

console.log('ArrowIcon', ArrowIcon);

const MainPage = () => {
  return (
    <>
      <UserInfo title="title" userName="ivan" userEmail="ivan@ivan.com" />
      <Typography>{API_URL}</Typography>
      <ArrowIcon />
    </>
  );
};

export default MainPage;
