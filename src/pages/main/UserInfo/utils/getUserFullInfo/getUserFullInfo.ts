export const getUserFullInfo = ({
  name,
  email,
}: {
  name: string;
  email: string;
}) => `${name}: ${email}`;
