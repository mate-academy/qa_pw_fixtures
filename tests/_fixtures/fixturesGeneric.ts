import { test as base } from '@playwright/test';
import { Logger } from '../../src/common/logger/Logger';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';

export const test = base.extend<
  {
    user: ReturnType<typeof generateNewUserData>; // или конкретный тип пользователя
    infoTestLog: string;
  },
  {
    logger: Logger;
  }
>({
  // Фикстура логгера
  logger: [
    async ({}, use) => {
      const logger = new Logger('debug'); // debug, info, warn, error
      await use(logger);
    },
    { scope: 'worker' },
  ],

  // Генерация нового пользователя с логгером
  user: async ({ logger }, use) => {
    const user = generateNewUserData(logger);
    await use(user);
  },

  // Авто-логирование начала и конца теста
  infoTestLog: [
    async ({ logger }, use, testInfo) => {
      const indexOfTestSubfolderStart = testInfo.file.indexOf('/tests') + 7;
      const fileName = testInfo.file.substring(indexOfTestSubfolderStart);

      logger.info(`Test started: ${fileName}`);
      await use('infoTestLog');
      logger.info(`Test completed: ${fileName}`);
    },
    { scope: 'test', auto: true },
  ],
});
