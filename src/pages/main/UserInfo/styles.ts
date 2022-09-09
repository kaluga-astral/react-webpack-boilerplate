import { styled } from '@astral/ui';
import { Grid, Typography } from '@astral/ui';

export const UserInfoWrapper = styled(Grid)`
  background-color: ${({ theme }) => theme.palette.background.default};
`;

export const UserInfoTitle = styled(Typography)`
  text-align: center;
`;
