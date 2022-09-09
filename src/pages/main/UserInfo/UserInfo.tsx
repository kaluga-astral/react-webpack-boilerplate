import { Grid, Typography } from '@astral/ui';

import { getUserFullInfo } from './utils';
import { useUserList } from './hooks';
import { UserInfoTitle, UserInfoWrapper } from './styles';
import { Indicator } from './Indicator';

type Props = { title: string; userName: string; userEmail: string };

const UserInfo = ({ title, userName, userEmail }: Props) => {
  const list = useUserList();

  return (
    <UserInfoWrapper templateColumns="1fr 1fr" spacing={2}>
      <Grid column="1 / -1">
        <UserInfoTitle variant="h3">{title}</UserInfoTitle>
      </Grid>
      <Typography>{userName}</Typography>
      <Typography>{userEmail}</Typography>
      <Typography>
        {getUserFullInfo({ email: userEmail, name: userName })}
      </Typography>
      <ul>
        {list.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <Indicator isShowFooter footer={<footer>footer</footer>} />
    </UserInfoWrapper>
  );
};

export default UserInfo;
