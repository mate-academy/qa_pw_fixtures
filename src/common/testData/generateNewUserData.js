import { faker } from '@faker-js/faker';

export function generateNewUserData(logger) {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  const user = {
    username: `${firstName}_${lastName}`.replaceAll(`'`),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };

  logger.debug(`Generated new user: ${JSON.stringify(user)}`);

  return user;
}
