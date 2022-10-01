export const getUserFullName = (user: {
  name: string;
  surname: string;
}): string => `${user.name} ${user.surname}`;
