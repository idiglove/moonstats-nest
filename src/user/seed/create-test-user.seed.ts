import { CreateUserDto } from './../dto/create-user.dto';
import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;

export const createTestUser = async () => {
  const hash = await bcrypt.hash('test123', saltOrRounds);
  const testUser: CreateUserDto = {
    createdAt: new Date(),
    firstName: 'Jackie',
    lastName: 'Jack',
    email: 'faith.morante+test1@gmail.com',
    password: hash,
  };

  return testUser;
};
