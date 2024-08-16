import {AuthParam} from '@app/types/auth';
import {User} from '@app/types/user';
import {delay} from '@app/util';

export const loginAPi = async (body: AuthParam) => {
  const user: User = {
    user_id: '123',
    email: 'admin@gmail.com',
    name: 'Admin Ali',
    status: 200,
    message: 'Sucessfull',
  };
  if (body?.token) {
    return user;
  }
  if (body?.userName !== 'admin') {
    return {
      ...user,
      status: 501,
      message: 'Invalid username',
    };
  }
  if (body?.password !== 'password123') {
    return {
      ...user,
      status: 501,
      message: 'Invalid password',
    };
  }
  await delay(2000);

  return user;
};
