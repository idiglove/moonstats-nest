import { CreateUserDto } from './../dto/create-user.dto';

export const createTestUser = () => {
  const testUser: CreateUserDto = {
    createdAt: new Date(),
    firstName: 'Jackie',
    lastName: 'Jack',
    email: 'faith.morante+test1@gmail.com',
  };

  return testUser;
};
